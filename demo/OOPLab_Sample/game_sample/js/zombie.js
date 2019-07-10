var Zombies = function(){  

    this.load = function (rootScene, entrance) {
        this.zombie = new Framework.AnimationSprite({url:[define.imagePath + 'zombieDown.png', define.imagePath + 'zombieUp.png',define.imagePath +'zombieLeft.png',define.imagePath + 'zombieRight.png',  
            define.imagePath + 'ZLD.png', define.imagePath + 'ZRU.png', define.imagePath + 'ZRD.png', define.imagePath + 'ZLU.png']});  
        this.zombie.start({from:0, to: 0});  
     
        this.bloodback = new Framework.Sprite(define.imagePath + 'BLOOD_BACK.png');  
        this.blood0 = new Framework.Sprite(define.imagePath + 'blood.png');  
        this.blood1 = new Framework.Sprite(define.imagePath + 'blood.png');  
        this.blood2 = new Framework.Sprite(define.imagePath + 'blood.png');  
        this.blood3 = new Framework.Sprite(define.imagePath + 'blood.png');  
        this.blood4 = new Framework.Sprite(define.imagePath + 'blood.png');  
        this.blood0.position = {x:this.zombie.position.x-24,y:this.zombie.position.y-35};  
        this.blood1.position = {x:this.zombie.position.x-12,y:this.zombie.position.y-35};  
        this.blood2.position = {x:this.zombie.position.x,y:this.zombie.position.y-35};  
        this.blood3.position = {x:this.zombie.position.x+12,y:this.zombie.position.y-35};  
        this.blood4.position = {x:this.zombie.position.x+24,y:this.zombie.position.y-35};  
        this.bloodback.position = {x:this.zombie.position.x,y:this.zombie.position.y-35};  
        if (entrance == 0)  
        {  
            this.zombie.position = {x:800,y:-10};  
        }  
        else if(entrance == 1)  
        {  
            this.zombie.position = {x:800,y:1000};  
        }  
        else if(entrance == 2)  
        {  
            this.zombie.position = {x:-10,y:480};  
        }  
        else if(entrance == 3)  
        {  
            this.zombie.position = {x:1610,y:480};  
        }  
        rootScene.attach(this.zombie);  
        rootScene.attach(this.bloodback);  
        rootScene.attach(this.blood0);  
        rootScene.attach(this.blood1);  
        rootScene.attach(this.blood2);  
        rootScene.attach(this.blood3);  
        rootScene.attach(this.blood4);  
        this.time=0;  
        this.speed =15;  
        this.hurttime=5;  
    };

    this.update=function(role,rootScene,speed){  
        var roleX=role.position.x ;  
        var roleY=role.position.y ;  
        this.time++;  
        this.speed = speed;  
        this.blood0.position = {x:this.zombie.position.x-24,y:this.zombie.position.y-35};  
        this.blood1.position = {x:this.zombie.position.x-12,y:this.zombie.position.y-35};  
        this.blood2.position = {x:this.zombie.position.x,y:this.zombie.position.y-35};  
        this.blood3.position = {x:this.zombie.position.x+12,y:this.zombie.position.y-35};  
        this.blood4.position = {x:this.zombie.position.x+24,y:this.zombie.position.y-35};  
        this.bloodback.position = {x:this.zombie.position.x,y:this.zombie.position.y-35};  
        if (((this.zombie.position.x > roleX ) && (this.zombie.position.y == roleY )) && (this.time==2))  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x - this.speed,  
                y : this.zombie.position.y  
            };  
            this.zombie.start({from:2, to: 2});  
            this.time=0;  
        }  
        if (((this.zombie.position.x < roleX ) && (this.zombie.position.y == roleY ))&& (this.time==2))  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x + this.speed,  
                y : this.zombie.position.y  
            };  
            this.zombie.start({from:3, to: 3});  
            this.time=0;  
        }  
        if (((this.zombie.position.y > roleY ) && (this.zombie.position.x == roleX))&& (this.time==2))  
        {  
            this.zombie.position = {
                x: this.zombie.position.x,
                y: this.zombie.position.y - this.speed
            };
            this.zombie.start({from:1, to: 1});  
            this.time=0;  
        }  
        if (((this.zombie.position.y < roleY ) && (this.zombie.position.x == roleX ))&& (this.time==2))  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x ,  
                y : this.zombie.position.y +this.speed  
            };  
            this.zombie.start({from:0, to: 0});  
            this.time=0;  
        }  
        if (((this.zombie.position.y < roleY ) && (this.zombie.position.x > roleX ))&& (this.time==2)) //LD  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x -this.speed * 0.707,  
                y : this.zombie.position.y +this.speed * 0.707  
            };  
            this.zombie.start({from:4, to: 4});  
            this.time=0;  
        }  
        if (((this.zombie.position.y > roleY ) && (this.zombie.position.x > roleX ))&& (this.time==2)) //LU  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x -this.speed * 0.707,  
                y : this.zombie.position.y -this.speed * 0.707  
            };  
            this.zombie.start({from:7, to: 7});  
            this.time=0;  
        }  
        if (((this.zombie.position.y < roleY ) && (this.zombie.position.x < roleX ))&& (this.time==2)) //RD  
        {  
            this.zombie.position ={  
            x : this.zombie.position.x +this.speed * 0.707,  
            y : this.zombie.position.y +this.speed * 0.707  
            };  
            this.zombie.start({from:6, to: 6});  
            this.time=0;  
        }  
        if (((this.zombie.position.y > roleY ) && (this.zombie.position.x < roleX ))&& (this.time==2)) //RU  
        {  
            this.zombie.position ={  
                x : this.zombie.position.x +this.speed * 0.707,  
                y : this.zombie.position.y -this.speed * 0.707  
            };  
            this.zombie.start({from:5, to: 5});  
            this.time=0;  
        }  
        if (this.time>2)  
        {  
            this.time=0;  
        }  
    };  

    this.hurt = function (rootScene) {
        this.hurttime--;  
        if(this.hurttime==4)  
        {  
            rootScene.detach(this.blood4);  
        }  
        else if(this.hurttime==3)  
        {  
            rootScene.detach(this.blood4);  
            rootScene.detach(this.blood3);  
        }  
        else if(this.hurttime==2)  
        {  
            rootScene.detach(this.blood4);  
            rootScene.detach(this.blood3);  
            rootScene.detach(this.blood2);  
        }  
        else if(this.hurttime==1)  
        {  
            rootScene.detach(this.blood4);  
            rootScene.detach(this.blood3);  
            rootScene.detach(this.blood2);  
            rootScene.detach(this.blood1);  
        }  
        else if(this.hurttime<=0)  
        {  
            rootScene.detach(this.blood4);  
            rootScene.detach(this.blood3);  
            rootScene.detach(this.blood2);  
            rootScene.detach(this.blood1);  
            rootScene.detach(this.blood0);  
            rootScene.detach(this.zombie);  
            rootScene.detach(this.bloodback);  
        }  
    };  
};