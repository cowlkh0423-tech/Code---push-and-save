// =================================
// Ancient Duel - Main System FINAL
// =================================


const canvas =
document.getElementById(
    "gameCanvas"
);


const ctx =
canvas.getContext("2d");





function resize(){

    canvas.width=
    window.innerWidth;

    canvas.height=
    window.innerHeight;

}


window.addEventListener(
"resize",
resize
);


resize();





// ===============================
// 게임 상태
// ===============================


const game={


    started:false,

    running:false,


    winner:null,


    lastTime:0


};





// ===============================
// 키 입력
// ===============================


const keys={};



window.addEventListener(
"keydown",
e=>{


    keys[e.code]=true;



    // 시작

    if(
        e.code==="Space"
        &&
        !game.started
    ){

        startGame();

    }




    // 재시작

    if(
        e.code==="KeyR"
        &&
        game.winner
    ){

        location.reload();

    }


});




window.addEventListener(
"keyup",
e=>{


    keys[e.code]=false;


});









// ===============================
// 플레이어
// ===============================



let player1;

let player2;



let sword1;

let sword2;



let items=[];








function createPlayers(){



player1=
new Player(

canvas.width*0.35,

canvas.height/2,

"#2563d8",


{

up:"KeyW",

down:"KeyS",

left:"KeyA",

right:"KeyD",

attack:"KeyQ"

}

);





player2=
new Player(

canvas.width*0.65,

canvas.height/2,

"#e53935",


{

up:"ArrowUp",

down:"ArrowDown",

left:"ArrowLeft",

right:"ArrowRight",

attack:"Numpad0"

}

);



sword1=
new Sword(player1);


sword2=
new Sword(player2);



}









function startGame(){


game.started=true;


game.running=true;


createPlayers();


items=[];


}









// ===============================
// 강공격 처리
// ===============================


function checkStrongAttack(player){



const now=
performance.now();



if(
player.lastAttackTime
&&
now-player.lastAttackTime<300
){

    player.strongAttack=true;

}
else{

    player.strongAttack=false;

}


player.lastAttackTime=now;



}









// ===============================
// 업데이트
// ===============================


function update(dt){



if(
!game.running
)
return;





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





sword1.update(dt);

sword2.update(dt);





sword1.attack(
player2
);


sword2.attack(
player1
);






updatePhysics(
player1,
player2,
dt
);





updateItems(
items,
player1,
player2,
dt
);



updateEffects(dt);







// 승리 체크



if(
player1.hp<=0
){

game.winner="RED";

game.running=false;

}




if(
player2.hp<=0
){

game.winner="BLUE";

game.running=false;

}



}










// ===============================
// 그리기
// ===============================


function render(){



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);





if(
!game.started
){


drawStartScreen(
ctx
);


return;

}






drawMap(
ctx,
canvas.width,
canvas.height
);





drawItems(
ctx,
items
);





player1.draw(ctx);

player2.draw(ctx);





sword1.draw(ctx);

sword2.draw(ctx);





drawEffects(ctx);



drawBattleUI(
ctx,
player1,
player2
);





if(
game.winner
){

drawWinScreen(
ctx,
game.winner
);

}



}










// ===============================
// 게임 루프
// ===============================



function loop(time){



let dt=
(time-game.lastTime)/1000;



game.lastTime=time;



if(
dt>0.05
)
dt=0.05;




update(dt);


render();



requestAnimationFrame(
loop
);


}




requestAnimationFrame(
loop
);
