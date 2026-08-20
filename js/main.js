// =================================
// Ancient Duel - Main Controller
// =================================


// Canvas

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");



let WIDTH;
let HEIGHT;



function resize(){

    WIDTH =
    canvas.width =
    window.innerWidth;


    HEIGHT =
    canvas.height =
    window.innerHeight;

}


window.addEventListener(
    "resize",
    resize
);


resize();




// =================================
// Input
// =================================


const keys={};


window.addEventListener(
"keydown",
(e)=>{

    keys[e.code]=true;

});


window.addEventListener(
"keyup",
(e)=>{

    keys[e.code]=false;

});






// =================================
// Players
// =================================


const player1 =
new Player(
    350,
    HEIGHT/2,
    "#2463d4",
    {
        up:"KeyW",
        down:"KeyS",
        left:"KeyA",
        right:"KeyD",
        attack:"KeyQ"
    }
);



const player2 =
new Player(
    WIDTH-350,
    HEIGHT/2,
    "#d94252",
    {
        up:"ArrowUp",
        down:"ArrowDown",
        left:"ArrowLeft",
        right:"ArrowRight",
        attack:"Numpad0"
    }
);





// =================================
// Weapons
// =================================


const sword1 =
new Sword(player1);



const sword2 =
new Sword(player2);






// =================================
// Items
// =================================


const items=[];







// =================================
// Game State
// =================================


const game={

    lastTime:0,

    running:true

};






// =================================
// Update
// =================================


function update(dt){



    player1.update(
        player2,
        dt,
        keys
    );



    player2.update(
        player1,
        dt,
        keys
    );



    sword1.update(dt);

    sword2.update(dt);




    sword1.attack(
        player2
    );


    sword2.attack(
        player1
    );





    updatePhysics(
        player1,
        player2,
        dt
    );



    updateItems(
        items,
        player1,
        player2,
        dt
    );



}








// =================================
// Render
// =================================


function render(){



    ctx.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );



    // 맵

    drawMap(
        ctx,
        WIDTH,
        HEIGHT
    );



    // 아이템

    drawItems(
        ctx,
        items
    );



    // 캐릭터

    player1.draw(ctx);

    player2.draw(ctx);



    // 검 효과

    sword1.draw(ctx);

    sword2.draw(ctx);



    updateUI();


}







// =================================
// UI
// =================================


function updateUI(){


    document.getElementById("p1").innerText =
    "BLUE : "
    +
    player1.hp
    +
    " HP";



    document.getElementById("p2").innerText =
    "RED : "
    +
    player2.hp
    +
    " HP";


}








// =================================
// Game Loop
// =================================


function loop(time){



    let dt =
    (time-game.lastTime)/1000;



    game.lastTime=time;



    if(dt>0.1)
        dt=0.1;




    if(game.running){


        update(dt);


        render();


    }



    requestAnimationFrame(loop);


}




requestAnimationFrame(loop);
