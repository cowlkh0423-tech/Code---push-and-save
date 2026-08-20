// =================================
// Ancient Duel - Player System
// =================================


class Player{


constructor(
    x,
    y,
    color,
    control
){

    this.x=x;
    this.y=y;


    this.color=color;


    this.control=control;



    // 이동
    this.speed=220;



    // 방향
    this.angle=0;



    // 애니메이션
    this.walkTime=0;



    // 공격
    this.attackCooldown=0;
    this.attackTimer=0;



    // 전투
    this.hp=7;

    this.knockbackX=0;
    this.knockbackY=0;



    // 아이템
    this.damageBoost=false;
    this.invincible=0;


}





update(enemy,dt,keys){



    let dx=0;
    let dy=0;



    if(keys[this.control.up])
        dy-=1;


    if(keys[this.control.down])
        dy+=1;


    if(keys[this.control.left])
        dx-=1;


    if(keys[this.control.right])
        dx+=1;




    if(dx!==0 || dy!==0){


        let length=
        Math.hypot(dx,dy);


        dx/=length;
        dy/=length;



        this.x += dx*this.speed*dt;

        this.y += dy*this.speed*dt;



        this.walkTime += dt*12;


    }




    else{

        this.walkTime=0;

    }






    // 상대 바라보기

    this.angle =
    Math.atan2(
        enemy.y-this.y,
        enemy.x-this.x
    );





    // 공격 쿨타임

    if(this.attackCooldown>0)
        this.attackCooldown-=dt;



    if(this.attackTimer>0)
        this.attackTimer-=dt;



    if(
        keys[this.control.attack]
        &&
        this.attackCooldown<=0
    ){

        this.attackTimer=0.28;

        this.attackCooldown=0.8;


        this.swing=true;


    }



    if(this.invincible>0)
        this.invincible-=dt;



}









draw(ctx){


ctx.save();


ctx.translate(
    this.x,
    this.y
);




// 캐릭터 그림자

ctx.fillStyle=
"rgba(0,0,0,0.35)";


ctx.beginPath();

ctx.ellipse(
    0,
    38,
    25,
    10,
    0,
    0,
    Math.PI*2
);


ctx.fill();







// 걷기 효과

let step =
Math.sin(this.walkTime)*6;






// =======================
// 다리
// =======================


ctx.strokeStyle="#191919";

ctx.lineWidth=8;

ctx.lineCap="round";



ctx.beginPath();


ctx.moveTo(
    -8,
    18
);

ctx.lineTo(
    -12,
    35+step
);



ctx.moveTo(
    8,
    18
);

ctx.lineTo(
    12,
    35-step
);



ctx.stroke();






// =======================
// 망토
// =======================


ctx.fillStyle=this.color;



ctx.beginPath();


ctx.moveTo(
    0,
    -18
);


ctx.quadraticCurveTo(
    -35,
    10,
    -28,
    42
);



ctx.quadraticCurveTo(
    0,
    58,
    28,
    42
);



ctx.quadraticCurveTo(
    35,
    10,
    0,
    -18
);



ctx.fill();








// =======================
// 몸통
// =======================


ctx.fillStyle="#252525";


ctx.beginPath();


ctx.roundRect(
    -14,
    -18,
    28,
    38,
    8
);


ctx.fill();






// =======================
// 머리
// =======================


ctx.fillStyle="#d59a75";


ctx.beginPath();


ctx.arc(
    0,
    -32,
    12,
    0,
    Math.PI*2
);


ctx.fill();







// =======================
// 팔 + 검
// =======================


ctx.save();


ctx.rotate(
    this.angle
);



let swing=0;


if(this.attackTimer>0){

    swing =
    Math.sin(
        (0.28-this.attackTimer)
        *
        Math.PI
    )
    *
    1.6;

}


ctx.rotate(
    swing
);




ctx.strokeStyle="#222";

ctx.lineWidth=7;


ctx.beginPath();

ctx.moveTo(
    8,
    -5
);


ctx.lineTo(
    25,
    0
);


ctx.stroke();






// 검 손잡이

ctx.fillStyle="#5b351d";

ctx.fillRect(
    20,
    -3,
    12,
    6
);





// 칼날

ctx.fillStyle="#ddd";


ctx.beginPath();


ctx.moveTo(
    30,
    -5
);


ctx.lineTo(
    85,
    -3
);


ctx.lineTo(
    95,
    0
);


ctx.lineTo(
    85,
    3
);


ctx.lineTo(
    30,
    5
);


ctx.closePath();


ctx.fill();




ctx.restore();






ctx.restore();



}



}
