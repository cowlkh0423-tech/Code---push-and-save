// =================================
// Ancient Duel - Player FINAL
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

this.speed=230;





// 방향

this.angle=0;





// 체력

this.hp=7;





// 공격

this.attackTimer=0;

this.attackCooldown=0;


this.lastAttackTime=0;


this.strongAttack=false;



// 아이템 효과

this.damageBoost=false;

this.invincible=0;





// 물리

this.knockbackX=0;

this.knockbackY=0;





// 애니메이션


this.walkTime=0;

this.cloakWave=0;

this.bodyBob=0;

this.moving=false;



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




this.walkTime+=
dt*14;



this.moving=true;



}

else{


this.walkTime*=0.85;


this.moving=false;


}







this.bodyBob =
Math.sin(
this.walkTime
)
*
(this.moving?3:1);





this.cloakWave +=
dt*
(this.moving?8:2);








// 상대 바라보기


this.angle=
Math.atan2(
enemy.y-this.y,
enemy.x-this.x
);









// 공격 쿨타임


if(
this.attackCooldown>0
)
this.attackCooldown-=dt;




if(
this.attackTimer>0
)
this.attackTimer-=dt;









// 공격 입력


if(
keys[this.control.attack]
&&
this.attackCooldown<=0
){



let now=
performance.now();




if(
now-this.lastAttackTime
<
300
){


this.strongAttack=true;


}
else{


this.strongAttack=false;


}




this.lastAttackTime=now;




this.attackTimer=.35;



this.attackCooldown=
this.strongAttack
?
1.5
:
0.8;




}








if(this.invincible>0)

this.invincible-=dt;




}









draw(ctx){



ctx.save();





ctx.translate(
this.x,
this.y+this.bodyBob
);







// 그림자


ctx.fillStyle=
"rgba(0,0,0,.35)";


ctx.beginPath();


ctx.ellipse(
0,
45,
32,
12,
0,
0,
Math.PI*2
);


ctx.fill();









// 다리


let step=
Math.sin(
this.walkTime
)
*
6;



ctx.strokeStyle="#151515";

ctx.lineWidth=9;


ctx.lineCap="round";



ctx.beginPath();


ctx.moveTo(
-9,
20
);


ctx.lineTo(
-13,
42+step
);



ctx.moveTo(
9,
20
);


ctx.lineTo(
13,
42-step
);


ctx.stroke();









// 망토


let wave=
Math.sin(
this.cloakWave
)
*
8;



ctx.fillStyle=this.color;


ctx.beginPath();


ctx.moveTo(
0,
-18
);



ctx.quadraticCurveTo(
-40-wave,
20,
-35+wave,
60
);



ctx.quadraticCurveTo(
0,
75,
35-wave,
60
);



ctx.quadraticCurveTo(
40+wave,
20,
0,
-18
);



ctx.fill();









// 몸통 갑옷


ctx.fillStyle="#242424";


ctx.beginPath();


ctx.roundRect(
-18,
-22,
36,
45,
10
);


ctx.fill();









// 어깨


ctx.fillStyle="#9c7a3d";


ctx.beginPath();


ctx.arc(
-18,
-13,
8,
0,
Math.PI*2
);


ctx.arc(
18,
-13,
8,
0,
Math.PI*2
);


ctx.fill();









// 머리


ctx.fillStyle="#d99b76";


ctx.beginPath();


ctx.arc(
0,
-40,
15,
0,
Math.PI*2
);


ctx.fill();






// 머리카락


ctx.fillStyle="#111";


ctx.beginPath();


ctx.arc(
0,
-46,
16,
Math.PI,
Math.PI*2
);


ctx.fill();








// 팔


ctx.save();


ctx.rotate(
this.angle
);



ctx.strokeStyle="#d99b76";


ctx.lineWidth=8;


ctx.beginPath();


ctx.moveTo(
10,
-10
);


ctx.lineTo(
32,
0
);


ctx.stroke();



ctx.restore();








// 무적 효과


if(
this.invincible>0
){


ctx.strokeStyle="#4dcfff";


ctx.lineWidth=4;


ctx.beginPath();


ctx.arc(
0,
0,
60,
0,
Math.PI*2
);


ctx.stroke();


}







ctx.restore();



}


}
