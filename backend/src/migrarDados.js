const Database = require("better-sqlite3");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const db = new Database("./prisma/dev.db", {
    readonly: true
});

async function migrar() {
    try {
        console.log("📦 Lendo banco SQLite...");

        const presentes = db.prepare(`
            SELECT *
            FROM Presente
            ORDER BY id
        `).all();

        const reservas = db.prepare(`
            SELECT *
            FROM Reserva
            ORDER BY id
        `).all();

        console.log(`🎁 Presentes encontrados: ${presentes.length}`);
        console.log(`💚 Reservas encontradas: ${reservas.length}`);

        for (const presente of presentes) {

            await prisma.presente.upsert({
                where: {
                    id: presente.id
                },

                update: {
                    nome: presente.nome,
                    categoria: presente.categoria,
                    reservado: Boolean(presente.reservado)
                },

                create: {
                    id: presente.id,
                    nome: presente.nome,
                    categoria: presente.categoria,
                    reservado: Boolean(presente.reservado),
                    createdAt: new Date(presente.createdAt)
                }
            });

            console.log(`✓ Presente: ${presente.nome}`);
        }

        for (const reserva of reservas) {

            await prisma.reserva.upsert({
                where: {
                    presenteId: reserva.presenteId
                },

                update: {
                    nomePessoa: reserva.nomePessoa,
                    telefone: reserva.telefone
                },

                create: {
                    id: reserva.id,
                    nomePessoa: reserva.nomePessoa,
                    telefone: reserva.telefone,
                    presenteId: reserva.presenteId,
                    createdAt: new Date(reserva.createdAt)
                }
            });

            console.log(`✓ Reserva do presente ID: ${reserva.presenteId}`);
        }

        console.log("");
        console.log("🎉🎉🎉 MIGRAÇÃO CONCLUÍDA! 🎉🎉🎉");

    } catch (error) {

        console.error("❌ ERRO NA MIGRAÇÃO:");
        console.error(error);

    } finally {

        db.close();
        await prisma.$disconnect();

    }
}

migrar();