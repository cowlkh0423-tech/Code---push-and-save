// =================================
// Ancient Duel - Physics FINAL
// =================================


const arena = {


    width:820,

    height:470


};






function applyKnockback(
player,
dt
){



player.x +=
player.knockbackX*dt;



player.y +=
player.knockbackY*dt;





// 마찰


player.knockbackX*=0.86;

player.knockbackY*=0.86;





if(
Math.abs(player.knockbackX)<5
)
player.knockbackX=0;



if(
Math.abs(player.knockbackY)<5
)
player.knockbackY=0;



}










function playerCollision(
p1,
p2
){



let dx=
p2.x-p1.x;


let dy=
p2.y-p1.y;



let distance=
Math.hypot(dx,dy);





let minDistance=55;



if(
distance<minDistance
&&
distance>0
){



let push=
(minDistance-distance)/2;



let nx=
dx/distance;


let ny=
dy/distance;





p1.x-=nx*push;

p1.y-=ny*push;



p2.x+=nx*push;

p2.y+=ny*push;



}



}









function checkArena(
player
){



let cx=
canvas.width/2;


let cy=
canvas.height/2;





let dx=
player.x-cx;


let dy=
player.y-cy;





let value=
(
dx*dx
/
(arena.width*arena.width)
)
+
(
dy*dy
/
(arena.height*arena.height)
);






if(
value>1
){



player.hp=0;


game.running=false;



game.winner=
player===player1
?
"RED"
:
"BLUE";



}



}









function updatePhysics(
p1,
p2,
dt
){



applyKnockback(
p1,
dt
);



applyKnockback(
p2,
dt
);





playerCollision(
p1,
p2
);





checkArena(
p1
);



checkArena(
p2
);



}









function hitKnockback(
target,
angle,
power
){



target.knockbackX=
Math.cos(angle)
*
power;



target.knockbackY=
Math.sin(angle)
*
power;



}
