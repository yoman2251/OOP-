var MyGame = Framework.Class(Framework.Level , {

    load: function () {
		var characterPosition;
        this.gameMap = new GameMap();
        this.gameMap.load(this.rootScene);
        this.rootScene.attach(this.gameMap);
        this.score = new score();
        this.score.load(this.rootScene);
        this.bomb = [];
        this.zombie = [];
        this.zombie[0]=new Zombies();
        this.zombie[0].load(this.rootScene,1);
        this.ZombieFreq = 0;
        this.ZombieNum = 1;
        this.entrance=1;
        this.shoot = [];
        this.MH=1000;
        this.MW=1000;
        this.level =20;
        this.die=0;
        this.move=3;
        this.bomb_timer=[];
        this.Zombie_speed=2;
        this.Zombie_out=40;
        MU=0;
        MD=0;
        ML=0;
        MR=0;
        this.bullet=1;
        shoot=0;
        shootdirection = [];
        judge=[];
        dis = [];
        Roledirection = 0;
        freq=0;
        this.pic = new Framework.Sprite(define.imagePath + 'character.png');
        this.roledown = new Framework.Sprite(define.imagePath + 'character.png');
        this.roleup = new Framework.Sprite(define.imagePath + 'roleup.png');
        this.roleleft = new Framework.Sprite(define.imagePath + 'roleleft.png');
        this.roleright = new Framework.Sprite(define.imagePath + 'roleright.png');
        this.roleru = new Framework.Sprite(define.imagePath + 'MRU.png');
        this.rolelu = new Framework.Sprite(define.imagePath + 'MLU.png');
        this.roleld = new Framework.Sprite(define.imagePath + 'MLD.png');
        this.rolerd = new Framework.Sprite(define.imagePath + 'MRD.png');
        this.role = this.pic;
        this.role.position = {x:800,y:500};
        this.rootScene.attach(this.role);
        this.shoot[0]=new Shoot();
        this.shoot[0].load(this.rootScene,this.role);
        this.shoot[0].update;
        this.shoot[0].detach(this.rootScene,0);
        this.speed =10;
        score_sum = 0;
        final_score = 0;
      
        this.audio = new Framework.Audio({
            kick: {
                mp3: define.musicPath + 'kick2.mp3',
            }, song1: {
                mp3: define.musicPath + 'Pucker_Up.mp3',
            },shot: {
                mp3: define.musicPath + 'Gunshot.mp3',
            },hit: {
                mp3: define.musicPath + 'hit.mp3',
            },bgm: {
                mp3: define.musicPath + 'bgm.mp3',
            },gameover1: {
                mp3: define.musicPath + 'Gameover1.mp3',
            },gameover2: {
                mp3: define.musicPath + 'Gameover2.mp3',
            },running: {
                mp3: define.musicPath + 'Running.mp3',
            },zombie: {
                mp3: define.musicPath + 'zombie.mp3',
            },Explosion_sound: {
                mp3: define.musicPath + 'Explosion_sound.mp3',
            },
        });

        this.level_num = 1;
        this.level_img = new Framework.AnimationSprite({url:[
            define.imagePath + 'Bomb.png',
            define.imagePath + 'Level1.png',
            define.imagePath + 'Level2.png',
            define.imagePath + 'Level3.png',
            define.imagePath + 'Level4.png',
            define.imagePath + 'Level5.png',
            define.imagePath + 'Level6.png',
            define.imagePath + 'Level7.png',
            define.imagePath + 'Level8.png',
            define.imagePath + 'Level9.png',
            ]}); 
        this.level_img.position = {x:1450,y:40};
        this.level_img.start({from:1, to: 1});
        this.rootScene.attach(this.level_img);
        this.audio.play({ name: 'bgm', loop: true });
        for(i=1;i<=100;i++)
        {
            this.bomb[i] = new Framework.AnimationSprite({url:[
                define.imagePath + 'Bomb.png',
                define.imagePath + 'explosion1.png',
                define.imagePath + 'explosion2.png',
                define.imagePath + 'explosion3.png',
                define.imagePath + 'explosion4.png',
                define.imagePath + 'explosion5.png',
                define.imagePath + 'explosion6.png',
                define.imagePath + 'explosion7.png',
                define.imagePath + 'explosion8.png',
                define.imagePath + 'explosion9.png',
                define.imagePath + 'explosion10.png',
                define.imagePath + 'explosion11.png',
                define.imagePath + 'explosion12.png',
                define.imagePath + 'explosion13.png',
                define.imagePath + 'explosion14.png',
                define.imagePath + 'explosion15.png',
                define.imagePath + 'explosion16.png',
                define.imagePath + 'explosion17.png',
                define.imagePath + 'explosion18.png',
                define.imagePath + 'explosion19.png',
                define.imagePath + 'explosion20.png'
                ]}); 
            this.bomb_timer[i]=0;
        }
        this.bomb_put = 0;
        this.bomb_num = 100;

        this.keydown = function (e, list)
        {
            if(e.key === 'Right'){
                MR=1;
                this.audio.play({ name: 'running', loop: true });
            }
            if(e.key === 'Left'){
                ML=1;
                this.audio.play({ name: 'running', loop: true });
            }
            if(e.key === 'Up'){
                MU=1;
                this.audio.play({ name: 'running', loop: true });
            }
            if(e.key === 'Down'){
                MD=1;
                this.audio.play({ name: 'running', loop: true });
            }
            if(e.key === 'Space'){
                shoot=1;
                freq =15;
            }
            if(e.key === 'Z'){
                this.bomb_put = 1;
            }
        };

        this.keyup = function(e,list)
        {
            if(e.key === 'Right'){
                MR=0;
                this.audio.stop('running');
            }
            if(e.key === 'Left'){
                ML=0;
                this.audio.stop('running'); 
            }
            if(e.key === 'Up'){
                MU=0;
                this.audio.stop('running');
            }
            if(e.key === 'Down'){
                MD=0;
                this.audio.stop('running'); 
            }
            if(e.key === 'Space'){
                shoot=0;
            }
            if(e.key === 'Z'){
                this.bomb_put = 0;
            }
        };

        this.update = function ()
        {
            this.score.update(score_sum);
            this.ZombieFreq ++;
            if ((this.ZombieFreq>=this.Zombie_out)&&(this.ZombieNum < this.level))
            {
                this.entrance=this.ZombieNum % 4 ;
                this.ZombieFreq = 0;
                this.zombie[this.ZombieNum]= new Zombies();
                this.zombie[this.ZombieNum].load(this.rootScene,this.entrance);
                this.ZombieNum++;
            }
            if ((this.bomb_put==1)&&(this.bomb_num>0))
            {
                this.bomb[this.bomb_num].position = {x:this.role.position.x,y:this.role.position.y};
                this.rootScene.attach(this.bomb[this.bomb_num]);
                this.bomb[this.bomb_num].start({from:0, to: 0, loop: true, speed: 20});
                this.bomb_put = 0;
                this.bomb_timer[this.bomb_num]=1;
                this.bomb_num--;
            }
            for(i=100;i>0;i--)
            {
                if((this.bomb_timer[i] != 0 ) && (this.bomb_timer[i]<=100))
                {
                    this.bomb_timer[i]++;
                }
                if(this.bomb_timer[i]==100) 
                {
                    this.rootScene.attach(this.bomb[this.bomb_num]); 
                    this.bomb[i].start({from:0, to: 20, loop: false, speed: 20});
                    this.audio.play({ name: 'Explosion_sound', loop: false });
                    for (j = 0 ; j < this.ZombieNum ; j++)
                    {
                        if(((this.bomb[i].position.x +100 > this.zombie[j].zombie.position.x)
                        &&(this.bomb[i].position.x -100 < this.zombie[j].zombie.position.x ))
                        &&(this.bomb[i].position.y -100 < this.zombie[j].zombie.position.y)
                        &&(this.bomb[i].position.y +100 > this.zombie[j].zombie.position.y)
                        && (this.zombie[j].hurttime != 0))
                        {
                            this.zombie[j].hurttime=1;
                            this.zombie[j].hurt(this.rootScene);
                            if (this.zombie[j].hurttime <= 0)
                            {
                                this.audio.play({ name: 'zombie', loop: false });
                                this.die++;
                                score_sum++;
                                final_score=score_sum;
                            }
                            judge[i]=0;
                            break;
                            if(i<=10)
                            {
                                this.bomb_num=100;
                            }
                        }
                    }
                }
            }
            if (this.die == this.level)
            {
                this.level+=10;
                this.level_num++;
                this.level_img.start({from:this.level_num, to: this.level_num});
                this.die=0;
                this.ZombieNum=0;
                this.Zombie_speed++;
            }
            if(this.level>=40)
            {
                this.Zombie_out=30;
            }
            else if(this.level>=60)
            {
                this.Zombie_out=15;
            }
            for(i=1;i<this.bullet;i++)
            {
                if(judge[i]==1)
                {
                    for (j = 0 ; j < this.ZombieNum ; j++)
                    {
                        if(((this.shoot[i].shoot.position.x > this.zombie[j].zombie.position.x -20)
                        &&(this.shoot[i].shoot.position.x < this.zombie[j].zombie.position.x +20))
                        &&(this.shoot[i].shoot.position.y < this.zombie[j].zombie.position.y+20 )
                        &&(this.shoot[i].shoot.position.y > this.zombie[j].zombie.position.y-20 )
                        && (this.zombie[j].hurttime != 0))
                        {
                            console.log(shootdirection[i]);
                            if(shootdirection[i] == 1)
                            {
                                this.zombie[j].zombie.position={x:this.zombie[j].zombie.position.x,y:this.zombie[j].zombie.position.y -this.speed };
                            }
                            if(shootdirection[i] == 2)
                            {
                                this.zombie[j].zombie.position={x:this.zombie[j].zombie.position.x,y:this.zombie[j].zombie.position.y +this.speed};
                            }
                            if(shootdirection[i] == 3)
                            {
                                this.zombie[j].zombie.position={x:this.zombie[j].zombie.position.x -this.speed ,y:this.zombie[j].zombie.position.y };
                            }
                            if(shootdirection[i] == 4)
                            {
                                this.zombie[j].position = {x:this.zombie[j].zombie.position.x +this.speed ,y:this.zombie[j].zombie.position.y };
                            }
                            if(shootdirection[i] == 31)
                            {
                                this.zombie[j].position = {x:this.zombie[j].zombie.position.x -this.speed*0.707,y:this.zombie[j].zombie.position.y -this.speed*0.707};
                            }
                            if(shootdirection[i] == 32)
                            {
                                this.zombie[j].position = {x:this.zombie[j].zombie.position.x -this.speed*0.707,y:this.zombie[j].zombie.position.y +this.speed*0.707};
                            }
                            if(shootdirection[i] == 41)
                            {
                                this.zombie[j].position = {x:this.zombie[j].zombie.position.x + this.speed*0.707,y:this.zombie[j].zombie.position.y - this.speed*0.707};
                            }
                            if(shootdirection[i] == 42)
                            {
                                this.zombie[j].position = {x:this.zombie[j].zombie.position.x + this.speed*0.707,y:this.zombie[j].zombie.position.y + this.speed*0.707};
                            }
                            this.zombie[j].hurt(this.rootScene);
                            this.audio.play({ name: 'hit', loop: false });
                            if (this.zombie[j].hurttime <= 0)
                            {
                                this.audio.play({ name: 'zombie', loop: false });
                                this.die++;
                                score_sum ++;
                            }
                            judge[i]=0;
                            shoot[i]=0;
                            this.shoot[i].detach(this.rootScene,i);
                            break;
                        }
                        else
                        {
                            this.shoot[i].update(shootdirection[i]);
                            dis[i]++;
                        }
                    }
                    if(dis[i]>600)
                    {
                        // console.log(dis[i]);
                        shoot[i]=0;
                        judge[i]=0;
                    }
                }
                else if(judge[i]== 0){
                    // console.log(dis[i]);
                    this.shoot[i].detach(this.rootScene,i);
                    shoot[i]=0;
                    judge[i]=2;
                }
            }

            for (i = 0 ; i < this.ZombieNum ; i++)
            {
                this.zombie[i].update(this.role,this.rootScene,this.Zombie_speed);
                if((this.zombie[i].zombie.position.x == this.role.position.x)&&(this.zombie[i].zombie.position.y == this.role.position.y)&&(this.zombie[i].hurttime != 0))
                {
                    this.audio.stopAll();
                    this.audio.play({ name: 'gameover1', loop: false });
                    this.audio.play({ name: 'gameover2', loop: false });
                    Framework.Game.goToNextLevel();
                }
            }
            roleX=this.role.position.x ;
            roleY=this.role.position.y ;
            this.rootScene.detach(this.role);
            if ((MU==1)&&(ML==1)) {                            //role go to left_up
                this.role.position = {
                    x: this.role.position.x -2,
                    y: this.role.position.y - 2
                };
                this.rolelu.position = this.role.position;
                this.role = this.rolelu;
                Roledirection = 31;
            }

            else if ((MU == 1) && (MR == 1)) {                     //role go to right_up
                this.role.position = {
                    x: this.role.position.x + 2,
                    y: this.role.position.y - 2
                };
                this.roleru.position = this.role.position;
                this.role = this.roleru;
                Roledirection = 41;
            }
            else if ((MD == 1) && (ML == 1)) {                    //role go to left_down
                this.role.position = {
                    x: this.role.position.x - 2,
                    y: this.role.position.y + 2
                };
                this.roleld.position = this.role.position;
                this.role = this.roleld;
                Roledirection = 32;
            }
            else if ((MD == 1) && (MR == 1)) {                   //role go to right_down
                this.role.position = {
                    x: this.role.position.x + 2,
                    y: this.role.position.y + 2
                };
                this.rolerd.position = this.role.position;
                this.role = this.rolerd;
                Roledirection = 42;
            }
            else if(MR==1){
                this.role.position = {
                    x: this.role.position.x +2,
                    y: this.role.position.y
                };
                this.roleright.position = this.role.position;
                this.role = this.roleright;
                Roledirection = 4;
            }
            else if(ML==1){
                this.role.position = {
                    x: this.role.position.x -2,
                    y: this.role.position.y
                };
                this.roleleft.position = this.role.position;
                this.role = this.roleleft;
                Roledirection = 3;
            }
            else if(MU==1){
                this.role.position = {
                    x: this.role.position.x ,
                    y: this.role.position.y -2
                };
                this.roleup.position = this.role.position;
                this.role = this.roleup;
                Roledirection = 1;
            }
            else if(MD==1){
                this.role.position = {
                    x: this.role.position.x ,
                    y: this.role.position.y +2
                };
                this.roledown.position = this.role.position;
                this.role = this.roledown;
                Roledirection = 2;
            }
            if ((shoot == 1) && (freq == 15 ))
            {
                this.shoot[this.bullet]=new Shoot();
                this.audio.play({ name: 'shot', loop: false });
                this.audio.setVolume('shot', 0.5);
                shootdirection[this.bullet]=Roledirection;
                this.shoot[this.bullet].load(this.rootScene,this.role);
                dis[this.bullet]=0;
                judge[this.bullet]=1
                this.bullet++;
                freq = 0;
            }
            else if ((shoot == 1) && (freq < 15 ))
            {
                freq++;
            }
            if ((this.role.position.x <= 70) && (this.role.position.y >= 385) && (this.role.position.y <= 480)) {        
                if (this.role.position.x <= 10)
                {
                    this.role.position = {
                        x: 1550,
                        y: this.role.position.y
                    };
                }
            }
            if ((this.role.position.x <= 70) && ((this.role.position.y <= 385) || (this.role.position.y >= 480))){
                this.role.position = {
                    x: 70,
                    y: this.role.position.y
                };
            }
            if ((this.role.position.x >= 1540) && (this.role.position.y >= 385) && (this.role.position.y <= 480))      
            {
                if (this.role.position.x >= 1570)
                {
                    this.role.position = {
                        x: 10,
                        y: this.role.position.y
                    };
                }
            }
            if ((this.role.position.x >= 1540) && ((this.role.position.y <= 385) || (this.role.position.y >= 480)))  
            {
                this.role.position = {
                    x: 1540,
                    y: this.role.position.y
                };
            }
            if ((this.role.position.y <= 80) && (this.role.position.x >= 760) && (this.role.position.x <= 895))     
            {
                if (this.role.position.y <= 10) {
                    this.role.position = {
                        x: this.role.position.x,
                        y: 835
                    };
                }
            }
            if ((this.role.position.y <= 80) && ((this.role.position.x <= 760) || (this.role.position.x >= 895)))     
            {
                this.role.position = {
                    x: this.role.position.x,
                    y: 80
                };
            }
            if ((this.role.position.y >= 825) && (this.role.position.x >= 760) && (this.role.position.x <= 895))     
            {
                if (this.role.position.y >= 845)
                {
                    this.role.position = {
                        x: this.role.position.x,
                        y: 10
                    };
                }
            }
            if ((this.role.position.y >= 825) && ((this.role.position.x <= 760) || (this.role.position.x >= 895)))   
            {
                this.role.position = {
                    x: this.role.position.x,
                    y: 825
                };
            }
            this.rootScene.attach(this.role);
        };
    },
});
