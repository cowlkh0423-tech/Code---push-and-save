// =================================
// Ancient Duel - Physics System
// =================================



const physics = {

    friction: 0.88,

    arenaX: 120,

    arenaY: 100,

    edgeDamage:false

};





// =================================
// 넉백 적용
// =================================


function applyKnockback(player){


    player.x += player.knockbackX * 0.016;

    player.y += player.knockbackY * 0.016;



    player.knockbackX *= physics.friction;

    player.knockbackY *= physics.friction;



    if(
        Math.abs(player.knockbackX)<1
        &&
        Math.abs(player.knockbackY)<1
    ){

        player.knockbackX=0;
        player.knockbackY=0;

    }


}







// =================================
// 플레이어 충돌 + 물리
// =================================


function updatePhysics(
    p1,
    p2,
    dt
){



    applyKnockback(p1);

    applyKnockback(p2);




    // 플레이어끼리 밀림


    let dx =
    p2.x-p1.x;


    let dy =
    p2.y-p1.y;


    let distance =
    Math.hypot(
        dx,
        dy
    );



    if(distance<55){


        let push =
        (55-distance)/2;



        let nx=
        dx/distance;


        let ny=
        dy/distance;



        p1.x-=nx*push;

        p1.y-=ny*push;


        p2.x+=nx*push;

        p2.y+=ny*push;


    }







    // 경기장 밖 처리


    checkFall(p1);

    checkFall(p2);



}








// =================================
// 절벽 판정
// =================================


function checkFall(player){



    let cx =
    window.innerWidth/2;


    let cy =
    window.innerHeight/2;



    let dx =
    player.x-cx;


    let dy =
    player.y-cy;



    let distance =
    Math.sqrt(
        dx*dx+
        dy*dy
    );



    // 경기장 바깥


    if(
        distance>430
    ){


        player.hp=0;


        player.x=cx;

        player.y=cy;



    }



}






// =================================
// 데미지 처리
// =================================


function damagePlayer(
    target,
    damage,
    angle,
    power
){



    if(target.invincible>0)
        return;



    target.hp-=damage;



    target.knockbackX =
    Math.cos(angle)
    *
    power;



    target.knockbackY =
    Math.sin(angle)
    *
    power;



    if(target.hp<=0){

        gameOver(target);

    }


}







function gameOver(loser){



    game.running=false;



    document.getElementById("message")
    .innerText =
    loser.color==="#
2463d4"
    ?
    "RED WIN!"
    :
    "BLUE WIN!";



}
