let presenteSelecionado = null;

const modal = document.getElementById("modal");
const nomePresente = document.getElementById("nomePresente");
const nomePessoa = document.getElementById("nomePessoa");
const telefone = document.getElementById("telefone");

async function carregarPresentes() {
  const resposta = await fetch(API);
  const presentes = await resposta.json();

  document.querySelector("#cozinha .itens").innerHTML = "";
  document.querySelector("#banheiro .itens").innerHTML = "";
  document.querySelector("#casa .itens").innerHTML = "";

  presentes.forEach((presente) => {
    const item = document.createElement("div");

    item.className = "item";

    item.innerHTML = `
    <div class="presente-info">

        <span>${presente.nome}</span>

        ${
          presente.reservado
            ? `<small class="mensagem-reservado">
                    🌷 Alguém já vai nos presentear com esse item!
Escolha outro para deixar seu carinho por aqui. 💕
                   </small>`
            : ""
        }

    </div>

    <button
        class="botao ${presente.reservado ? "reservado" : ""}"
        ${presente.reservado ? "disabled" : ""}>
        ${presente.reservado ? "✓" : "Presentear"}
    </button>
`;
    const botao = item.querySelector("button");

    if (!presente.reservado) {
      botao.addEventListener("click", () => {
        presenteSelecionado = presente;

        nomePresente.textContent = presente.nome;

        nomePessoa.value = "";
        telefone.value = "";

        modal.classList.add("ativo");
      });
    }

    const categoria = presente.categoria.toLowerCase();

    document.querySelector(`#${categoria} .itens`).appendChild(item);
  });
}

document.getElementById("cancelar").addEventListener("click", () => {
  modal.classList.remove("ativo");
});

document.getElementById("confirmar").addEventListener("click", async () => {
  if (!nomePessoa.value.trim()) {
    alert("Informe seu nome.");

    return;
  }

  const resposta = await fetch("/api/presentes/reservar", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      presenteId: presenteSelecionado.id,
      nomePessoa: nomePessoa.value,
      telefone: telefone.value,
    }),
  });

  if (resposta.ok) {
    modal.classList.remove("ativo");

    carregarPresentes();
  } else {
    alert("Erro ao reservar o presente.");
  }
});

carregarPresentes();
