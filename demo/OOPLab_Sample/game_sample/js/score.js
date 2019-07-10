var score = function(){

    this.load=function(rootScene){
        this.digit = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});
        this.tens = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});
        this.hundred = new Framework.AnimationSprite({url:[define.imagePath + 'zero.png', define.imagePath + 'one.png',define.imagePath +'two.png',define.imagePath + 'three.png',
            define.imagePath + 'four.png', define.imagePath + 'five.png', define.imagePath + 'six.png', define.imagePath + 'seven.png', define.imagePath + 'eight.png', define.imagePath + 'nine.png']});

        this.digit.start({ from: 0, to: 0 });
        this.tens.start({from:0, to: 0});
        this.hundred.start({from:0, to: 0});
        this.digit.position = {x:300,y:30};
        this.tens.position = {x:200,y:30};
        this.hundred.position = {x:100,y:30};
        rootScene.attach(this.digit);
        rootScene.attach(this.tens);
        rootScene.attach(this.hundred);
        this.hundred.num = 0;
        this.tens.num = 0;
        this.digit.num = 0;
    };

    this.update=function(sum){
        this.digit.position = {x:300,y:180};
        this.tens.position = {x:200,y:180};
        this.hundred.position = {x:100,y:180};
        this.digit.num = sum%10;
        if(sum>=10)
        {
            this.tens.num = ((sum-this.digit.num)/10)%10;
            if(sum>=100)
            {
                this.hundred.num = ((sum-this.digit.num-this.tens.num*10)/100)%10;
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
    };

};
