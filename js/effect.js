// =================================
// Ancient Duel - Effect System FINAL
// =================================


const effects=[];







// =============================
// 베기 효과
// =============================


function createSlashEffect(
x,
y,
angle
){



effects.push({


type:"slash",


x:x,

y:y,


angle:angle,


life:0.25,


maxLife:0.25,


size:70



});



}








// =============================
// 피격 효과
// =============================


function createHitEffect(
x,
y
){



effects.push({


type:"hit",


x:x,


y:y,


life:0.2,


maxLife:0.2,


size:10



});



}









// =============================
// 업데이트
// =============================


function updateEffects(dt){



for(
let e of effects
){



e.life-=dt;



if(
e.type==="slash"
){


e.size+=
180*dt;


}





if(
e.type==="hit"
){


e.size+=
120*dt;


}



}







for(
let i=effects.length-1;
i>=0;
i--
){



if(
effects[i].life<=0
){


effects.splice(
i,
1
);


}



}



}









// =============================
// 그리기
// =============================


function drawEffects(ctx){



for(
let e of effects
){



ctx.save();



ctx.translate(
e.x,
e.y
);







let alpha=
e.life/e.maxLife;



ctx.globalAlpha=alpha;







// =================
// 검광
// =================



if(
e.type==="slash"
){



ctx.rotate(
e.angle
);




ctx.strokeStyle="#fff4a8";


ctx.lineWidth=12;



ctx.beginPath();



ctx.arc(

30,

0,

e.size,

-0.8,

0.8

);



ctx.stroke();






ctx.strokeStyle="#ffd43b";


ctx.lineWidth=5;



ctx.beginPath();


ctx.arc(

30,

0,

e.size-5,

-0.8,

0.8

);



ctx.stroke();





}








// =================
// 피격
// =================


if(
e.type==="hit"
){



ctx.fillStyle="#fff";


ctx.beginPath();


ctx.arc(
0,
0,
e.size,
0,
Math.PI*2
);



ctx.fill();






// 파편


ctx.strokeStyle="#ff5555";


ctx.lineWidth=3;



for(
let i=0;i<6;i++
){



let a=
Math.PI*2*i/6;



ctx.beginPath();


ctx.moveTo(
0,
0
);



ctx.lineTo(

Math.cos(a)*e.size*2,

Math.sin(a)*e.size*2

);



ctx.stroke();



}



}




ctx.restore();



}



}
