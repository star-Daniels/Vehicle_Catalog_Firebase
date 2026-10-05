import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const container = document.getElementById("detalhes-veiculo");

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarQuilometragem(km) {
    return km.toLocaleString("pt-BR") + " km";
}

function mostrarErro() {
    container.innerHTML = `
        <div class="detalhes-erro">

            <h1>Veículo não encontrado</h1>

            <p>
                O veículo que você procura não existe.
            </p>

            <a href="index.html" class="card-botao">
                Voltar para veículos
            </a>

        </div>
    `;
}


function mostrarDetalhes(carro) {

    document.title = `${carro.marca} ${carro.modelo} | Vilauto`;

    const mensagemWhatsApp =
        `Olá! Vi o carro ${carro.marca} ${carro.modelo} no site da Vilauto e tenho interesse.`;

    const linkWhatsApp =
        `https://wa.me/5575982345343?text=${encodeURIComponent(mensagemWhatsApp)}`;

    container.innerHTML = `

        <div class="detalhes-grid">

            <div class="detalhes-imagem-container">

                <img
                    class="detalhes-imagem"
                    src="${carro.imagem}"
                    alt="${carro.marca} ${carro.modelo}"
                >

                ${
                    carro.destaque
                    ? '<span class="detalhes-destaque">Destaque</span>'
                    : ""
                }

            </div>

            <div class="detalhes-info">

                <p class="detalhes-marca">
                    ${carro.marca}
                </p>

                <h1>
                    ${carro.modelo}
                </h1>

                <p class="detalhes-preco">
                    ${formatarPreco(carro.preco)}
                </p>

                <div class="detalhes-especificacoes">

                    <div>
                        <span>Ano</span>
                        <strong>${carro.ano}</strong>
                    </div>

                    <div>
                        <span>Quilometragem</span>
                        <strong>
                            ${formatarQuilometragem(carro.quilometragem)}
                        </strong>
                    </div>

                    <div>
                        <span>Câmbio</span>
                        <strong>${carro.cambio}</strong>
                    </div>

                    <div>
                        <span>Combustível</span>
                        <strong>${carro.combustivel}</strong>
                    </div>

                    <div>
                        <span>Cor</span>
                        <strong>${carro.cor}</strong>
                    </div>

                </div>

                <div class="detalhes-descricao">

                    <h2>Sobre o veículo</h2>

                    <p>
                        ${carro.descricao}
                    </p>

                </div>

                <a
                    href="${linkWhatsApp}"
                    class="detalhes-contato"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Tenho interesse
                </a>

            </div>

        </div>

    `;

}



async function carregarDetalhes() {

    try {

        if (!id) {
            mostrarErro();
            return;
        }

        const referencia = doc(db, "carros", id);

        const snapshot = await getDoc(referencia);

        if (!snapshot.exists()) {
            mostrarErro();
            return;
        }

        const carro = {
            id: snapshot.id,
            ...snapshot.data()
        };

        console.log("Veículo carregado:", carro);

        mostrarDetalhes(carro);

    } catch (erro) {

        console.error("Erro ao carregar veículo:", erro);

        mostrarErro();

    }
}

carregarDetalhes();