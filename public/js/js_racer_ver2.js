window.onload = function() {

    var w = window.innerWidth;
    var h = window.innerHeight;

    var canvas = document.getElementById("subCanvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

    var submarine_img = new Image();
    submarine_img.src = "../public/images/js_racer_ver2/submarine-t.png";

    var torpedo_img = new Image();
    torpedo_img.src = "../public/images/js_racer_ver2/torpedo.png";

    var torpedoArray = [];

    var keyActions = {
        32: "fire",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    document.addEventListener("keydown", function(event){
        var direction = keyActions[event.keyCode];
        submarine.setDirection(direction);
    });

    var Sub = function() {
        this.x = (width - 100) / 2;
        this.y = (height - 100) / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    };

    Sub.prototype.getX = function() {
      return this.x;
    };

    Sub.prototype.draw = function() {
        ctx.drawImage(submarine_img, this.x, this.y, 100, 100);
    };

    Sub.prototype.setDirection = function(direction) {
        if (direction === "up") {
            this.y -= 5;
            if (this.y < 0) {
                this.y = 0;
            }
        } else if (direction === "down") {
            this.y += 5;
            if (this.y > (height - (height * 0.2))) {
                this.y = (height - (height * 0.2));
            }
        } else if (direction === "left") {
            this.x += -5;
            if (this.x < 0) {
                this.x = 0;
            }

        } else if (direction === "right") {
            this.x += 5;
            if (this.x > (width - (width * 0.15))) {
                this.x = width - (width * 0.15);
            }

        } else if (direction === "fire") {
            //console.log(submarine.getX);
            console.log(submarine.x);
            console.log(submarine.y);

            var torpedo = new Torpedo();
            torpedoArray.push(torpedo);
        }
    };

    var Torpedo = function(){
        this.x = submarine.x;
        this.y = submarine.y;
        this.xSpeed = 2;
        this.ySpeed = 0;
    };

    Torpedo.prototype.move = function() {
      this.x += this.xSpeed;
    };

    Torpedo.prototype.draw = function() {
      ctx.drawImage(torpedo_img, this.x + 95, this.y + 40, 20, 20);
    };

    var submarine = new Sub();

    setInterval(function() {
        ctx.clearRect(0, 0, width, height);
        submarine.draw();
        console.log(torpedoArray.length);
        for (i = 0; i < torpedoArray.length; i++) {
          torpedoArray[i].move();
          torpedoArray[i].draw();
        }
        // if (torpedoArray.length > 0) {
        //   torpedo.draw();
        // }
    }, 30);

};
