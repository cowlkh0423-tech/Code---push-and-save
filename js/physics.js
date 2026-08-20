// =================================
// Ancient Duel - Physics System V2
// =================================


// 경기장 크기

const arenaPhysics = {

    centerX: null,
    centerY: null,

    width: 390,
    height: 230

};




// =================================
// 초기화
// =================================

function updateArenaSize(){

    arenaPhysics.centerX =
    window.innerWidth / 2;


    arenaPhysics.centerY =
    window.innerHeight / 2;

}





window.addEventListener(
"resize",
updateArenaSize
);


updateArenaSize();






// =================================
// 넉백 적용
// =================================


function applyKnockback(player,dt){



    player.x +=
    player.knockbackX * dt;


    player.y +=
    player.knockbackY * dt;




    // 마찰

    player.knockbackX *= 0.86;

    player.knockbackY *= 0.86;



    if(
        Math.abs(player.knockbackX)<5
    ){

        player.knockbackX=0;

    }


    if(
        Math.abs(player.knockbackY)<5
    ){

        player.knockbackY=0;

    }



}







// =================================
// 플레이어 충돌
// =================================


function playerCollision(
    p1,
    p2
){


    let dx =
    p2.x-p1.x;


    let dy =
    p2.y-p1.y;


    let dist =
    Math.hypot(dx,dy);



    const minDist=55;



    if(
        dist < minDist &&
        dist>0
    ){


        let push =
        (minDist-dist)/2;



        let nx =
        dx/dist;


        let ny =
        dy/dist;



        p1.x -= nx*push;

        p1.y -= ny*push;



        p2.x += nx*push;

        p2.y += ny*push;


    }



}








// =================================
// 경기장 제한
// =================================


function checkArena(player){



    let dx =
    player.x-
    arenaPhysics.centerX;



    let dy =
    player.y-
    arenaPhysics.centerY;




    let value =
    (
    dx*dx
    /
    (arenaPhysics.width*
     arenaPhysics.width)
    )
    +
    (
    dy*dy
    /
    (arenaPhysics.height*
     arenaPhysics.height)
    );





    // 경기장 밖


    if(value>1){



        player.hp=0;


        game.running=false;



        showMessage(
            player.color === "#2563d8"
            ?
            "RED WIN!"
            :
            "BLUE WIN!"
        );


    }



}








// =================================
// 전체 물리 업데이트
// =================================


function updatePhysics(
    p1,
    p2,
    dt
){



    applyKnockback(
        p1,
        dt
    );


    applyKnockback(
        p2,
        dt
    );



    playerCollision(
        p1,
        p2
    );



    checkArena(
        p1
    );


    checkArena(
        p2
    );



}







// =================================
// 공격으로 받는 넉백
// =================================


function hitKnockback(
    target,
    angle,
    power
){



    target.knockbackX =
    Math.cos(angle)
    *
    power;



    target.knockbackY =
    Math.sin(angle)
    *
    power;



}
