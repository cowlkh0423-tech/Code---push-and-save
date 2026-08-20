// =================================
// Ancient Duel - Weapon FINAL
// =================================


class Sword{


constructor(owner){


this.owner=owner;


this.hit=false;


this.trail=[];


this.length=85;


}








update(dt){



if(
this.owner.attackTimer>0
){


this.createTrail();


}
else{


this.trail=[];


}



}









attack(target){



if(
this.owner.attackTimer<=0
||
this.hit
)
return;





let dx=
target.x-this.owner.x;


let dy=
target.y-this.owner.y;



let distance=
Math.hypot(dx,dy);





// 공격 거리

if(
distance>130
)
return;






let targetAngle=
Math.atan2(
dy,
dx
);




let diff=
Math.atan2(
Math.sin(
targetAngle-this.owner.angle
),
Math.cos(
targetAngle-this.owner.angle
)
);






// 베기 각도

if(
Math.abs(diff)
<
0.85
)
{



let damage=1;


let power=520;





// 강공격

if(
this.owner.strongAttack
){


damage*=2;


power*=1.5;


}






// 황금검

if(
this.owner.damageBoost
){


damage*=2;


this.owner.damageBoost=false;


}






if(
target.invincible<=0
){



target.hp-=damage;



hitKnockback(
target,
this.owner.angle,
power
);



createHitEffect(
target.x,
target.y
);



createSlashEffect(
this.owner.x,
this.owner.y,
this.owner.angle
);



}



this.hit=true;



}




}









reset(){


this.hit=false;


}









createTrail(){



this.trail.push({

x:this.owner.x,

y:this.owner.y,

angle:this.owner.angle,

life:0.2

});





for(
let t of this.trail
){

t.life-=0.03;


}



this.trail=
this.trail.filter(
t=>t.life>0
);



}









draw(ctx){



ctx.save();



ctx.translate(
this.owner.x,
this.owner.y
);





ctx.rotate(
this.owner.angle
);







let swing=0;



if(
this.owner.attackTimer>0
){


swing=
Math.sin(
(0.35-this.owner.attackTimer)
/
0.35
*
Math.PI
)
*
1.2;



}



ctx.rotate(swing);









// 손잡이


ctx.fillStyle="#553014";


ctx.fillRect(
22,
-4,
18,
8
);









// 가드


ctx.strokeStyle="#d6aa45";


ctx.lineWidth=5;


ctx.beginPath();


ctx.moveTo(
38,
-12
);


ctx.lineTo(
38,
12
);


ctx.stroke();









// 칼날


ctx.fillStyle="#e8e8e8";



ctx.beginPath();


ctx.moveTo(
40,
-5
);


ctx.lineTo(
120,
0
);


ctx.lineTo(
40,
5
);


ctx.closePath();


ctx.fill();









// 검 반사


ctx.strokeStyle="#fff";


ctx.lineWidth=2;


ctx.beginPath();


ctx.moveTo(
50,
-2
);


ctx.lineTo(
105,
-2
);


ctx.stroke();









// 잔상


for(
let t of this.trail
){



ctx.globalAlpha=
t.life/0.2;



ctx.strokeStyle="#ffe58a";


ctx.lineWidth=7;


ctx.beginPath();


ctx.arc(
35,
0,
70,
-0.8,
0.8
);


ctx.stroke();



}




ctx.globalAlpha=1;


ctx.restore();


}



}
