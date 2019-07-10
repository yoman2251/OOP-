var Option = Framework.Class(Framework.Level, {

    load: function () {
        this.option = new Framework.Sprite(define.imagePath + 'Boxhead-1.jpg');
        this.option.position = {
            x: 800,
            y: 450
        };
        this.back = new Framework.Sprite(define.imagePath + 'back.png');
        this.back.position = {
            x: 110,
            y: 110
        };
        this.rootScene.attach(this.option);
        this.rootScene.attach(this.back);

        this.previousTouch = { x: 0, y: 0 };
        this.isTouch = false;

        this.audio = new Framework.Audio({
           song2: {
               mp3: define.musicPath + 'Evil_March.mp3',
            },
        });

        this.audio.play({ name: 'song2', loop: true });
    },
    draw: function (parentCtx) {
        parentCtx.font = '50pt bold';
        parentCtx.fillStyle = 'Blue';
        parentCtx.textAlign = 'left';
        parentCtx.fillText("Press 'space' is attack", 10, 475);
        parentCtx.fillText("Press 'Z' is set time bomb", 10, 545);
        parentCtx.fillText("Press 'Arrow key' can control direction", 10, 615);
        parentCtx.font = '55pt bold';
        parentCtx.textAlign = 'center';
        parentCtx.fillStyle = 'yellow';
        parentCtx.fillText("Please press 'Back' and play the game just now !!!", 800, 750);
    },

    mousemove: function (e) {
        this.previousTouch = { x: e.x, y: e.y };
        if (this.previousTouch.x > this.back.upperLeft.x && this.previousTouch.x < this.back.upperRight.x && this.previousTouch.y > this.back.upperLeft.y && this.previousTouch.y < this.back.lowerLeft.y) {
            this.isTouch = true;
        }
        else {
            this.isTouch = false;
        }
    },

    mousedown: function (e) {   
        if ((this.isTouch == 1) && (this.previousTouch.x > this.back.upperLeft.x && this.previousTouch.x < this.back.upperRight.x && this.previousTouch.y > this.back.upperLeft.y && this.previousTouch.y < this.back.lowerLeft.y)) {
            this.audio.stopAll();
            Framework.Game.goToLevel('menu');
          
        }
    },

    mouseup: function (e) {
        this.isTouch = false;

    },
 
});