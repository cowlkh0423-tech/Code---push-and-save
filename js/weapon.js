// =================================
// Ancient Duel - Weapon System
// =================================



class Sword{


constructor(owner){

    this.owner=owner;


    this.range=95;


    this.angleRange=Math.PI/2.5;


    this.damage=1;


    this.hitCooldown=0;


    this.effectTimer=0;


}






update(dt){


    if(this.hitCooldown>0)
        this.hitCooldown-=dt;


    if(this.effectTimer>0)
        this.effectTimer-=dt;



}







attack(target){


    if(
        this.owner.attackTimer<=0
    )
        return;



    if(this.hitCooldown>0)
        return;




    let dx=
    target.x-this.owner.x;


    let dy=
    target.y-this.owner.y;



    let distance=
    Math.hypot(dx,dy);



    if(distance>this.range)
        return;




    let targetAngle=
    Math.atan2(
        dy,
        dx
    );



    let diff=
    Math.atan2(
        Math.sin(
            targetAngle-this.owner.angle
        ),
        Math.cos(
            targetAngle-this.owner.angle
        )
    );




    // 베기 범위 안

    if(
        Math.abs(diff)
        <
        this.angleRange/2
    ){


        let damage=this.damage;



        if(this.owner.damageBoost){

            damage*=2;

            this.owner.damageBoost=false;

        }



        if(target.invincible<=0){


            target.hp-=damage;



            // 넉백

            let power=420;



            target.knockbackX =
            Math.cos(
                this.owner.angle
            )
            *
            power;



            target.knockbackY =
            Math.sin(
                this.owner.angle
            )
            *
            power;



        }



        this.hitCooldown=.3;


    }




}







draw(ctx){



if(
this.owner.attackTimer<=0
)
return;



ctx.save();



ctx.translate(
    this.owner.x,
    this.owner.y
);



ctx.rotate(
    this.owner.angle
);





let progress=
1-
(
this.owner.attackTimer/
0.28
);



ctx.rotate(
    progress*1.2
);




ctx.globalAlpha=.35;


ctx.strokeStyle="#ffffff";

ctx.lineWidth=8;


ctx.beginPath();


ctx.arc(
    20,
    0,
    75,
    -0.7,
    0.7
);



ctx.stroke();



ctx.restore();



}



}



