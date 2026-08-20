// =================================
// Ancient Duel - Player System V2
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


    this.speed=230;


    this.angle=0;


    this.walkTime=0;


    // 공격

    this.attackTimer=0;

    this.attackCooldown=0;


    // 체력

    this.hp=7;



    // 물리

    this.knockbackX=0;

    this.knockbackY=0;



    // 아이템

    this.damageBoost=false;

    this.invincible=0;



    // 애니메이션

    this.pose=0;

}








update(enemy,dt,keys){



    let dx=0;

    let dy=0;



    if(keys[this.control.up])
        dy--;

    if(keys[this.control.down])
        dy++;

    if(keys[this.control.left])
        dx--;

    if(keys[this.control.right])
        dx++;




    if(dx||dy){


        let len=
        Math.hypot(dx,dy);


        dx/=len;

        dy/=len;



        this.x +=
        dx*this.speed*dt;


        this.y +=
        dy*this.speed*dt;



        this.walkTime+=dt*12;



    }
    else{

        this.walkTime*=0.8;

    }






    // 상대 방향

    this.angle =
    Math.atan2(
        enemy.y-this.y,
        enemy.x-this.x
    );





    // 쿨타임

    if(this.attackCooldown>0)
        this.attackCooldown-=dt;



    if(this.attackTimer>0)
        this.attackTimer-=dt;



    if(
        keys[this.control.attack]
        &&
        this.attackCooldown<=0
    ){


        this.attackTimer=.35;

        this.attackCooldown=.8;


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






// =======================
// 그림자
// =======================


ctx.fillStyle=
"rgba(0,0,0,.35)";


ctx.beginPath();


ctx.ellipse(
    0,
    42,
    30,
    12,
    0,
    0,
    Math.PI*2
);


ctx.fill();







// =======================
// 다리
// =======================



let step =
Math.sin(this.walkTime)
*
7;



ctx.strokeStyle="#171717";

ctx.lineWidth=9;

ctx.lineCap="round";


ctx.beginPath();


ctx.moveTo(
    -9,
    20
);


ctx.lineTo(
    -13,
    40+step
);



ctx.moveTo(
    9,
    20
);


ctx.lineTo(
    13,
    40-step
);



ctx.stroke();







// =======================
// 망토
// =======================


ctx.fillStyle=this.color;



let wave =
Math.sin(
    this.walkTime*.5
)
*
3;



ctx.beginPath();


ctx.moveTo(
    0,
    -15
);



ctx.quadraticCurveTo(
    -38,
    10,
    -30+wave,
    45
);



ctx.quadraticCurveTo(
    0,
    65,
    30-wave,
    45
);



ctx.quadraticCurveTo(
    38,
    10,
    0,
    -15
);



ctx.fill();







// =======================
// 몸통
// =======================


ctx.fillStyle="#202020";


ctx.beginPath();


ctx.roundRect(
    -15,
    -20,
    30,
    42,
    10
);


ctx.fill();








// =======================
// 어깨
// =======================


ctx.fillStyle="#333";


ctx.beginPath();


ctx.arc(
    0,
    -12,
    20,
    0,
    Math.PI*2
);


ctx.fill();







// =======================
// 머리
// =======================


ctx.fillStyle="#d79b75";


ctx.beginPath();


ctx.arc(
    0,
    -38,
    14,
    0,
    Math.PI*2
);


ctx.fill();






// 머리카락


ctx.fillStyle="#171717";


ctx.beginPath();


ctx.arc(
    0,
    -44,
    14,
    Math.PI,
    Math.PI*2
);


ctx.fill();







// =======================
// 팔
// =======================



let attackPose =
this.attackTimer>0
?
-0.5
:
0;



ctx.save();


ctx.rotate(
    attackPose
);



ctx.strokeStyle="#d79b75";

ctx.lineWidth=7;


ctx.beginPath();


ctx.moveTo(
    8,
    -12
);


ctx.lineTo(
    28,
    -5
);


ctx.stroke();



ctx.restore();







// 무적 효과

if(this.invincible>0){


    ctx.strokeStyle="#4dcfff";

    ctx.lineWidth=4;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        55,
        0,
        Math.PI*2
    );


    ctx.stroke();


}






ctx.restore();


}



}
