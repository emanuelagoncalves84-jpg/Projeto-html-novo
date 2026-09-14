const modal = document.getElementById("modal");

const btnEditar = document.getElementById("btnEditar");

const avatarTopo = document.getElementById("avatarTopo");

const fecharModal = document.getElementById("fecharModal");

const formulario = document.getElementById("formPerfil");

const nomePerfil = document.getElementById("nomePerfil");

const usuarioPerfil = document.getElementById("usuarioPerfil");

const cursoPerfil = document.getElementById("cursoPerfil");

const bioPerfil = document.getElementById("bioPerfil");

const fotoPerfil = document.getElementById("fotoPerfil");

const inputNome = document.getElementById("inputNome");

const inputUsuario = document.getElementById("inputUsuario");

const inputCurso = document.getElementById("inputCurso");

const inputBio = document.getElementById("inputBio");


let usuario = {
    nome: "Nome de Perfil",
    username: "@nomedeusuario",
    curso: "Técnico em Desenvolvimento de Sistemas",
    bio: "Insira sua biografia"
};


function atualizarPerfil() {

    nomePerfil.textContent = usuario.nome;

    usuarioPerfil.textContent = usuario.username;

    cursoPerfil.textContent = usuario.curso;

    bioPerfil.textContent = usuario.bio;

    fotoPerfil.textContent =
        usuario.nome.charAt(0).toUpperCase();

    avatarTopo.textContent =
        usuario.nome.charAt(0).toUpperCase();
}


function abrirModal() {

    inputNome.value = usuario.nome;

    inputUsuario.value =
        usuario.username.replace("@", "");

    inputCurso.value = usuario.curso;

    inputBio.value = usuario.bio;

    modal.classList.remove("escondido");
}


function fechar() {

    modal.classList.add("escondido");
}


btnEditar.addEventListener(
    "click",
    abrirModal
);


avatarTopo.addEventListener(
    "click",
    abrirModal
);


fecharModal.addEventListener(
    "click",
    fechar
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            fechar();
        }

    }
);


formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        usuario.nome =
            inputNome.value.trim();

        usuario.username =
            "@" + inputUsuario.value.trim();

        usuario.curso =
            inputCurso.value.trim();

        usuario.bio =
            inputBio.value.trim();

        atualizarPerfil();

        fechar();

    }
);


document
    .querySelectorAll(".botoesIniciais button")
    .forEach(function(botao) {

        botao.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".botoesIniciais button")
                    .forEach(function(item) {

                        item.style.backgroundColor =
                            "transparent";

                        item.style.color =
                            "white";

                    });

                if (botao.id !== "botaoPublicar") {

                    botao.style.backgroundColor =
                        "#999999";

                    botao.style.borderRadius =
                        "30px";

                }

            }
        );

    });


atualizarPerfil();