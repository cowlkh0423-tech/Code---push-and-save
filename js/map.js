// =================================
// Ancient Duel - Ancient Desert Map V2
// =================================


const mapData={


    centerX:0,

    centerY:0,


    arenaW:820,

    arenaH:470


};






function drawMap(ctx,W,H){



    mapData.centerX=W/2;
    mapData.centerY=H/2;





    // =========================
    // 사막 배경
    // =========================


    ctx.fillStyle="#c59a58";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );





    // 모래 무늬


    ctx.globalAlpha=.15;


    ctx.strokeStyle="#70451e";

    ctx.lineWidth=3;



    for(let i=0;i<50;i++){


        ctx.beginPath();


        let x=
        (i*173)%W;


        let y=
        (i*97)%H;



        ctx.arc(
            x,
            y,
            40+(i%4)*20,
            0,
            Math.PI
        );


        ctx.stroke();


    }



    ctx.globalAlpha=1;








    // =========================
    // 절벽 그림자
    // =========================


    ctx.fillStyle="#5a3b20";


    ctx.beginPath();


    ctx.ellipse(
        W/2,
        H/2+15,
        470,
        290,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();







    // =========================
    // 돌 경기장 외곽
    // =========================


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







    // =========================
    // 돌 타일
    // =========================


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
    "rgba(40,30,20,.25)";


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








    // =========================
    // 중앙 고대 문양
    // =========================



    ctx.strokeStyle="#caa15c";

    ctx.lineWidth=6;



    ctx.beginPath();


    ctx.arc(
        W/2,
        H/2,
        130,
        0,
        Math.PI*2
    );


    ctx.stroke();




    ctx.beginPath();


    ctx.arc(
        W/2,
        H/2,
        55,
        0,
        Math.PI*2
    );


    ctx.stroke();








    // =========================
    // 금 간 바닥
    // =========================



    ctx.strokeStyle="#3b3025";

    ctx.lineWidth=3;



    for(let i=0;i<8;i++){


        ctx.beginPath();


        ctx.moveTo(
            W/2,
            H/2
        );


        ctx.lineTo(
            W/2+
            Math.cos(i)*180,
            H/2+
            Math.sin(i)*120
        );


        ctx.stroke();


    }






    // =========================
    // 폐허 기둥
    // =========================



    drawRuinedColumn(
        ctx,
        150,
        150
    );


    drawRuinedColumn(
        ctx,
        W-180,
        170
    );


    drawRuinedColumn(
        ctx,
        170,
        H-150
    );


    drawRuinedColumn(
        ctx,
        W-220,
        H-140
    );



}









function drawRuinedColumn(
ctx,x,y
){



    // 그림자


    ctx.fillStyle=
    "rgba(0,0,0,.3)";


    ctx.beginPath();


    ctx.ellipse(
        x+15,
        y+45,
        40,
        15,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();







    // 기둥


    ctx.fillStyle="#68533b";


    ctx.fillRect(
        x,
        y,
        35,
        90
    );





    // 밝은 면


    ctx.fillStyle="#a38a62";


    ctx.fillRect(
        x,
        y,
        10,
        90
    );





    // 부서진 윗부분


    ctx.beginPath();


    ctx.moveTo(
        x-10,
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
