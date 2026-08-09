const app = require("./app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function iniciar() {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

iniciar();