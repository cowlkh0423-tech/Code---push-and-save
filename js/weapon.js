// =================================
// Ancient Duel - Weapon System V2
// =================================


class Sword{


constructor(owner){


    this.owner=owner;


    this.range=110;


    this.damage=1;


    this.hit=false;


    this.trail=[];


}






update(dt){



    if(this.owner.attackTimer>0){


        this.createTrail();


    }


    else{


        this.trail=[];


    }



}






// =============================
// 공격 판정
// =============================


attack(target){



    if(
        this.owner.attackTimer<=0
        ||
        this.hit
    )
        return;



    let dx=
    target.x-this.owner.x;


    let dy=
    target.y-this.owner.y;


    let dist=
    Math.hypot(dx,dy);



    if(dist>this.range)
        return;



    let targetAngle=
    Math.atan2(
        dy,
        dx
    );



    let diff=
    Math.atan2(
        Math.sin(
            targetAngle-
            this.owner.angle
        ),
        Math.cos(
            targetAngle-
            this.owner.angle
        )
    );




    // 베기 범위

    if(
        Math.abs(diff)
        <
        Math.PI/4
    ){


        let damage =
        this.damage;



        // 황금검

        if(
            this.owner.damageBoost
        ){

            damage*=2;

            this.owner.damageBoost=false;


        }




        target.hp-=damage;




        hitKnockback(
            target,
            this.owner.angle,
            520
        );



        this.hit=true;



    }



}






// =============================
// 공격 종료 처리
// =============================


reset(){

    this.hit=false;

}






// =============================
// 검 잔상
// =============================


createTrail(){


    this.trail.push({

        x:this.owner.x,

        y:this.owner.y,

        angle:this.owner.angle,

        life:.25

    });



    for(
        let t of this.trail
    ){

        t.life-=0.02;

    }



    this.trail=
    this.trail.filter(
        t=>t.life>0
    );

}




// =============================
// 검 그리기
// =============================


draw(ctx){



    // 잔상


    for(
        let t of this.trail
    ){


        ctx.save();


        ctx.translate(
            t.x,
            t.y
        );


        ctx.rotate(
            t.angle
        );


        ctx.globalAlpha=
        t.life;


        ctx.strokeStyle="#fff";

        ctx.lineWidth=6;


        ctx.beginPath();


        ctx.arc(
            30,
            0,
            70,
            -0.6,
            0.6
        );


        ctx.stroke();


        ctx.restore();


    }





    ctx.save();


    ctx.translate(
        this.owner.x,
        this.owner.y
    );



    ctx.rotate(
        this.owner.angle
    );



    let swing=0;



    if(
        this.owner.attackTimer>0
    ){


        swing =
        Math.sin(
        (0.28-
        this.owner.attackTimer)
        *
        Math.PI
        )
        *
        1.3;


    }




    ctx.rotate(swing);




    // 팔


    ctx.strokeStyle="#222";

    ctx.lineWidth=7;


    ctx.beginPath();


    ctx.moveTo(
        5,
        -5
    );


    ctx.lineTo(
        28,
        0
    );


    ctx.stroke();






    // 손잡이


    ctx.fillStyle="#5b3218";


    ctx.fillRect(
        25,
        -5,
        12,
        10
    );






    // 가드


    ctx.fillStyle="#b58a3c";


    ctx.fillRect(
        35,
        -9,
        5,
        18
    );






    // 칼날


    ctx.fillStyle="#e7e7e7";



    ctx.beginPath();


    ctx.moveTo(
        40,
        -5
    );


    ctx.lineTo(
        100,
        -3
    );


    ctx.lineTo(
        115,
        0
    );


    ctx.lineTo(
        100,
        3
    );


    ctx.lineTo(
        40,
        5
    );


    ctx.closePath();


    ctx.fill();






    // 빛 반사


    ctx.strokeStyle="white";

    ctx.lineWidth=2;


    ctx.beginPath();


    ctx.moveTo(
        50,
        -2
    );


    ctx.lineTo(
        95,
        -2
    );


    ctx.stroke();





    ctx.restore();



}


}
