var control = document.getElementById("control");
var playround = document.getElementById("playround");
var controlContext = control.getContext("2d");
var playroundContext = playround.getContext("2d");

var score = 40;
var speed = 1;
var monsterRandomNum = 1;
var hearts = 4;
var boomNum = 3;
var stopNum = 3;
var monsters = [];
var bloodLive = 200;
var mousePosX = -1;
var mousePosY = -1;
var showBlood = false;
var blood;
var level = 1;
var timeLive = 500;
var isLose = false;
var isRestart = false;
var isPause = false;
var pauseTime = 300;
var isStop = false;
var isResume = false;
var isBoom = false;
var isDecrease = false;
//Set images for game
var monsterImage = new Image();
monsterImage.onload = function() {};
monsterImage.src = "images/monster.png";

var backgroundImage = new Image();
backgroundImage.onload = function() {};
backgroundImage.src = "images/background.png";

var heartImage = new Image();
heartImage.onload = function() {};
heartImage.src = "images/heart.png";

var bloodImage = new Image();
bloodImage.onload = function() {};
bloodImage.src = "images/blood.png";

var boomImage = new Image();
boomImage.onload = function() {};
boomImage.src = "images/boom.gif";

var pauseImage = new Image();
pauseImage.onload = function() {};
pauseImage.src = "images/pause.png";

var restartImage = new Image();
restartImage.onload = function() {};
restartImage.src = "images/restart.png";

var stopImage = new Image();
stopImage.onload = function() {};
stopImage.src = "images/stop.png";

function Monster(beginX, beginY, endX, endY, startX, startY, stopX, stopY, speed, click, show, dieX, dieY) {
    this.beginX = beginX;
    this.beginY = beginY;
    this.endX = endX;
    this.endY = endY;
    this.startX = startX;
    this.startY = startY;
    this.speedX = speed;
    this.speedY = speed;
    this.stopX = stopX;
    this.stopY = stopY;
    this.positionX = startX;
    this.positionY = startY;
    this.speed = speed;
    this.click = click;
    this.show = show;
    this.dieX = dieX;
    this.dieY = dieY;
    this.isKilled = false;
}
//Create game's monster
var monster1 = new Monster(50, 50, playround.width - 70, playround.height - 70, 50, 50, playround.width - 70, playround.height - 70, speed, false, true, 0, 0);
monsters.push(monster1);
var monster2 = new Monster(0, 80, playround.width - 70, playround.height - 70, 0, 80, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster2);
var monster3 = new Monster(0, 200, playround.width - 70, playround.height - 70, 0, 200, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster3);
var monster4 = new Monster(80, 220, playround.width - 70, playround.height - 70, 80, 220, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster4);
var monster5 = new Monster(400, 250, playround.width - 70, playround.height - 70, 400, 250, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster5);
var monster6 = new Monster(400, 0, playround.width - 70, playround.height - 70, 400, 0, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster6);
var monster7 = new Monster(0, 180, playround.width - 70, playround.height - 70, 0, 180, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster7);
var monster8 = new Monster(120, 0, playround.width - 70, playround.height - 70, 120, 0, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster8);
var randomPosition = Math.floor(Math.random() * 400 + 1);
var monster9 = new Monster(randomPosition, randomPosition, playround.width - 70, playround.height - 70, randomPosition, randomPosition, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster9);

Monster.prototype.draw = function(startX, startY) {
    playroundContext.drawImage(monsterImage, startX, startY, 80, 80);
}

Monster.prototype.move = function() {

    this.startX += (this.speedX) * level * 0.5;
    this.startY += (this.speedY) * level * 0.5;
    if (this.startX > this.stopX || this.startX < this.positionX) {
        this.speedX *= -1;
    }

    if (this.startY > this.stopY || this.startY < this.positionY) {
        this.speedY *= -1;
    }

    if (score == 0) {
        isLose = true;
    }
    timeLive--;
    if (timeLive <= 0) {
        this.refreshMonster;
        score -= 10;
        isDecrease = true;
        chooseRandom();
    }

}

Monster.prototype.refreshMonster = function() {
    this.startX = this.beginX;
    this.startY = this.beginY;
    /*this.stopX = this.endX;
    this.stopY = this.endY;*/
    this.speedX = this.speedY = speed;
    this.isKilled = false;
    this.show = false;
    if (level == 1) {
        timeLive = 500;
    }
    if (level == 2) {
        timeLive = 400;
    }
    if (level == 3) {
        timeLive = 300;
    }
    if (level == 4) {
        timeLive = 200;
    }
    if (level == 5) {
        timeLive = 100;
    }
}

Monster.prototype.kill = function(positionX, positionY) {
    if ((positionX > this.startX && positionX < this.startX + 30) || (positionY > this.startY && positionY < this.startY + 30)) {
        console.log("Click monster " + checkMonsterPos);
        //this.isKilled = true;
        this.show = false;
        mousePosX = positionX;
        mousePosY = positionY;
        showBlood = true;
        score += 10;
        var temp = parseInt(localStorage.getItem("highScore"));
        if (temp < score) {
            localStorage.setItem("highScore", score);
        }
        changeLevel();
        timeLive -= 50;
    }
}

function addBlood(posX, posY) {
    if (bloodLive > 0) {
        playroundContext.drawImage(bloodImage, posX, posY, 80, 80);
    }
    if (bloodLive == 0) {
        bloodLive = 200;
        showBlood = false;
    }
}

function drawImage() {
    controlContext.clearRect(0, 0, control.width, control.height);
    playroundContext.drawImage(backgroundImage, 0, 0, playround.width, playround.height);
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            monsters[i].draw(monsters[i].startX, monsters[i].startY);
        }
    }

    controlContext.fillStyle = "green";
    controlContext.font = "20px Arial";
    controlContext.fillText("Score: " + score, 10, 20);
    controlContext.fillText("Heart: ", 10, 50);
    controlContext.fillText("Speed: " + speed, 10, 80);
    controlContext.fillText("Random monster: " + monsterRandomNum, 300, 20);
    var amount = 0;
    for (var i = 0; i < hearts; i++) {
        controlContext.drawImage(heartImage, 70 + amount, 35, 20, 20);
        amount += 20;
    }
    controlContext.drawImage(restartImage, 445, 70, 30, 30);
    controlContext.drawImage(pauseImage, 400, 70, 30, 30);
    controlContext.drawImage(stopImage, 350, 70, 30, 30);
    controlContext.drawImage(boomImage, 300, 70, 30, 30);
    controlContext.fillText(boomNum, 310, 68);
    controlContext.fillText(stopNum, 360, 68);
}

function chooseRandom() {
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            monsters[i].refreshMonster();
        }
    }
    for (var i = level; i > 0; i--) {
        var random = Math.floor((Math.random() * 8 + 1));
        monsters[random].show = true;
    }
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function changeLevel() {
    if (score <= 10) {
        hearts = 0;
    } else if (score <= 50) {
        hearts = 1;
    } else if (score <= 100) {
        hearts = 2;
    } else if (score <= 200) {
        hearts = 3;
    } else if (score <= 300) {
        hearts = 4;
    } else if (score <= 600) {
        level = 2;
        speed = 2;
        monsterRandomNum = 2;
        hearts = 5;
    } else if (score <= 900) {
        level = 3;
        speed = 3;
        monsterRandomNum = 3;
        hearts = 6;
    } else if (score <= 1200) {
        level = 4;
        speed = 4;
        monsterRandomNum = 4;
        hearts = 7;
    } else {
        level = 5;
        speed = 5;
        monsterRandomNum = 5;
        hearts = 8;
    }
}

function restart() {
    for (var i = 0; i < monsters.length; i++) {
        monsters[i].show = false;
    }
    score = 40;
    level = 1;
    speed = 1;
    monsterRandomNum = 1;
    boomNum = 3;
    stopNum = 3;
}

function pause() {
    pauseTime--;
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            monsters[i].speedX = 0;
            monsters[i].speedY = 0;
        }
    }

    if (pauseTime == 0) {
        isPause = false;
    }
}

function stop() {
    if (stopNum >= 0) {
        for (var i = 0; i < monsters.length; i++) {
            if (monsters[i].show) {
                monsters[i].speedX = 0;
                monsters[i].speedY = 0;
            }
        }
    }
}

function boom() {
    if (boomNum >= 0) {
        for (var i = 0; i < monsters.length; i++) {
            if (monsters[i].show) {
                monsters[i].show = false;
            }
        }
    }
}
var checkMonsterPos;
playround.addEventListener("click", function(event) {
    isResume = true;
    isStop = false;
    isBoom = false;
    mousePos = getMousePos(playround, event);
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            checkMonsterPos = i;
            monsters[i].kill(mousePos.x, mousePos.y);
        }
    }
});
control.addEventListener("click", function() {
    controlMousePos = getMousePos(control, event);
    if (controlMousePos.x >= 445 && controlMousePos.x <= 475 && controlMousePos.y >= 70 && controlMousePos.y <= 100) {
        isRestart = true;
    }
    if (controlMousePos.x >= 400 && controlMousePos.x <= 430 && controlMousePos.y >= 70 && controlMousePos.y <= 100) {
        isPause = true;
        pauseTime = 300;
    }
    if (controlMousePos.x >= 350 && controlMousePos.x <= 380 && controlMousePos.y >= 70 && controlMousePos.y <= 100) {
        if (stopNum > 0) {
            isStop = true;
            stopNum--;
        } else {
            isStop = false;
            stopNum = 0;
        }
    }
    if (controlMousePos.x >= 300 && controlMousePos.x <= 330 && controlMousePos.y >= 70 && controlMousePos.y <= 100) {
        if (boomNum > 0) {
            isBoom = true;
            boomNum--;
        } else {
            isBoom = false;
            boomNum = 0;
        }
    }
});

function main() {
    drawImage();
    if (isRestart) {
        restart();
        isRestart = false;
    }
    if (isPause) {
        playroundContext.fillStyle = "#FFFFFF";
        playroundContext.font = "40px Arial";
        playroundContext.fillText("Pause!!!", 130, 200);
        pause();
    }
    if (isStop && !isResume) {
        stop();
    }
    if (isBoom) {
        boom();
        isBoom = false;
    }
    if (isLose) {
        playroundContext.fillStyle = "#FFFFFF";
        playroundContext.font = "40px Arial";
        playroundContext.fillText("Game Over!!!", 130, 200);
        playroundContext.fillText("High score = " + localStorage.getItem("highScore"), 130, 280);
        cancelAnimationFrame(main);
    }

    if (!isLose && !isPause && !isStop) {
        var count = 0;
        for (var i = 0; i < monsters.length; i++) {
            if (monsters[i].show) {
                console.log("main: " + i);
                count++;
                monsters[i].move();
            }
        }
        if (count == 0) {
            chooseRandom();
        }
        if (mousePosX != -1 && mousePosY != -1 && showBlood == true) {
            addBlood(mousePosX, mousePosY);
        }
    }

    requestAnimationFrame(main);
}

requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
requestAnimationFrame(main);