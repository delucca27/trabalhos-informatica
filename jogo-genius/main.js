const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main.jogo-container")
const divGameOver = document.querySelector("main.gameover-container")
const divs = Array.from(divMain.querySelectorAll("div"))

const returnBtn = document.getElementById("return-btn")
const divContagemMostrador = document.getElementById("contagem-numero")
const divContagemContainer = document.querySelector("main.contagem-container")

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

contagemInicial()

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("PERAÍ >:(")
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        divMain.style.display = "none"
        divGameOver.style.display = "flex"
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 1000)
    }
})

returnBtn.addEventListener("click", fecharTela)


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 800 * index);
    })
}

function inicio() {
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        console.log(cnt--)
        if(cnt <= 0) {
            turno()
            clearInterval(idx)
        }
    }, 1000)

    divMain.style.display = "flex"
    divContagemContainer.style.display = "none"
    divGameOver.style.display = "none"

    console.log("e la vamos nós...")
}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}

function contagemInicial() {

    let contador = 3
    contagem = setInterval(() => {

        contador--
        divContagemMostrador.innerText = contador

        if (contador <= 0) {
            clearInterval(contagem)
            inicio()

            divContagemContainer.style.display = "none"
        }

    }, 1000)
}

function fecharTela() {
    divGameOver.style.display = "none"
    divMain.style.display = "flex"
    inicio()
    return
}
