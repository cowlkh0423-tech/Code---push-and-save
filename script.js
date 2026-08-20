const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/* =========================
        게임 변수
========================= */

let running = false;
let winner = null;

const keys = {};

let items = [];

let messageTimer = 0;



/* =========================
        키 입력
========================= */

window.addEventListener("keydown", e=>{

    keys[e.key.toLowerCase()] = true;


    if(!running) return;


    if(e.key.toLowerCase()==="q")
        player1.attack();


    if(e.key==="0")
        player2.attack();

});


window.addEventListener("keyup",e=>{

    keys[e.key.toLowerCase()] = false;

});



/* =========================
        플레이어
========================= */


class Player{


    constructor(x,y,color,name,control){

        this.x=x;
        this.y=y;

        this.color=color;

        this.name=name;


        this.hp=5;


        this.speed=5;


        this.control=control;


        this.size=35;


        this.dir=
        color==="red"
        ?1:-1;



        this.attackCooldown=0;

        this.attackAnimation=0;


        this.invincible=0;


        this.golden=false;



        this.knock=0;


    }



    update(){


        if(this.attackCooldown>0)
            this.attackCooldown--;


        if(this.attackAnimation>0)
            this.attackAnimation--;



        if(this.invincible>0)
            this.invincible--;



        this.move();



        if(this.knock!==0){

            this.x+=this.knock;

            this.knock*=0.85;


            if(Math.abs(this.knock)<0.2)
                this.knock=0;

        }


    }



    move(){


        let dx=0;
        let dy=0;


        if(keys[this.control.left])
            dx--;

        if(keys[this.control.right])
            dx++;

        if(keys[this.control.up])
            dy--;

        if(keys[this.control.down])
            dy++;



        this.x+=dx*this.speed;

        this.y+=dy*this.speed;



        if(dx!==0)
            this.dir=dx>0?1:-1;



        this.x=Math.max(
            40,
            Math.min(canvas.width-40,this.x)
        );


        this.y=Math.max(
            120,
            Math.min(canvas.height-40,this.y)
        );

    }



    attack(){


        if(this.attackCooldown>0)
            return;


        this.attackCooldown=36; // 0.6초


        this.attackAnimation=15;


        hitCheck(this);


    }




    draw(){


        ctx.save();


        ctx.translate(this.x,this.y);



        // 그림자

        ctx.fillStyle="rgba(0,0,0,.5)";

        ctx.beginPath();

        ctx.ellipse(
            0,
            45,
            35,
            10,
            0,
            0,
            Math.PI*2
        );

        ctx.fill();



        // 몸


        ctx.fillStyle=this.color;


        ctx.beginPath();

        ctx.arc(
            0,
            0,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();



        // 머리


        ctx.fillStyle="#f0c9a0";

        ctx.beginPath();

        ctx.arc(
            0,
            -45,
            16,
            0,
            Math.PI*2
        );

        ctx.fill();




        // 검


        ctx.save();


        if(this.attackAnimation){

            ctx.rotate(
                this.dir*0.8
            );

        }



        ctx.fillStyle=
        this.golden
        ?"gold"
        :"#ddd";



        ctx.fillRect(
            this.dir*20,
            -70,
            8,
            100
        );


        ctx.restore();



        // 무적 효과


        if(this.invincible){


            ctx.strokeStyle="#33ccff";

            ctx.lineWidth=5;


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





const player1=new Player(
    200,
    canvas.height/2,
    "crimson",
    "적운",
    {
        up:"w",
        down:"s",
        left:"a",
        right:"d"
    }
);



const player2=new Player(
    canvas.width-200,
    canvas.height/2,
    "royalblue",
    "청월",
    {
        up:"arrowup",
        down:"arrowdown",
        left:"arrowleft",
        right:"arrowright"
    }
);





/* =========================
        공격 판정
========================= */


function hitCheck(attacker){


    let enemy=
    attacker===player1
    ?player2
    :player1;



    let distance=Math.abs(
        attacker.x-enemy.x
    );



    if(distance<120){


        if(enemy.invincible>0)
            return;



        let damage=1;

        let push=30;



        if(attacker.golden){


            damage=2;

            push=60;


            attacker.golden=false;


        }



        enemy.hp-=damage;


        enemy.knock=
        attacker.dir*push;


        updateHP();



        if(enemy.hp<=0)

            endGame(attacker);


    }


}





function updateHP(){


    document.getElementById("hp1")
    .style.width=
    (player1.hp/5*100)+"%";


    document.getElementById("hp2")
    .style.width=
    (player2.hp/5*100)+"%";


}
/* =========================
        아이템 시스템
========================= */


const itemTypes = [

    {
        type:"gold",
        title:"⚔ 황금검 등장!",
        text:
        "다음 공격 데미지 2배<br>넉백 효과 2배<br>1회 사용 후 소멸"
    },


    {
        type:"shield",
        title:"🛡 무적 기운 등장!",
        text:
        "3초 동안 모든 공격 무시"
    },


    {
        type:"heal",
        title:"💚 생명의 영약 등장!",
        text:
        "체력 2 회복"
    }

];



class Item{


    constructor(){

        let data=
        itemTypes[
            Math.floor(
                Math.random()*itemTypes.length
            )
        ];


        this.type=data.type;

        this.title=data.title;

        this.text=data.text;


        this.x=
        Math.random()*
        (canvas.width-200)+100;


        this.y=
        Math.random()*
        (canvas.height-250)+150;


        this.size=25;


        this.life=true;


    }



    draw(){


        if(!this.life)
            return;



        ctx.save();


        ctx.translate(
            this.x,
            this.y
        );


        if(this.type==="gold"){


            ctx.fillStyle="gold";


            ctx.fillRect(
                -8,
                -30,
                16,
                60
            );


        }


        else if(this.type==="shield"){


            ctx.fillStyle="#33ccff";


            ctx.beginPath();


            ctx.arc(
                0,
                0,
                25,
                0,
                Math.PI*2
            );


            ctx.fill();


        }


        else{


            ctx.fillStyle="#55ff55";


            ctx.fillRect(
                -15,
                -20,
                30,
                40
            );


        }



        ctx.restore();


    }


}





function spawnItem(){


    let item=new Item();


    items.push(item);


    showMessage(
        item.title,
        item.text
    );

}




function checkItem(player){


    items.forEach(item=>{


        if(!item.life)
            return;



        let d=Math.hypot(

            player.x-item.x,

            player.y-item.y

        );



        if(d<60){


            item.life=false;


            useItem(
                player,
                item.type
            );


        }


    });


}





function useItem(player,type){



    if(type==="gold"){


        player.golden=true;


        showMessage(

            "⚔ 황금검 획득!",

            "다음 공격 데미지 2배<br>넉백 효과 2배"

        );

    }



    if(type==="shield"){


        player.invincible=180;


        showMessage(

            "🛡 무적 발동!",

            "3초 동안 공격을 받지 않습니다"

        );


    }



    if(type==="heal"){


        player.hp+=2;


        if(player.hp>5)

            player.hp=5;



        updateHP();



        showMessage(

            "💚 체력 회복!",

            "체력 2 회복"

        );


    }



}






/* =========================
        메시지 UI
========================= */


function showMessage(title,text){


    const box=
    document.getElementById(
        "messageBox"
    );


    document.getElementById(
        "messageTitle"
    ).innerHTML=title;


    document.getElementById(
        "messageText"
    ).innerHTML=text;



    box.classList.add("show");



    clearTimeout(messageTimer);


    messageTimer=setTimeout(()=>{

        box.classList.remove("show");

    },2500);



}







/* =========================
        배경
========================= */


function drawBackground(){


    let gradient=
    ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );


    gradient.addColorStop(
        0,
        "#08120d"
    );


    gradient.addColorStop(
        1,
        "#020403"
    );


    ctx.fillStyle=gradient;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    // 달


    ctx.fillStyle=
    "rgba(255,240,180,.9)";


    ctx.beginPath();


    ctx.arc(
        canvas.width/2,
        120,
        70,
        0,
        Math.PI*2
    );


    ctx.fill();




    // 대나무


    for(let i=0;i<18;i++){


        let x=i*100;


        ctx.strokeStyle=
        "#123b25";


        ctx.lineWidth=15;


        ctx.beginPath();


        ctx.moveTo(
            x,
            canvas.height
        );


        ctx.lineTo(
            x+20,
            100
        );


        ctx.stroke();


    }



}






/* =========================
        게임 루프
========================= */


function gameLoop(){



    if(!running)

        return;



    drawBackground();



    player1.update();

    player2.update();



    items.forEach(i=>i.draw());



    player1.draw();

    player2.draw();



    checkItem(player1);

    checkItem(player2);



    requestAnimationFrame(
        gameLoop
    );


}





/* =========================
        시작 / 종료
========================= */


document
.getElementById("startButton")
.onclick=()=>{


    document
    .getElementById("startScreen")
    .style.display="none";


    running=true;


    setInterval(()=>{


        if(running)

            spawnItem();


    },10000);



    gameLoop();


};






function endGame(player){


    running=false;


    winner=player;



    document
    .getElementById(
        "winScreen"
    )
    .style.display="flex";



    document
    .getElementById(
        "winnerText"
    )
    .innerHTML=

    "🏆 "+player.name+
    " 승리!";


}




document
.getElementById("restartButton")
.onclick=()=>{


    location.reload();


};
