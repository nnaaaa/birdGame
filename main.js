const MAX_WIDTH=500
const MAX_HEIGHT=800
const bird={
    pos:{
        x:MAX_WIDTH/2-50/2,
        y:MAX_HEIGHT/2-50/2,
    },
    size:{
        width:40,
        height:40
    }
}
const pipe={
    pos:{
        x:80,
        y:50
    },
    size:{
        width:50,
        height:80
    },
    gap:150
}
const pipe1={
    pos:500,
    top:0,
    bot:0
}
const pipe2={
    pos:500
}
const gameOver=document.querySelector(".gameOver")
const birdObj=document.querySelector(".bird")
const pipe1Obj=document.querySelector(".pipe1")
const pipe1_top=document.querySelector(".pipe1 .top")
const pipe1_bot=document.querySelector(".pipe1 .bot")
const pipe2Obj=document.querySelector(".pipe2")
gameOver.addEventListener("click",()=>{
    gameOver.style.display='none'   
    setWorld()
    Start()
})
const jump=()=>{  
    bird.pos.y-=90
}  
const randomPipe=()=>{
    const min=100
    const max=MAX_HEIGHT-pipe.size.height*2-pipe.gap-min
    const top=Math.random()*(max-min+1)+min
    const bot=MAX_HEIGHT-100-top-pipe.gap
    return [bot,top]
}

function setWorld(){
    document.addEventListener("click",jump)
    bird.pos.x=MAX_WIDTH/2-50/2,
    bird.pos.y=MAX_HEIGHT/2-50/2,
    pipe1.pos=600

    birdObj.style.top=`${bird.pos.y}px`
    birdObj.style.left=`${bird.pos.x}px`
    const [bot,top]=randomPipe()
    pipe1Obj.style.left=`${pipe1.pos}px`
    pipe1_top.style.height=`${top}px`
    pipe1_bot.style.height=`${bot}px`
}


function Start(){
    const pipeTop=parseInt(pipe1_top.style.height)
    const pipeBot=parseInt(pipe1_bot.style.height)
    const gap=pipeTop+50
    if (pipe1.pos<=0-pipe.size.width){
        pipe1.pos=500
        const [bot,top]=randomPipe()
        pipe1_top.style.height=`${top}px`
        pipe1_bot.style.height=`${bot}px`
    }
    birdObj.style.top=`${bird.pos.y}px`
    pipe1Obj.style.left=`${pipe1.pos}px`

    if (
        bird.pos.y>=MAX_HEIGHT-50-bird.size.height||
        bird.pos.y<=50||

        ((bird.pos.x+bird.size.width>=pipe1.pos&&bird.pos.x<=pipe1.pos+pipe.size.width)&&
        (bird.pos.y<gap||bird.pos.y+bird.size.height>gap+pipe.gap))||

        ((bird.pos.y<gap||bird.pos.y+bird.size.height>gap+pipe.gap)&&
        (bird.pos.x+bird.size.width>=pipe1.pos&&bird.pos.x<=pipe1.pos))
    ){
        gameOver.style.display='flex'
        document.removeEventListener("click",jump)
        cancelAnimationFrame(Start)
    }
    else{
        pipe1.pos-=3
        bird.pos.y+=3
        requestAnimationFrame(Start)
    }

    
}

setWorld()
Start()