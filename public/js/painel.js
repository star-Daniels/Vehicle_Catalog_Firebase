import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    app,
    db
} from "./firebase.js";


const auth = getAuth(app);



const botaoSair =
    document.getElementById("btn-sair");

const formulario =
    document.getElementById("form-carro");

const mensagem =
    document.getElementById("mensagem");

const listaCarros =
    document.getElementById("lista-carros");

const quantidadeCarros =
    document.getElementById("quantidade-carros");

const tituloFormulario =
    document.getElementById("titulo-formulario");

const botaoSalvar =
    document.getElementById("btn-salvar");

const botaoCancelar =
    document.getElementById("btn-cancelar");

const imagemInput =
    document.getElementById("imagem");

const imagemInfo =
    document.getElementById("imagem-info");




let carroEditandoId = null;




let imagemAtual = "";




onAuthStateChanged(auth, (usuario) => {

    if (!usuario) {

        window.location.href = "admin.html";

        return;
    }

    console.log(
        "Administrador logado:",
        usuario.email
    );

    carregarCarros();

});



botaoSair.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href = "admin.html";

    } catch (erro) {

        console.error(
            "Erro ao sair:",
            erro
        );

    }

});



imagemInput.addEventListener("change", () => {

    const arquivo =
        imagemInput.files[0];

    if (!arquivo) {

        imagemInfo.textContent =
            carroEditandoId
                ? "Nenhuma nova imagem selecionada. A imagem atual será mantida."
                : "Selecione a imagem do veículo.";

        return;
    }

    imagemInfo.textContent =
        `Imagem selecionada: ${arquivo.name}`;

});




formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    mensagem.textContent = "";
    mensagem.className = "";


    try {

        const arquivoImagem =
            imagemInput.files[0];




        let caminhoImagem = imagemAtual;


        if (arquivoImagem) {

            const nomeImagem =
                arquivoImagem.name;

            caminhoImagem =
                `assets/images/${nomeImagem}`;

        }




        if (!carroEditandoId && !arquivoImagem) {

            mensagem.textContent =
                "Selecione uma imagem.";

            mensagem.className =
                "erro";

            return;
        }



        const dadosCarro = {

            marca:
                document
                    .getElementById("marca")
                    .value
                    .trim(),

            modelo:
                document
                    .getElementById("modelo")
                    .value
                    .trim(),

            ano:
                Number(
                    document
                        .getElementById("ano")
                        .value
                ),

            preco:
                Number(
                    document
                        .getElementById("preco")
                        .value
                ),

            quilometragem:
                Number(
                    document
                        .getElementById("quilometragem")
                        .value
                ),

            cambio:
                document
                    .getElementById("cambio")
                    .value,

            combustivel:
                document
                    .getElementById("combustivel")
                    .value,

            cor:
                document
                    .getElementById("cor")
                    .value
                    .trim(),

            descricao:
                document
                    .getElementById("descricao")
                    .value
                    .trim(),

            imagem:
                caminhoImagem,

            destaque:
                document
                    .getElementById("destaque")
                    .checked

        };




        if (carroEditandoId) {

            const referencia =
                doc(
                    db,
                    "carros",
                    carroEditandoId
                );


            await updateDoc(
                referencia,
                dadosCarro
            );


            mensagem.textContent =
                "Veículo atualizado com sucesso!";

            mensagem.className =
                "sucesso";

        }



        else {

            await addDoc(
                collection(db, "carros"),
                dadosCarro
            );


            mensagem.textContent =
                "Veículo cadastrado com sucesso!";

            mensagem.className =
                "sucesso";

        }




        await carregarCarros();



        limparFormulario();


    } catch (erro) {

        console.error(
            "Erro ao salvar veículo:",
            erro
        );


        mensagem.textContent =
            "Erro ao salvar o veículo.";

        mensagem.className =
            "erro";

    }

});



async function carregarCarros() {

    try {

        listaCarros.innerHTML = `
            <p class="lista-vazia">
                Carregando veículos...
            </p>
        `;


        const referencia =
            collection(db, "carros");


        const snapshot =
            await getDocs(referencia);


        const carros =
            snapshot.docs.map((documento) => {

                return {

                    id: documento.id,

                    ...documento.data()

                };

            });


        quantidadeCarros.textContent =
            carros.length === 1
                ? "1 veículo"
                : `${carros.length} veículos`;


        if (carros.length === 0) {

            listaCarros.innerHTML = `
                <p class="lista-vazia">
                    Nenhum veículo cadastrado.
                </p>
            `;

            return;
        }


        listaCarros.innerHTML = "";


        carros.forEach((carro) => {

            const item =
                criarItemCarro(carro);

            listaCarros.appendChild(item);

        });


    } catch (erro) {

        console.error(
            "Erro ao carregar veículos:",
            erro
        );


        listaCarros.innerHTML = `
            <p class="lista-vazia erro-texto">
                Erro ao carregar os veículos.
            </p>
        `;

    }

}



function criarItemCarro(carro) {

    const item =
        document.createElement("div");


    item.className =
        "carro-admin";


    const preco =
        Number(carro.preco || 0)
            .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });


    const imagem =
        carro.imagem || "";


    item.innerHTML = `

        <div class="carro-admin-imagem">

            ${
                imagem
                    ? `
                        <img
                            src="${imagem}"
                            alt="${carro.marca} ${carro.modelo}"
                        >
                    `
                    : `
                        <div class="sem-imagem">
                            Sem imagem
                        </div>
                    `
            }

        </div>


        <div class="carro-admin-info">

            <div class="carro-admin-topo">

                <div>

                    <p class="carro-admin-marca">
                        ${carro.marca || ""}
                    </p>

                    <h3>
                        ${carro.modelo || ""}
                    </h3>

                </div>


                ${
                    carro.destaque
                        ? `
                            <span class="tag-destaque">
                                Destaque
                            </span>
                        `
                        : ""
                }

            </div>


            <p class="carro-admin-preco">
                ${preco}
            </p>


            <div class="carro-admin-dados">

                <span>
                    ${carro.ano || "-"}
                </span>

                <span>
                    ${Number(carro.quilometragem || 0).toLocaleString("pt-BR")} km
                </span>

                <span>
                    ${carro.cambio || "-"}
                </span>

                <span>
                    ${carro.combustivel || "-"}
                </span>

            </div>


            <div class="carro-admin-acoes">

                <button
                    type="button"
                    class="btn-editar"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="btn-excluir"
                >
                    Excluir
                </button>

            </div>

        </div>

    `;


 

    const botaoEditar =
        item.querySelector(".btn-editar");


    botaoEditar.addEventListener("click", () => {

        editarCarro(carro);

    });


    

    const botaoExcluir =
        item.querySelector(".btn-excluir");


    botaoExcluir.addEventListener("click", () => {

        excluirCarro(carro);

    });


    return item;

}




function editarCarro(carro) {

    carroEditandoId =
        carro.id;


    imagemAtual =
        carro.imagem || "";


    

    document.getElementById("marca").value =
        carro.marca || "";


    document.getElementById("modelo").value =
        carro.modelo || "";


    document.getElementById("ano").value =
        carro.ano || "";


    document.getElementById("preco").value =
        carro.preco || "";


    document.getElementById("quilometragem").value =
        carro.quilometragem || "";


    document.getElementById("cambio").value =
        carro.cambio || "";


    document.getElementById("combustivel").value =
        carro.combustivel || "";


    document.getElementById("cor").value =
        carro.cor || "";


    document.getElementById("descricao").value =
        carro.descricao || "";


    document.getElementById("destaque").checked =
        carro.destaque === true;


   

    imagemInput.value = "";


    imagemInfo.textContent =
        "Nenhuma nova imagem selecionada. A imagem atual será mantida.";


    

    tituloFormulario.textContent =
        "Editar veículo";


    botaoSalvar.textContent =
        "Salvar alterações";


    botaoCancelar.style.display =
        "block";


    

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}




async function excluirCarro(carro) {

    const confirmacao =
        confirm(
            `Deseja realmente excluir o veículo ${carro.marca} ${carro.modelo}?`
        );


    if (!confirmacao) {
        return;
    }


    try {

        const referencia =
            doc(
                db,
                "carros",
                carro.id
            );


        await deleteDoc(referencia);


        mensagem.textContent =
            "Veículo excluído com sucesso!";

        mensagem.className =
            "sucesso";


        await carregarCarros();


    } catch (erro) {

        console.error(
            "Erro ao excluir veículo:",
            erro
        );


        mensagem.textContent =
            "Erro ao excluir o veículo.";

        mensagem.className =
            "erro";

    }

}



botaoCancelar.addEventListener("click", () => {

    limparFormulario();

});




function limparFormulario() {

    formulario.reset();


    carroEditandoId =
        null;


    imagemAtual =
        "";


    tituloFormulario.textContent =
        "Cadastrar veículo";


    botaoSalvar.textContent =
        "Cadastrar veículo";


    botaoCancelar.style.display =
        "none";


    imagemInfo.textContent =
        "Selecione a imagem do veículo.";

}