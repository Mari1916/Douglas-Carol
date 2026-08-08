const app = require("./app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function iniciar() {
    try {
        await prisma.reserva.deleteMany({
            where: {
                presenteId: 7
            }
        });

        await prisma.presente.update({
            where: {
                id: 7
            },
            data: {
                reservado: false
            }
        });

        console.log("✅ Reserva do abridor de latas cancelada!");

    } catch (erro) {
        console.error("❌ Erro ao cancelar reserva:", erro);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

iniciar();