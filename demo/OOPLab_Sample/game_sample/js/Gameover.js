 var Gameover = Framework.Class(Framework.Level , {  

    load: function () {  
        this.gameover = new Framework.Sprite(define.imagePath + 'Game over.png');  
        this.go_back = new Framework.Sprite(define.imagePath + 'press space.png');  
        this.gameover.position={  
            x:800,  
            y:450  
        };  
        this.go_back.position={  
            x:800,  
            y:200  
        };  
        this.rootScene.attach(this.gameover);  
        this.timer = 0;  
        this.play = 1;  
        console.log("score=%d",this.score_sum)  
        for(i=0;i<50;i++)  
        {  
            this.timer++;  
        }  
        if (this.timer==49)  
        {  
            this.play=-(this.play);  
            this.timer=0;  
        }  
        if(this.play==1)  
        {  
            this.rootScene.attach(this.go_back);  
        }  
        else  
        {  
            this.rootScene.detach(this.go_back);  
        }
        this.digit = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',  
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});  
        this.tens = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',  
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});  
        this.hundred = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',  
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});  
        this.digit.position = {x:800,y:700};  
        this.tens.position = {x:1000,y:700};  
        this.hundred.position = {x:1200,y:700};  
        this.digit.num = this.score_sum%10;  
        if(sum>=10)  
        {  
            this.tens.num = ((this.score_sum-this.digit.num)/10)%10;  
            if(sum>=100)  
            {  
                 this.hundred.num = ((this.score_sum-this.digit.num-this.tens.num*10)/100)%10;  
            }  
            else  
            {  
                this.hundred.num = 0;  
            }  
        }  
        else  
        {  
            this.tens.num = 0;  
        }  
        this.digit.start({from:this.digit.num, to: this.digit.num});  
        this.tens.start({from:this.tens.num, to: this.tens.num});  
        this.hundred.start({from:this.hundred.num, to: this.hundred.num});  
    },  

    update: function () {  
        for(i=0;i<50;i++)  
        {  
            this.timer++;  
        }  
        if (this.timer==49)  
        {  
            this.play=-(this.play);  
            this.timer=0;  
        }  
        if(this.play==1)  
        {  
            this.rootScene.attach(this.go_back);  
        }  
        else if(this.play==-1)  
        {  
            this.rootScene.detach(this.go_back);  
        }  
    },  
//*********************************按下空白鍵後回主頁
    keydown: function (e) {  
        if(e.key === 'Space'){  
            Framework.Game.goToLevel('menu');  
        }  
    },  
});  