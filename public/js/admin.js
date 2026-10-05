import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

const formulario = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagem.textContent = "";

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        window.location.href = "painel.html";

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "E-mail ou senha incorretos.";

    }

});