var MyMenu = Framework.exClass(Framework.GameMainMenu , {
	//初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
    },

	load: function(){
		//Animation Sprite會用到的圖片資源
        var photoLink =
        [
            define.imagePath + 'Boxhead-1.jpg'
        ];
        
        this.oo = new Framework.AnimationSprite({
            url: [define.imagePath + 'option.png', define.imagePath + 'option11.png']
        });
        this.photo = new Framework.AnimationSprite({ url: photoLink, loop: true, speed: 0.05 });
        this.bott = new Framework.AnimationSprite({
            url: [define.imagePath + 'start.png', define.imagePath + 'start11.png']
        });
        this.bott.start({ from: 0, to: 0 });
        this.change = 0;
   
        this.oo.start({ from: 0, to: 0 });
        this.optionTouch = { x: 0, y: 0 };
        this.isTouch_option = false;

        this.previousTouch = { x: 0, y: 0 };
        this.currentTouch = { x: 0, y: 0 };
        this.isTouchArrow = false;

        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.center = new Framework.Scene();
        this.center.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };

        //由於scrollBar將會被attach到this.center上
	    //故x設為0, 表示x也是要正中心
        this.oo.position = {
            x: Framework.Game.getCanvasWidth() / 4,
            y: Framework.Game.getCanvasHeight() /17*10
        };
        this.bott.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 7*6
        };

        this.photo.position = {
            x: 0,
            y: 0
        };

        this.center.attach(this.photo);
        //rootScene為系統預設的容器, 由於其他東西都被attach到center上
	    //將物件attach到center上, 順序是會影響繪製出來的效果的
        this.rootScene.attach(this.center);
        this.rootScene.attach(this.bott);
        this.rootScene.attach(this.oo);

        //讓AnimationSprite開始被播放
        this.photo.start();

        this.audio = new Framework.Audio({
            kick: {
                mp3: define.musicPath + 'kick2.mp3',
            }, song1: {
                mp3: define.musicPath + 'Pucker_Up.mp3',
            },
        });

	    //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({ name: 'song1', loop: true });
        
	},

    initialize: function() {

    },

    update:function(){
        this.rootScene.update();
        this.oo.update();
        this.bott.update();
    },

    draw: function(parentCtx) {
        //this.rootScene.draw();一定要在第一行
        this.rootScene.draw(parentCtx);

    },

    mouseup: function(e) {
        this.isTouch = false;
        this.isTouch1 = false;
    },

    mousemove: function(e) {
        //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息
        if (e) {
            console.log(e.x, e.y);
        }

        this.optionTouch = { x: e.x, y: e.y };
        if (this.optionTouch.x > this.oo.upperLeft.x && this.optionTouch.x < this.oo.upperRight.x && this.optionTouch.y > this.oo.upperLeft.y && this.optionTouch.y < this.oo.lowerLeft.y) {
            this.oo.start({ from: 1, to: 1, loop: true, speed: 0.5 });

            this.isTouch1 = true;
        }
        else {
            this.oo.start({ from: 0, to: 0, loop: true, speed: 0.5 });
            this.isTouch1 = false;
        }


        this.previousTouch = { x: e.x, y: e.y };

        if (this.previousTouch.x > this.bott.upperLeft.x && this.previousTouch.x < this.bott.upperRight.x && this.previousTouch.y > this.bott.upperLeft.y && this.previousTouch.y < this.bott.lowerLeft.y) {
            console.log(e.x, e.y);
            this.bott.start({ from: 1, to: 1,loop:true,speed:0.5 });            
            this.isTouch = true;        
        }

        else {
            this.bott.start({ from: 0, to: 0, loop: true, speed: 0.5 });
            this.isTouch = false;
        }
    },

    mousedown: function (e) {
        if ((this.isTouch1 == 1) && (this.optionTouch.x > this.oo.upperLeft.x && this.optionTouch.x < this.oo.upperRight.x && this.optionTouch.y > this.oo.upperLeft.y && this.optionTouch.y < this.oo.lowerLeft.y)) {
            this.audio.stopAll();
            Framework.Game.goToLevel('option');
        }

        if ((this.isTouch == 1) && (this.previousTouch.x > this.bott.upperLeft.x && this.previousTouch.x < this.bott.upperRight.x && this.previousTouch.y > this.bott.upperLeft.y && this.previousTouch.y < this.bott.lowerLeft.y)) {
            /*this.currentTouch = { x: e.x, y: e.y };
            if (this.currentTouch.x > this.previousTouch.x && this.currentTouch.y < this.rightArrow.lowerLeft.y && this.currentTouch.y > this.rightArrow.upperLeft.y) {
                //當arrow被Touch到時, 會跟隨著觸控的位置移動
                this.rightArrow.position.x = this.rightArrow.position.x + this.currentTouch.x - this.previousTouch.x
                if(this.currentTouch.x > Framework.Game.getCanvasWidth() - this.rightArrow.width) {
                    //當要換關時, 可以呼叫goToNextLevel, goToPreviousLevel, goToLevel(levelName)*/
                    this.audio.stopAll();
                    Framework.Game.goToNextLevel();
                //}
           // }
       }
        this.previousTouch = this.currentTouch;
        this.optionTouch = this.currentTouch;
    },

    mouseup: function(e) {
        this.isTouchArrow = false;
        this.isTouch_option = false;
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.mousedown({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    touchend: function (e) {
        this.mouseup();
    },

});



