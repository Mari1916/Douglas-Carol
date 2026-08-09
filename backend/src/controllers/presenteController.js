const prisma = require("../lib/prisma");

async function listar(req, res) {
  try {
    const presentes = await prisma.presente.findMany({
      orderBy: [
        { categoria: "asc" },
        { nome: "asc" }
      ]
    });

    res.json(presentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar presentes." });
  }
}

async function reservar(req, res) {

    const {
        presenteId,
        nomePessoa,
        telefone
    } = req.body;

    try {

        const presente = await prisma.presente.findUnique({
            where: {
                id: Number(presenteId)
            }
        });

        if (!presente) {
            return res.status(404).json({
                erro: "Presente não encontrado."
            });
        }

        if (presente.reservado) {
            return res.status(409).json({
                erro: "Esse presente já foi reservado."
            });
        }

        await prisma.reserva.create({
            data: {
                nomePessoa,
                telefone,
                presenteId: Number(presenteId)
            }
        });

        await prisma.presente.update({
            where: {
                id: Number(presenteId)
            },
            data: {
                reservado: true
            }
        });

        res.json({
            sucesso: true,
            mensagem: "Presente reservado com sucesso!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao reservar o presente."
        });

    }

}

async function listarReservas(req, res) {
    try {
        const reservas = await prisma.reserva.findMany({
            include: {
                presente: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        res.json(reservas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao listar reservas."
        });
    }
}

module.exports = {
  listar,
  reservar,
  listarReservas
};