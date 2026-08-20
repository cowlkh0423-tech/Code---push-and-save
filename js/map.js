// =================================
// Ancient Duel - Ancient Desert Map
// =================================



const mapData = {


    centerX:0,

    centerY:0,


    arenaWidth:780,

    arenaHeight:460


};





function drawMap(
    ctx,
    width,
    height
){



    mapData.centerX =
    width/2;


    mapData.centerY =
    height/2;





    // ============================
    // 사막 배경
    // ============================


    ctx.fillStyle="#c79a52";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );





    // 모래 결

    ctx.globalAlpha=0.18;

    ctx.strokeStyle="#70451e";

    ctx.lineWidth=2;



    for(
        let i=0;
        i<35;
        i++
    ){


        ctx.beginPath();


        ctx.arc(
            (i*170)%width,
            80+(i%7)*130,
            80,
            0,
            Math.PI
        );


        ctx.stroke();


    }


    ctx.globalAlpha=1;







    // ============================
    // 절벽 그림자
    // ============================



    ctx.fillStyle="#4b3420";


    ctx.beginPath();


    ctx.ellipse(
        width/2,
        height/2,
        470,
        300,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();






    // ============================
    // 고대 석조 경기장
    // ============================



    ctx.fillStyle="#77634b";


    ctx.beginPath();


    ctx.ellipse(
        width/2,
        height/2,
        400,
        240,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();






    // 돌 타일


    ctx.strokeStyle="#9c8565";

    ctx.lineWidth=2;


    for(
        let x=-350;
        x<350;
        x+=50
    ){


        ctx.beginPath();


        ctx.moveTo(
            width/2+x,
            height/2-230
        );


        ctx.lineTo(
            width/2+x,
            height/2+230
        );


        ctx.stroke();


    }




    for(
        let y=-200;
        y<200;
        y+=45
    ){


        ctx.beginPath();


        ctx.moveTo(
            width/2-390,
            height/2+y
        );


        ctx.lineTo(
            width/2+390,
            height/2+y
        );


        ctx.stroke();


    }









    // ============================
    // 중앙 고대 문양
    // ============================



    ctx.strokeStyle="#c39a57";

    ctx.lineWidth=5;


    ctx.beginPath();


    ctx.arc(
        width/2,
        height/2,
        120,
        0,
        Math.PI*2
    );


    ctx.stroke();




    ctx.beginPath();


    ctx.arc(
        width/2,
        height/2,
        60,
        0,
        Math.PI*2
    );


    ctx.stroke();








    // ============================
    // 폐허 기둥
    // ============================



    drawPillar(
        ctx,
        120,
        150
    );


    drawPillar(
        ctx,
        width-150,
        170
    );


    drawPillar(
        ctx,
        170,
        height-120
    );


    drawPillar(
        ctx,
        width-200,
        height-140
    );




}







function drawPillar(
    ctx,
    x,
    y
){



    // 그림자


    ctx.fillStyle=
    "rgba(0,0,0,.25)";


    ctx.fillRect(
        x+10,
        y+15,
        45,
        100
    );



    // 기둥


    ctx.fillStyle="#806747";


    ctx.fillRect(
        x,
        y,
        45,
        100
    );



    // 윗돌


    ctx.fillStyle="#a58a60";


    ctx.fillRect(
        x-10,
        y-10,
        65,
        15
    );



}
