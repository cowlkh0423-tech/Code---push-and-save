// =================================
// Ancient Duel - Combat UI
// =================================



function drawCooldownUI(
ctx,
player,
x,
y,
color
){



const maxCooldown=0.8;



let value =
player.attackCooldown /
maxCooldown;



if(value<0)
value=0;



// 외곽 원


ctx.save();



ctx.translate(
x,
y
);





ctx.strokeStyle=
"rgba(255,255,255,.25)";


ctx.lineWidth=8;



ctx.beginPath();


ctx.arc(
0,
0,
32,
0,
Math.PI*2
);


ctx.stroke();





// 남은 시간 표시


ctx.strokeStyle=color;


ctx.lineWidth=8;



ctx.beginPath();


ctx.arc(
0,
0,
32,

-Math.PI/2,

-Math.PI/2
+
Math.PI*2*(1-value),

false

);


ctx.stroke();







// 중앙 표시


ctx.fillStyle="#fff";


ctx.font="18px Arial";


ctx.textAlign="center";


ctx.textBaseline="middle";



if(value<=0){

    ctx.fillText(
        "⚔",
        0,
        0
    );

}
else{

    ctx.fillText(
        (value*0.8)
        .toFixed(1),
        0,
        0
    );

}



ctx.restore();



}









function drawBattleUI(
ctx,
p1,
p2
){



drawCooldownUI(
ctx,
p1,
80,
window.innerHeight-90,
"#4b8cff"
);



drawCooldownUI(
ctx,
p2,
window.innerWidth-80,
window.innerHeight-90,
"#ff5965"
);





// 무적 표시


if(p1.invincible>0){

ctx.fillStyle="#4dcfff";

ctx.font="18px sans-serif";

ctx.fillText(
"무적",
80,
window.innerHeight-140
);

}




if(p2.invincible>0){

ctx.fillStyle="#4dcfff";

ctx.font="18px sans-serif";

ctx.fillText(
"무적",
window.innerWidth-80,
window.innerHeight-140
);

}



}
