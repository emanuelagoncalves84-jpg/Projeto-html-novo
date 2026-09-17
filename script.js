// Pega os elementos do DOM
const botaoPublicar = document.getElementById("botao-publicar");
const modalPublicacao = document.getElementById("modalPublicacao");
const fecharModal = document.getElementById("fecharModal");
const enviarPublicacao = document.getElementById("enviarPublicacao");
const arquivoPublicacao = document.getElementById("arquivoPublicacao");
const textoNovaPublicacao = document.getElementById("textoNovaPublicacao");
const previewArquivo = document.getElementById("previewArquivo");
const publicacoes = document.getElementById("publicacoes");

// Salva o arquivo atual
let arquivoSelecionado = null;

// Abre o modal
botaoPublicar.addEventListener("click", function () {
    modalPublicacao.classList.add("aberto");
});

// Fecha no X
fecharModal.addEventListener("click", fecharModalPublicacao);

modalPublicacao.addEventListener("click", function (evento) {
    if (evento.target === modalPublicacao) {
        fecharModalPublicacao();
    }
});

// Trata a imagem/video do input
arquivoPublicacao.addEventListener("change", function () {

    const arquivo = arquivoPublicacao.files[0];

    // Se nao tiver arquivo limpa a previa
    if (!arquivo) {
        arquivoSelecionado = null;
        previewArquivo.innerHTML = "";
        return;
    }

    // Aceita so foto ou video
    if (
        arquivo.type.startsWith("image/") ||
        arquivo.type.startsWith("video/")
    ) {

        arquivoSelecionado = arquivo;

        // URL temporaria pra carregar no img/video
        const url = URL.createObjectURL(arquivo);

        if (arquivo.type.startsWith("image/")) {

            previewArquivo.innerHTML =
                `<img src="${url}" alt="Prévia da imagem">`;

        } else {

            previewArquivo.innerHTML =
                `<video src="${url}" controls></video>`;
        }

    } else {

        arquivoSelecionado = null;
        previewArquivo.innerHTML = "";

        alert("Escolha uma imagem ou um vídeo.");
    }
});

// Dispara a criacao do post
enviarPublicacao.addEventListener("click", function () {

    const texto = textoNovaPublicacao.value.trim();

    // Validacao simples
    if (texto === "" && arquivoSelecionado === null) {
        alert("Escreva algo ou escolha uma foto ou vídeo.");
        return;
    }

    criarPublicacao(texto, arquivoSelecionado);

    fecharModalPublicacao();
});

// Monta o HTML do post dinamico
function criarPublicacao(texto, arquivo) {

    const publicacao = document.createElement("article");

    publicacao.className = "publicacao";

    let conteudoMidia = "";

    if (arquivo !== null) {

        const url = URL.createObjectURL(arquivo);

        if (arquivo.type.startsWith("image/")) {

            conteudoMidia =
                `
                <div class="imagemPublicacao">
                    <img src="${url}" alt="Imagem publicada">
                </div>
                `;

        } else if (arquivo.type.startsWith("video/")) {

            conteudoMidia =
                `
                <div class="imagemPublicacao">
                    <video src="${url}" controls></video>
                </div>
                `;
        }

    } else {

        conteudoMidia =
            `
            <div class="imagemPublicacao">
                <span>Publicação de texto</span>
            </div>
            `;
    }

    // Injeta a estrutura
    publicacao.innerHTML =
        `
        <div class="cabecalhoPublicacao">

            <div class="fotoPublicacao">
                N
            </div>

            <div class="nomePublicacao">

                <strong>
                    Nome de Perfil
                </strong>

                <span>
                    @nomedeusuario
                </span>

            </div>

        </div>

        <p class="textoPublicacao">
            ${texto}
        </p>

        ${conteudoMidia}

        <div class="acoes">

            <button class="botaoLike">
                ♡
            </button>

            <span class="numeroLikes">
                0 likes
            </span>

        </div>

        <div class="comentarios">

            <div class="listaComentarios"></div>

            <form class="formComentario">

                <input
                    type="text"
                    class="inputComentario"
                    placeholder="Escreva um comentário..."
                    maxlength="150"
                    required>

                <button type="submit">
                    Enviar
                </button>

            </form>

        </div>
        `;

    // Adiciona no topo do feed
    publicacoes.prepend(publicacao);

    // Amarra os eventos de like e comentario no post novo
    configurarLike(publicacao);

    configurarComentario(publicacao);
}

// Lógica de like/descurtir
function configurarLike(publicacao) {

    const botaoLike = publicacao.querySelector(".botaoLike");
    const numeroLikes = publicacao.querySelector(".numeroLikes");

    let curtido = false;
    let likes = parseInt(numeroLikes.textContent);

    botaoLike.addEventListener("click", function () {

        if (curtido) {

            curtido = false;
            likes--;

            botaoLike.textContent = "♡";
            botaoLike.classList.remove("curtido");

        } else {

            curtido = true;
            likes++;

            botaoLike.textContent = "♥";
            botaoLike.classList.add("curtido");
        }

        numeroLikes.textContent = likes + " likes";
    });
}

// Injeta o comentario na div
function configurarComentario(publicacao) {

    const formulario = publicacao.querySelector(".formComentario");
    const input = publicacao.querySelector(".inputComentario");
    const lista = publicacao.querySelector(".listaComentarios");

    formulario.addEventListener("submit", function (evento) {

        // Para o reload do form
        evento.preventDefault();

        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const comentario = document.createElement("div");

        comentario.className = "comentario";

        const nome = document.createElement("strong");
        nome.textContent = "Nome de Perfil";

        const mensagem = document.createElement("span");
        mensagem.textContent = texto;

        comentario.appendChild(nome);
        comentario.appendChild(mensagem);

        lista.appendChild(comentario);

        input.value = "";
    });
}

// Reseta o form do modal
function fecharModalPublicacao() {

    modalPublicacao.classList.remove("aberto");

    textoNovaPublicacao.value = "";

    arquivoPublicacao.value = "";

    previewArquivo.innerHTML = "";

    arquivoSelecionado = null;
}

// Aplica pro post que ja vem estatico no HTML
const publicacaoInicial =
    document.querySelector(".publicacao");

configurarLike(publicacaoInicial);

configurarComentario(publicacaoInicial);