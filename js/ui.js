// =================================
// Ancient Duel - UI System FINAL
// =================================



let messageTimer=0;




function showMessage(text){


const box=
document.getElementById(
"message"
);



if(!box)
return;



box.innerText=text;


box.classList.add(
"show"
);



clearTimeout(
box.hideTimer
);



box.hideTimer=
setTimeout(()=>{


box.classList.remove(
"show"
);


},1200);



}










// ===============================
// 시작 화면
// ===============================


function drawStartScreen(ctx){



ctx.fillStyle=
"rgba(0,0,0,.7)";


ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);







ctx.textAlign="center";





ctx.fillStyle="#d6aa45";


ctx.font=
"70px serif";



ctx.fillText(

"ANCIENT DUEL",

canvas.width/2,

220

);







ctx.fillStyle="#fff";


ctx.font=
"28px sans-serif";



ctx.fillText(

"고대 사막 결투",

canvas.width/2,

280

);








ctx.font=
"22px sans-serif";



ctx.fillText(

"BLUE : WASD 이동 / Q 베기",

canvas.width/2,

390

);



ctx.fillText(

"RED : 방향키 이동 / 숫자패드 0 베기",

canvas.width/2,

430

);






ctx.fillStyle="#ffd43b";


ctx.font=
"35px sans-serif";



ctx.fillText(

"SPACE START",

canvas.width/2,

540

);



}









// ===============================
// HP BAR
// ===============================


function drawHPBar(
ctx,
player
){



const width=100;

const height=12;



let percent=
player.hp/7;





let x=
player.x-width/2;


let y=
player.y-90;







ctx.fillStyle=
"rgba(0,0,0,.5)";



ctx.fillRect(
x,
y,
width,
height
);







ctx.fillStyle=
player.color;



ctx.fillRect(
x,
y,
width*percent,
height
);







ctx.strokeStyle="#fff";


ctx.lineWidth=2;



ctx.strokeRect(
x,
y,
width,
height
);



}









// ===============================
// 쿨타임 원
// ===============================


function drawCooldownUI(
ctx,
player,
x,
y,
color
){



let max=0.8;



let value=
player.attackCooldown/max;



if(value<0)
value=0;



if(value>1)
value=1;





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
30,
0,
Math.PI*2
);



ctx.stroke();







ctx.strokeStyle=color;



ctx.beginPath();


ctx.arc(

0,

0,

30,

-Math.PI/2,

-Math.PI/2+
Math.PI*2*(1-value)

);



ctx.stroke();








ctx.fillStyle="#fff";


ctx.textAlign="center";


ctx.textBaseline="middle";


ctx.font="18px Arial";





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



drawHPBar(
ctx,
p1
);


drawHPBar(
ctx,
p2
);






drawCooldownUI(

ctx,

p1,

80,

canvas.height-80,

"#4b8cff"

);





drawCooldownUI(

ctx,

p2,

canvas.width-80,

canvas.height-80,

"#ff5965"

);





}









// ===============================
// 승리 화면
// ===============================


function drawWinScreen(
ctx,
winner
){



ctx.fillStyle=
"rgba(0,0,0,.65)";



ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);







ctx.textAlign="center";



ctx.fillStyle="#ffd43b";


ctx.font=
"70px serif";



ctx.fillText(

winner+" WIN",

canvas.width/2,

canvas.height/2

);







ctx.fillStyle="#fff";


ctx.font=
"28px sans-serif";



ctx.fillText(

"R 키를 눌러 재시작",

canvas.width/2,

canvas.height/2+70

);



}
