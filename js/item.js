// =================================
// Ancient Duel - Item System
// =================================


const itemTypes = {


    heal:{

        name:"회복약",

        color:"#45e36a",

        description:
        "HP를 2 회복합니다"

    },


    goldenSword:{

        name:"황금검",

        color:"#ffd43b",

        description:
        "다음 공격 피해가 2배가 됩니다"

    },


    shield:{

        name:"무적 구슬",

        color:"#4db8ff",

        description:
        "2초 동안 피해를 받지 않습니다"

    }



};





let itemTimer=8;

let itemCount=0;





// =================================
// 아이템 생성
// =================================


function spawnItem(items){


    if(itemCount>=2)
        return;



    const keys=
    Object.keys(itemTypes);



    const type=
    keys[
        Math.floor(
            Math.random()*keys.length
        )
    ];




    const item={


        x:
        250+
        Math.random()*(
        window.innerWidth-500
        ),


        y:
        180+
        Math.random()*(
        window.innerHeight-360
        ),



        type:type,


        active:true,


        size:18



    };



    items.push(item);


    itemCount++;


    showMessage(
        itemTypes[type].name+
        " 등장!"
    );

}








// =================================
// 업데이트
// =================================


function updateItems(
    items,
    p1,
    p2,
    dt
){



    itemTimer-=dt;



    if(itemTimer<=0){


        spawnItem(items);


        itemTimer=
        15+
        Math.random()*5;


    }





    for(
        let item of items
    ){



        if(!item.active)
            continue;




        checkPickup(
            item,
            p1
        );


        checkPickup(
            item,
            p2
        );



    }


}









// =================================
// 획득 판정
// =================================


function checkPickup(
    item,
    player
){



    let dist=
    Math.hypot(
        item.x-player.x,
        item.y-player.y
    );



    if(
        dist<45
    ){


        applyItem(
            item.type,
            player
        );



        item.active=false;



        showMessage(
            itemTypes[item.type]
            .description
        );


    }



}








// =================================
// 효과 적용
// =================================


function applyItem(
    type,
    player
){



    switch(type){



        case "heal":


            player.hp=
            Math.min(
                7,
                player.hp+2
            );


        break;





        case "goldenSword":


            player.damageBoost=true;


        break;






        case "shield":


            player.invincible=2;


        break;



    }



}









// =================================
// 그리기
// =================================


function drawItems(
    ctx,
    items
){


    for(
        let item of items
    ){


        if(!item.active)
            continue;




        let data=
        itemTypes[item.type];



        ctx.save();


        ctx.translate(
            item.x,
            item.y
        );




        // 빛 효과

        ctx.globalAlpha=.25;

        ctx.fillStyle=data.color;

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





        // 아이템 본체


        ctx.fillStyle=
        data.color;


        ctx.beginPath();


        ctx.arc(
            0,
            0,
            item.size,
            0,
            Math.PI*2
        );


        ctx.fill();





        // 모양 구분


        ctx.fillStyle="#fff";

        ctx.font="14px sans-serif";

        ctx.textAlign="center";


        if(item.type==="heal")
            ctx.fillText(
                "+",
                0,
                5
            );


        if(item.type==="goldenSword")
            ctx.fillText(
                "⚔",
                0,
                5
            );


        if(item.type==="shield")
            ctx.fillText(
                "★",
                0,
                5
            );



        ctx.restore();


    }


}









// =================================
// 메시지
// =================================


function showMessage(text){


    const box=
    document.getElementById(
        "message"
    );


    if(box)
        box.innerText=text;


}
