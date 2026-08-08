const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.presente.createMany({
    data: [
      // COZINHA
      { nome: "Concha", categoria: "Cozinha" },
      { nome: "Potes para mantimentos", categoria: "Cozinha" },
      { nome: "Escumadeira", categoria: "Cozinha" },
      { nome: "Colher de pau", categoria: "Cozinha" },
      { nome: "Abridor de latas e garrafas", categoria: "Cozinha" },
      { nome: "Descanso de panela", categoria: "Cozinha" },
      { nome: "Ralador", categoria: "Cozinha" },
      { nome: "Peneira", categoria: "Cozinha" },
      { nome: "Forma para bolo", categoria: "Cozinha" },
      { nome: "Leiteira", categoria: "Cozinha" },
      { nome: "Canecas", categoria: "Cozinha" },
      { nome: "Porta papel-toalha", categoria: "Cozinha" },
      { nome: "Jogo de facas", categoria: "Cozinha" },
      { nome: "Porta guardanapo", categoria: "Cozinha" },
      { nome: "Pano de prato", categoria: "Cozinha" },
      { nome: "Escorredor de arroz e macarrão", categoria: "Cozinha" },
      { nome: "Assadeira", categoria: "Cozinha" },
      { nome: "Tábuas de carne", categoria: "Cozinha" },
      { nome: "Porta temperos", categoria: "Cozinha" },
      { nome: "Garrafa térmica", categoria: "Cozinha" },
      { nome: "Saladeira", categoria: "Cozinha" },

      // BANHEIRO
      { nome: "Toalhas de rosto", categoria: "Banheiro" },
      { nome: "Porta sabonete", categoria: "Banheiro" },
      { nome: "Porta escova de dentes", categoria: "Banheiro" },

      // CASA
      { nome: "Tapete de banheiro", categoria: "Casa" },
      { nome: "Tapete de cozinha", categoria: "Casa" },
      { nome: "Jogo de lençóis e colcha", categoria: "Casa" }
    ]
  });

  console.log("✅ Presentes cadastrados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });