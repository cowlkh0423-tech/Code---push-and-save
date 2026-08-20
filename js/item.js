// =================================
// Ancient Duel - Item System FINAL
// =================================


const itemTypes={


heal:{

name:"회복약",

color:"#35d96b"


},


goldenSword:{

name:"황금검",

color:"#ffd43b"


},


shield:{

name:"무적 수정",

color:"#4db8ff"


}



};







let itemTimer=0;


let spawnedCount=0;







function createItem(){



if(
spawnedCount>=2
)
return;





let types=
[
"heal",
"goldenSword",
"shield"
];



let type=
types[
Math.floor(
Math.random()*types.length
)
];





items.push({


x:
canvas.width/2+
(Math.random()*400-200),


y:
canvas.height/2+
(Math.random()*220-110),


type:type,


active:true



});




spawnedCount++;




}









function updateItems(
items,
p1,
p2,
dt
){



itemTimer+=dt;



// 일정 시간마다 생성


if(
itemTimer>12
){


createItem();


itemTimer=0;


}







for(
let item of items
){



if(!item.active)
continue;






checkGetItem(
item,
p1
);



checkGetItem(
item,
p2
);



}



}










function checkGetItem(
item,
player
){



let dx=
player.x-item.x;


let dy=
player.y-item.y;



let dist=
Math.hypot(
dx,
dy
);





if(
dist<45
){



useItem(
item,
player
);



item.active=false;



}



}









function useItem(
item,
player
){



if(
item.type==="heal"
){



player.hp+=2;



if(
player.hp>7
)
player.hp=7;



}




if(
item.type==="goldenSword"
){


player.damageBoost=true;


}





if(
item.type==="shield"
){



player.invincible=2;



}



showMessage(
itemTypes[item.type].name
);



}









function drawItems(
ctx,
items
){



for(
let item of items
){



if(
!item.active
)
continue;



ctx.save();



ctx.translate(
item.x,
item.y
);





// 빛


ctx.globalAlpha=.25;


ctx.fillStyle=
itemTypes[item.type].color;


ctx.beginPath();


ctx.arc(
0,
0,
35,
0,
Math.PI*2
);


ctx.fill();



ctx.globalAlpha=1;







// ===================
// 회복약
// ===================


if(
item.type==="heal"
){


ctx.fillStyle="#fff";


ctx.fillRect(
-10,
-10,
20,
30
);



ctx.fillStyle="#35d96b";


ctx.fillRect(
-8,
0,
16,
15
);




ctx.fillStyle="#ddd";


ctx.fillRect(
-5,
-18,
10,
8
);



}









// ===================
// 황금검
// ===================



if(
item.type==="goldenSword"
){



ctx.rotate(-.5);



ctx.fillStyle="#6b3b18";


ctx.fillRect(
-4,
0,
8,
20
);





ctx.fillStyle="#ffd43b";


ctx.beginPath();


ctx.moveTo(
0,
0
);


ctx.lineTo(
-8,
-45
);


ctx.lineTo(
8,
-45
);


ctx.closePath();


ctx.fill();



}









// ===================
// 무적 수정
// ===================



if(
item.type==="shield"
){



ctx.fillStyle="#4db8ff";


ctx.beginPath();


ctx.moveTo(
0,
-25
);


ctx.lineTo(
22,
0
);


ctx.lineTo(
0,
25
);


ctx.lineTo(
-22,
0
);


ctx.closePath();


ctx.fill();



ctx.strokeStyle="#fff";


ctx.lineWidth=3;


ctx.stroke();



}





ctx.restore();



}



}
