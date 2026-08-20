// =================================
// Ancient Duel - Ancient Desert Map FINAL
// =================================


function drawMap(
ctx,
W,
H
){



// ==========================
// 사막 배경
// ==========================


ctx.fillStyle="#c39a5b";


ctx.fillRect(
0,
0,
W,
H
);






// 모래 패턴


ctx.globalAlpha=.15;


ctx.strokeStyle="#604020";


ctx.lineWidth=3;



for(
let i=0;i<45;i++
){


let x=
(i*173)%W;


let y=
(i*97)%H;



ctx.beginPath();


ctx.arc(
x,
y,
40+(i%5)*15,
0,
Math.PI
);


ctx.stroke();


}



ctx.globalAlpha=1;







// ==========================
// 절벽 그림자
// ==========================



ctx.fillStyle="#553820";


ctx.beginPath();


ctx.ellipse(

W/2,

H/2+20,

470,

280,

0,

0,

Math.PI*2

);


ctx.fill();








// ==========================
// 경기장
// ==========================



ctx.fillStyle="#81705b";


ctx.beginPath();


ctx.ellipse(

W/2,

H/2,

410,

235,

0,

0,

Math.PI*2

);


ctx.fill();








// ==========================
// 돌 타일
// ==========================



ctx.save();


ctx.beginPath();


ctx.ellipse(

W/2,

H/2,

410,

235,

0,

0,

Math.PI*2

);


ctx.clip();




ctx.strokeStyle=
"rgba(40,30,20,.3)";


ctx.lineWidth=2;



for(
let x=-450;
x<450;
x+=55
){



ctx.beginPath();


ctx.moveTo(
W/2+x,
100
);


ctx.lineTo(
W/2+x,
H-100
);


ctx.stroke();



}





for(
let y=-250;
y<250;
y+=45
){



ctx.beginPath();


ctx.moveTo(
100,
H/2+y
);


ctx.lineTo(
W-100,
H/2+y
);


ctx.stroke();



}




ctx.restore();








// ==========================
// 중앙 문양
// ==========================



ctx.strokeStyle="#d2aa62";


ctx.lineWidth=6;



ctx.beginPath();


ctx.arc(

W/2,

H/2,

120,

0,

Math.PI*2

);


ctx.stroke();






ctx.beginPath();


ctx.arc(

W/2,

H/2,

45,

0,

Math.PI*2

);


ctx.stroke();








// ==========================
// 금 간 바닥
// ==========================



ctx.strokeStyle="#403326";


ctx.lineWidth=3;



for(
let i=0;i<10;i++
){



let angle=
Math.PI*2*i/10;



ctx.beginPath();


ctx.moveTo(
W/2,
H/2
);



ctx.lineTo(

W/2+
Math.cos(angle)*180,


H/2+
Math.sin(angle)*120

);



ctx.stroke();



}







// ==========================
// 폐허 기둥
// ==========================


drawColumn(
ctx,
150,
150
);


drawColumn(
ctx,
W-190,
160
);



drawColumn(
ctx,
180,
H-160
);



drawColumn(
ctx,
W-220,
H-150
);



}









function drawColumn(
ctx,
x,
y
){



// 그림자


ctx.fillStyle=
"rgba(0,0,0,.3)";



ctx.beginPath();


ctx.ellipse(
x+15,
y+55,
35,
12,
0,
0,
Math.PI*2
);


ctx.fill();







// 기둥 몸체


ctx.fillStyle="#67513a";


ctx.fillRect(
x,
y,
35,
90
);







// 밝은 면


ctx.fillStyle="#a88b60";


ctx.fillRect(
x,
y,
10,
90
);







// 깨진 윗부분


ctx.beginPath();


ctx.moveTo(
x-8,
y
);


ctx.lineTo(
x+45,
y
);


ctx.lineTo(
x+35,
y-15
);


ctx.closePath();


ctx.fill();



}
