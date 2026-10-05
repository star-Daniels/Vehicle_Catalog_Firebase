import { db } from "./firebase.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


let carros = [];

const listaVeiculos = document.getElementById("lista-veiculos");
const contadorCarros = document.getElementById("contador-carros");
const semResultados = document.getElementById("sem-resultados");

const busca = document.getElementById("busca");
const filtroMarca = document.getElementById("marca");
const filtroModelo = document.getElementById("modelo");
const precoMin = document.getElementById("preco-min");
const precoMax = document.getElementById("preco-max");
const anoMin = document.getElementById("ano-min");
const anoMax = document.getElementById("ano-max");
const kmMin = document.getElementById("km-min");
const kmMax = document.getElementById("km-max");
const filtroCambio = document.getElementById("cambio");
const filtroCombustivel = document.getElementById("combustivel");
const limparFiltros = document.getElementById("limpar-filtros");
const ordenar = document.getElementById("ordenar");

function formatarPreco(preco) {
return preco.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
});
}

function formatarQuilometragem(km) {
return km.toLocaleString("pt-BR") + " km";
}

function criarCard(car) {
return ` <article class="card-veiculo"> <div class="card-imagem-container"> <img
                 class="card-imagem"
                 src="${car.imagem}"
                 alt="${car.marca} ${car.modelo}"
             >


            ${car.destaque ? '<span class="card-destaque">Destaque</span>' : ""}
        </div>

        <div class="card-conteudo">
            <h3 class="card-titulo">
                ${car.marca} ${car.modelo}
            </h3>

            <p class="card-descricao">
                ${car.descricao}
            </p>

            <div class="card-informacoes">
                <span>${car.ano}</span>
                <span>${formatarQuilometragem(car.quilometragem)}</span>
                <span>${car.cambio}</span>
                <span>${car.combustivel}</span>
            </div>

            <p class="card-preco">
                ${formatarPreco(car.preco)}
            </p>

            <a
                href="detalhes.html?id=${car.id}"
                class="card-botao"
            >
                Ver detalhes
            </a>
        </div>
    </article>
`;


}

function mostrarCarros(lista) {
listaVeiculos.innerHTML = "";


if (lista.length === 0) {
    semResultados.hidden = false;
    contadorCarros.textContent = "0 veículos encontrados";
    return;
}

semResultados.hidden = true;

lista.forEach(car => {
    listaVeiculos.innerHTML += criarCard(car);
});

contadorCarros.textContent =
    lista.length === 1
        ? "1 veículo encontrado"
        : `${lista.length} veículos encontrados`;


}

function preencherMarcas() {
const marcas = [...new Set(carros.map(car => car.marca))];


filtroMarca.innerHTML = `
    <option value="">Todas as marcas</option>
`;

marcas.sort().forEach(marca => {
    filtroMarca.innerHTML += `
        <option value="${marca}">${marca}</option>
    `;
});


}

function preencherModelos() {
const marcaSelecionada = filtroMarca.value;


let carrosFiltrados = carros;

if (marcaSelecionada) {
    carrosFiltrados = carros.filter(
        car => car.marca === marcaSelecionada
    );
}

const modelos = [
    ...new Set(carrosFiltrados.map(car => car.modelo))
];

filtroModelo.innerHTML = `
    <option value="">Todos os modelos</option>
`;

modelos.sort().forEach(modelo => {
    filtroModelo.innerHTML += `
        <option value="${modelo}">${modelo}</option>
    `;
});


}

function aplicarFiltros() {
const textoBusca = busca.value.toLowerCase().trim();


const marcaSelecionada = filtroMarca.value;
const modeloSelecionado = filtroModelo.value;

const precoMinimo = Number(precoMin.value);
const precoMaximo = Number(precoMax.value);

const anoMinimo = Number(anoMin.value);
const anoMaximo = Number(anoMax.value);

const kmMinimo = Number(kmMin.value);
const kmMaximo = Number(kmMax.value);

const cambioSelecionado = filtroCambio.value;
const combustivelSelecionado = filtroCombustivel.value;

let resultado = carros.filter(car => {
    const correspondeBusca =
        textoBusca === "" ||
        car.marca.toLowerCase().includes(textoBusca) ||
        car.modelo.toLowerCase().includes(textoBusca);

    const correspondeMarca =
        marcaSelecionada === "" ||
        car.marca === marcaSelecionada;

    const correspondeModelo =
        modeloSelecionado === "" ||
        car.modelo === modeloSelecionado;

    const correspondePrecoMin =
        !precoMinimo ||
        car.preco >= precoMinimo;

    const correspondePrecoMax =
        !precoMaximo ||
        car.preco <= precoMaximo;

    const correspondeAnoMin =
        !anoMinimo ||
        car.ano >= anoMinimo;

    const correspondeAnoMax =
        !anoMaximo ||
        car.ano <= anoMaximo;

    const correspondeKmMin =
        !kmMinimo ||
        car.quilometragem >= kmMinimo;

    const correspondeKmMax =
        !kmMaximo ||
        car.quilometragem <= kmMaximo;

    const correspondeCambio =
        cambioSelecionado === "" ||
        car.cambio === cambioSelecionado;

    const correspondeCombustivel =
        combustivelSelecionado === "" ||
        car.combustivel === combustivelSelecionado;

    return (
        correspondeBusca &&
        correspondeMarca &&
        correspondeModelo &&
        correspondePrecoMin &&
        correspondePrecoMax &&
        correspondeAnoMin &&
        correspondeAnoMax &&
        correspondeKmMin &&
        correspondeKmMax &&
        correspondeCambio &&
        correspondeCombustivel
    );
});

ordenarCarros(resultado);
mostrarCarros(resultado);


}

function ordenarCarros(lista) {
const tipoOrdenacao = ordenar.value;


if (tipoOrdenacao === "preco-menor") {
    lista.sort((a, b) => a.preco - b.preco);
}

if (tipoOrdenacao === "preco-maior") {
    lista.sort((a, b) => b.preco - a.preco);
}

if (tipoOrdenacao === "ano-novo") {
    lista.sort((a, b) => b.ano - a.ano);
}

if (tipoOrdenacao === "ano-antigo") {
    lista.sort((a, b) => a.ano - b.ano);
}

if (tipoOrdenacao === "km-menor") {
    lista.sort(
        (a, b) => a.quilometragem - b.quilometragem
    );
}

if (tipoOrdenacao === "km-maior") {
    lista.sort(
        (a, b) => b.quilometragem - a.quilometragem
    );
}


}

function limparTodosFiltros() {
busca.value = "";


filtroMarca.value = "";
filtroModelo.value = "";

precoMin.value = "";
precoMax.value = "";

anoMin.value = "";
anoMax.value = "";

kmMin.value = "";
kmMax.value = "";

filtroCambio.value = "";
filtroCombustivel.value = "";

ordenar.value = "";

preencherModelos();
mostrarCarros(carros);


}

busca.addEventListener("input", aplicarFiltros);

filtroMarca.addEventListener("change", () => {
preencherModelos();
filtroModelo.value = "";
aplicarFiltros();
});

filtroModelo.addEventListener("change", aplicarFiltros);

precoMin.addEventListener("input", aplicarFiltros);
precoMax.addEventListener("input", aplicarFiltros);

anoMin.addEventListener("input", aplicarFiltros);
anoMax.addEventListener("input", aplicarFiltros);

kmMin.addEventListener("input", aplicarFiltros);
kmMax.addEventListener("input", aplicarFiltros);

filtroCambio.addEventListener("change", aplicarFiltros);
filtroCombustivel.addEventListener("change", aplicarFiltros);

ordenar.addEventListener("change", aplicarFiltros);

limparFiltros.addEventListener("click", limparTodosFiltros);

async function carregarCarros() {
    try {
        const referencia = collection(db, "carros");

        const snapshot = await getDocs(referencia);

        carros = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        preencherMarcas();
        preencherModelos();
        mostrarCarros(carros);

        console.log("Carros carregados:", carros);

    } catch (erro) {
        console.error("Erro ao carregar carros:", erro);
    }
}

carregarCarros();

