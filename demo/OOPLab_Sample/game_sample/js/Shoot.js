var Shoot = function(){

    this.load = function (rootScene, role) {
        this.shoot = new Framework.Sprite(define.imagePath + 'bullet.png');
        this.shoot.position = {x:role.position.x, y:role.position.y};
        rootScene.attach(this.shoot);
    };

    this.update=function(Roledirection){
        this.speed = 2;

        if(Roledirection == 1)
        {
            this.shoot.position = {x:this.shoot.position.x ,y:this.shoot.position.y - this.speed};
        }
        if(Roledirection == 2)
        {
            this.shoot.position = {x:this.shoot.position.x ,y:this.shoot.position.y + this.speed};
        }
        if(Roledirection == 3)
        {
            this.shoot.position = {x:this.shoot.position.x - this.speed,y:this.shoot.position.y };
        }
        if(Roledirection == 4)
        {
            this.shoot.position = {x:this.shoot.position.x + this.speed,y:this.shoot.position.y };
        }
        if(Roledirection == 31)
        {
            this.shoot.position = {x:this.shoot.position.x -this.speed*0.707,y:this.shoot.position.y -this.speed*0.707};
        }
        if(Roledirection == 32)
        {
            this.shoot.position = {x:this.shoot.position.x -this.speed*0.707,y:this.shoot.position.y +this.speed*0.707};
        }
        if(Roledirection == 41)
        {
            this.shoot.position = {x:this.shoot.position.x + this.speed*0.707,y:this.shoot.position.y - this.speed*0.707};
        }
        if(Roledirection == 42)
        {
            this.shoot.position = {x:this.shoot.position.x + this.speed*0.707,y:this.shoot.position.y + this.speed*0.707};
        }
    };

    this.detach=function(rootScene,i){
        rootScene.detach(this.shoot);
        delete this.shoot;
    };
};
