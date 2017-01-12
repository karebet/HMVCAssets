var myGameArea;
var myGamePiece;
var myObstacles = [];
var myscore;

function restartGame() {
    document.getElementById("mygame").style.display = "none";
    document.getElementById("myrestartbutton").style.display = "none";
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("canvascontainer").innerHTML = "";
    startGame()
}

function startGame() {
    sperempat = $(window).width()/4;
    setengah = $(window).width()/2;
    myGameArea = new gamearea();
    myGamePiece = new component(30, 30, "white", setengah-100, 75);
    myscore = new component("2rem", "Consolas", "smoke", $(window).width()-sperempat, 25, "text");
    myGameArea.start();
}

function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = $(window).width()-100;
    this.canvas.height = $(window).height()/2;    
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        this.interval = setInterval(updateGameArea, 10);
    };
    this.stop = function() {
        clearInterval(this.interval);
        this.pause = true;
    };
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
}
function carplayer(color) {
    ctx = canvas.getContext('2d');
    ctx.fillRect(25,25,95,60);
    //ctx.fillStyle = color;
    ctx.clearRect(55,5,30,30);
    ctx.clearRect(5,5,30,30);
    ctx.clearRect(105,15,5,20);
    ctx.clearRect(105,10,20,20);
    ctx.clearRect(55,75,30,30);
    ctx.clearRect(5,75,30,30);
    ctx.clearRect(105,75,5,20);
    ctx.clearRect(105,80,20,20);
    ctx.clearRect(20,45,10,20);
    ctx.clearRect(40,50,40,10);
}
function component(width, height, color, x, y, type) {

    this.type = type;
    if (type == "text") {
        this.text = color;
    }
    this.score = 0;    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
}

function updateGameArea() {
    var x, y, min, max, height, gap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("mygame").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";
            return;
        } 
    }
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myscore.score +=0.01;        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 20;
            max = 100;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 50;
            max = 100;
            gap = Math.floor(Math.random()*(max-min+1)+min);
            myObstacles.push(new component(10, height, "white", x, 0));
            myObstacles.push(new component(10, x - height - gap, "white", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myscore.text="SCORE: " + Math.floor(myscore.score);        
        myscore.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup(e) {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove(e) {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
startGame();

var posmouseY=0;
var posmouseX=0;
$(document).on('mousemove', 'body', function(event) {
    event.preventDefault();
    y= event.clientY;
    x= event.clientX;
    if (posmouseY<=y) {
        myGamePiece.speedY = 1;
    }
    if (posmouseY>=y) {
        myGamePiece.speedY = -1;
    }
    if (posmouseX<=x) {
        myGamePiece.speedX = 1;
    }
    if (posmouseX>=x) {
        myGamePiece.speedX = -1;
    }
    posmouseY=y;
    posmouseX=x;
    timeout = setTimeout(function() {
        clearmove(event);
    }, 999);
});

$(document).on('keypress', 'html', function(event) {
    event.preventDefault();
    if ( event.keyCode == 38 ) {//up
        moveup(event);
    }
    if ( event.keyCode == 40 ) {//down
        movedown();
    }
    if ( event.keyCode == 39 ) {//right
        moveright();
    }
    if ( event.keyCode == 37 ) {//left
        moveleft();
    }
    timeout = setTimeout(function() {
        clearmove(event);
    }, 999);
});