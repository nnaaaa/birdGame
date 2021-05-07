const MAX_WIDTH = 288
const MAX_HEIGHT = 512
const bird = {
    pos: {
        x: MAX_WIDTH / 2 - 50 / 2,
        y: MAX_HEIGHT / 2 - 50 / 2,
    },
    size: {
        width: 38,
        height: 26
    }
}
const foreground = {
    height: 108
}
const pipe = {
    size: {
        width: 52,
        height: 404
    },
    gap: 120
}
const pipe1 = {
    pos: 500,
}
const pipe2 = {
    pos: 500
}
const gameOver = document.querySelector(".gameOver")
const background = document.querySelector(".background")
const birdObj = document.querySelector(".bird")
const pipe1Obj = document.querySelector(".pipe1")
const pipe1_top = document.querySelector(".pipe1 .top")
const pipe1_bot = document.querySelector(".pipe1 .bot")
const pipe2Obj = document.querySelector(".pipe2")


gameOver.addEventListener("click", () => {
    gameOver.style.display = 'none'
    setWorld()
    Start()
})
const jump = () => {
    bird.pos.y -= 60
}


const randomPipe = () => {
    const min = 50
    const max = MAX_HEIGHT - foreground.height - pipe.gap - min
    const top = Math.random() * (max - min + 1) + min
    const bot = MAX_HEIGHT - 100 - top - pipe.gap
    return [bot, top]
}
const newPipe = () => {
    pipe1.pos = 306
    const [bot, top] = randomPipe()
    pipe1_top.style.height = `${top}px`
    pipe1_bot.style.height = `${bot}px`

}

function setWorld() {
    document.addEventListener("click", jump)
    bird.pos.x = MAX_WIDTH / 2 - 50 / 2,
        bird.pos.y = MAX_HEIGHT / 2 - 50 / 2,
        pipe1.pos = 600

    birdObj.style.top = `${bird.pos.y}px`
    birdObj.style.left = `${bird.pos.x}px`

    const [bot, top] = randomPipe()
    pipe1Obj.style.left = `${pipe1.pos}px`
    pipe1_top.style.height = `${top}px`
    pipe1_bot.style.height = `${bot}px`
}


function Start() {
    const pipeTop = parseInt(pipe1_top.style.height)
    const pipeBot = parseInt(pipe1_bot.style.height)
    const gap = pipeTop

    pipe1.pos -= 3
    bird.pos.y += 3
    
    if (pipe1.pos <= 0 - pipe.size.width) {
        newPipe();
    }
    if (
        bird.pos.y + bird.size.height >= MAX_HEIGHT - foreground.height ||
        bird.pos.y <= 0 ||
        ((bird.pos.y <= gap || bird.pos.y + bird.size.height >= gap + pipe.gap) &&
        (bird.pos.x + bird.size.width >= pipe1.pos && bird.pos.x <= pipe1.pos + pipe.size.width))
    ) {
        birdObj.style.top = `${bird.pos.y}px`
        pipe1Obj.style.left = `${pipe1.pos}px`
        gameOver.style.display = 'flex'
        document.removeEventListener("click", jump)
    } else {
        birdObj.style.top = `${bird.pos.y}px`
        pipe1Obj.style.left = `${pipe1.pos}px`
        requestAnimationFrame(Start)
    }
}

setWorld()
Start()