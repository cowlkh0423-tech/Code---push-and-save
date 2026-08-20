// ===============================
// Ancient Duel - Main Controller
// ===============================


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



let WIDTH;
let HEIGHT;



function resizeCanvas(){

    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight;

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();




// ===============================
// 입력 관리
// ===============================


const keys = {};


window.addEventListener(
    "keydown",
    e=>{

        keys[e.code] = true;

    }
);


window.addEventListener(
    "keyup",
    e=>{

        keys[e.code] = false;

    }
);





// ===============================
// 게임 상태
// ===============================


const game = {


    running:true,


    delta:0,


    lastTime:0,


    message:"고대 사막 결투"


};






// ===============================
// 플레이어 생성
// ===============================


const player1 = new Player(
    450,
    400,
    "#2563d8",
    {
        up:"KeyW",
        down:"KeyS",
        left:"KeyA",
        right:"KeyD",
        attack:"KeyQ"
    }
);



const player2 = new Player(
    900,
    400,
    "#d83b4b",
    {
        up:"ArrowUp",
        down:"ArrowDown",
        left:"ArrowLeft",
        right:"ArrowRight",
        attack:"Numpad0"
    }
);





// ===============================
// 아이템
// ===============================


const items=[];






// ===============================
// 업데이트
// ===============================


function update(dt){


    player1.update(
        player2,
        dt,
        keys
    );


    player2.update(
        player1,
        dt,
        keys
    );



    updatePhysics(
        player1,
        player2
    );



    updateItems(
        items,
        player1,
        player2,
        dt
    );


}







// ===============================
// 렌더링
// ===============================


function render(){


    ctx.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );



    drawMap(
        ctx,
        WIDTH,
        HEIGHT
    );



    drawItems(
        ctx,
        items
    );



    player1.draw(
        ctx
    );


    player2.draw(
        ctx
    );



    updateUI();

}






function updateUI(){


    document.getElementById("p1").innerText =
    "BLUE : "+player1.hp+" HP";


    document.getElementById("p2").innerText =
    "RED : "+player2.hp+" HP";


}








// ===============================
// 게임 루프
// ===============================


function gameLoop(time){


    let dt =
    (time-game.lastTime)/1000;


    game.lastTime=time;


    if(dt>0.1)
        dt=0.1;



    update(dt);


    render();



    requestAnimationFrame(
        gameLoop
    );


}





requestAnimationFrame(
    gameLoop
);
