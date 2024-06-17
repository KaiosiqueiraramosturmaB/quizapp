import { verificarTema, trocarTema } from "../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let perguntas = 1

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")

    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`)
    iconeImg.setAttribute("alt", `icone de ${assunto}`)
    assuntoTitulo.innerText = assunto
}

async function buscarPerguntas() {
    const urlDados = "../../data.json"
   
    await fetch(url).then(respostas => respostas.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto) {
                quiz = dado
            }
        })
    })
}

function montarPergunta() {
    const main  = document.querySelector("main")

    main.innserHTML = `
        <section class="pergunta">
                <div>
                    <p>Questão ${pergunta} de 10</p>

                    <h2>${alterarSinais(quiz.questions[pergunta-1].question)}</h2>
                <div>
                <div class="barra_progresso">
                    <div style="width: ${pergunta * 10}%"></div>
                </div>
            </section>

            <section class="alternativas">
                <form action="">
                    <label for="alternativas_a">
                        <input type="radio" id="alternativa_a" name="alternativa">

                        <div>
                            <span>A</span>
                            ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                        </div>
                    </label>

                    <label for="alternativas_b">
                        <input type="radio" id="alternativa_b" name="alternativa">

                        <div>
                            <span>B</span>
                            ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                        </div>
                    </label>

                    <label for="alternativas_c">
                        <input type="radio" id="alternativa_c" name="alternativa">

                        <div>
                            <span>C</span>
                            ${quiz.questions[pergunta-1].options[2]}
                        </div>
                    </label>

                    <label for="alternativas_d">
                        <input type="radio" id="alternativa_d" name="alternativa">

                        <div>
                            <span>D</span>
                            ${quiz.questions[pergunta-1].options[3]}
                        </div>
                    </label>
                </form>

                <button>Enviar</button>
            </section>
        `
}

function alterarsinais(texto) {
    return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function iniciar() {
    alterarAssunto()
   await buscarPerguntas()
    montarPergunta()
}

iniciar
