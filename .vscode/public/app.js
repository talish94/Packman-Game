var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var life;
var numberOfBalls_value;
var five_point_color_value;
var fifth_teen_point_color_value;
var twenty_five_point_color_value;
var game_time_value;
var number_of_monsters_value;
var left_value;
var right_value;
var up_value;
var down_value;
var musicInterval;
var audio = new Audio('pacman_beginning.mp3');
var gameIsOnInterval;
var pacDirection;
var audioFail = new Audio('Cut_fail.mp3');
var monstersInterval;
var clock_X;
var clock_Y;
var monsterRED_X;
var monsterRED_Y;
var monsterGREEN_X;
var monsterGREEN_Y;
var monsterYELLOW_X;
var monsterYELLOW_Y;
var monsterBLUE_X;
var monsterBLUE_Y;
var specialBall = new Object();
var specialBallInterval;
var eatCandy;
var specialTemp = new Object();
var counterSteps = 0;


function Start() {
    board = new Array();
    monsters = new Array();
    life = 5;
    score = 0;
    pac_color = "yellow";
    pacDirection = 4; //right - default.
    startMonstersFromEnds();
    specialBall.i = 11;
    specialBall.j = 0;
    specialTemp.i = specialBall.i;
    specialTemp.j = specialBall.j;
    eatCandy = false;
    var cnt = 144;
    var food_remain = numberOfBalls_value;
    let five_remain = food_remain * 0.6;
    let fifthTeen_remain = food_remain * 0.3;
    let twentyFive_remain = food_remain * 0.1;
    document.getElementById("menu").addEventListener("click", stopMusic);
    var pacman_remain = 1;
    start_time = new Date();
    gameIsOnInterval = setInterval(finishGame, parseInt(game_time_value) * 1000);

    for (var i = 0; i < 12; i++) {
        board[i] = new Array();
        monsters[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 12; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2) ||
                (i == 1 && j == 0) ||
                (i == 2 && j == 0) ||
                (i == 2 && j == 1) ||
                (i == 3 && j == 1) ||
                (i == 3 && j == 2) ||
                (i == 4 && j == 5) ||
                (i == 5 && j == 5) ||
                (i == 6 && j == 5) ||
                (i == 6 && j == 6) ||
                (i == 6 && j == 7) ||
                (i == 0 && j == 6) ||
                (i == 0 && j == 7) ||
                (i == 0 && j == 8) ||
                (i == 8 && j == 9) ||
                (i == 9 && j == 9) ||
                (i == 9 && j == 8) ||
                (i == 11 && j == 3) ||
                (i == 11 && j == 4) ||
                (i == 11 && j == 5) ||
                (i == 11 && j == 6) ||
                (i == 11 && j == 7)

            ) {
                board[i][j] = 4;
            } else {
                if ((i == 0 && j == 0) || (i == 11 && j == 11) || i == 0 && j == 11 || i == 11 && j == 0) {
                    board[i][j] = 0;
                } else {
                    var randomNum = Math.random();
                    if (randomNum <= (1.0 * food_remain) / cnt) {
                        var rand = Math.floor(Math.random() * 3);
                        if (rand == 0) {
                            if (five_remain > 0) {
                                board[i][j] = 1;
                                five_remain--;
                            }
                        } else if (rand == 1) {
                            if (fifthTeen_remain > 0) {
                                board[i][j] = 5;
                                fifthTeen_remain--;
                            }
                        } else if (rand == 2) {
                            if (twentyFive_remain > 0) {
                                board[i][j] = 6;
                                twentyFive_remain--;
                            }
                        }
                        if (typeof board[i][j] == 'undefined') {
                            board[i][j] = 0;
                        } else {
                            food_remain--;
                        }
                    } else if (i != 0 && randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                    } else {
                        board[i][j] = 0;
                    }
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        if (five_remain > 0) {
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_remain--;
            five_remain--;
        } else if (fifthTeen_remain > 0) {
            board[emptyCell[0]][emptyCell[1]] = 5;
            food_remain--;
            fifthTeen_remain--;
        } else if (twentyFive_remain > 0) {
            board[emptyCell[0]][emptyCell[1]] = 6;
            food_remain--;
            twentyFive_remain--;
        }

    }
    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 90);
    startMusic();
    musicInterval = setInterval(startMusic, 60000);
    // monstersInterval = setInterval(moveMonsters, 700);

    monstersInterval = setInterval(moveMonsters2, 700);

    specialBallInterval = setInterval(moveSpeicalBall, 700);
    var clockPlace = findRandomEmptyCell(board);
    board[clockPlace[0]][clockPlace[1]] = 8;
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 11 + 1);
    var j = Math.floor(Math.random() * 11 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 11 + 1);
        j = Math.floor(Math.random() * 11 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[up_value]) {
        pacDirection = 1;
        return 1;
    }
    if (keysDown[down_value]) {
        pacDirection = 2;
        return 2;
    }
    if (keysDown[left_value]) {
        pacDirection = 3;
        return 3;
    }
    if (keysDown[right_value]) {
        pacDirection = 4;
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLife.value = life;
    gameTime.value = game_time_value;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) { //pacman
                context = canvas.getContext('2d');
                var pacImageR = new Image();
                var pacImageL = new Image();
                var pacImageU = new Image();
                var pacImageD = new Image();
                //checks what was the last move's direction. adds the correct image
                if (pacDirection == 4) {
                    pacImageR.src = 'pacmanR.jpg';
                    context.drawImage(pacImageR, center.x - 23, center.y - 20, 45, 45);
                } else if (pacDirection == 3) {
                    pacImageL.src = 'pacmanL.jpg';
                    context.drawImage(pacImageL, center.x - 23, center.y - 20, 45, 45);
                } else if (pacDirection == 1) {
                    pacImageU.src = 'pacmanU.jpg';
                    context.drawImage(pacImageU, center.x - 23, center.y - 20, 45, 45);
                } else if (pacDirection == 2) {
                    pacImageD.src = 'pacmanD.jpg';
                    context.drawImage(pacImageD, center.x - 23, center.y - 20, 45, 45);
                }
            } else if (board[i][j] == 4) { //walls
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[i][j] == 1) { // 5 points balls
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = five_point_color_value; //color 
                context.fill();
            } else if (board[i][j] == 5) { // 15 points balls
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = fifth_teen_point_color_value; //color 
                context.fill();
            } else if (board[i][j] == 6) { // 25 points balls
                context.beginPath();
                context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
                context.fillStyle = twenty_five_point_color_value; //color
                context.fill();
            } else if (board[i][j] == 8) { // a clock
                var clockImg = new Image();
                clockImg.src = 'clock.png';
                context.drawImage(clockImg, i * 60 + 7, j * 60 + 10, 40, 45);
            }
            if (!eatCandy) {
                var candy50 = new Image();
                candy50.src = 'candy50.png';
                context.drawImage(candy50, specialBall.i * 60 + 7, specialBall.j * 60 + 10, 45, 45);
            }
        }
    }

    //draws all monsters in the game:
    context = canvas.getContext('2d');
    if (monsterRED_X != -1) { //means this monster exists in the game.
        var monsterRED = new Image();
        monsterRED.src = 'monsterRED.jpg';
        context.drawImage(monsterRED, monsterRED_X * 60 + 7, monsterRED_Y * 60 + 10, 45, 45);
    }
    if (monsterBLUE_X != -1) {
        var monsterBLUE = new Image();
        monsterBLUE.src = 'monsterBLUE.jpg';
        context.drawImage(monsterBLUE, monsterBLUE_X * 60 + 7, monsterBLUE_Y * 60 + 10, 45, 45);
    }
    if (monsterGREEN_X != -1) {
        var monsterGREEN = new Image();
        monsterGREEN.src = 'monsterGREEN.jpg';
        context.drawImage(monsterGREEN, monsterGREEN_X * 60 + 7, monsterGREEN_Y * 60 + 10, 45, 45);
    }
    if (monsterYELLOW_X != -1) {
        var monsterYELLOW = new Image();
        monsterYELLOW.src = 'monsterYELLOW.jpg';
        context.drawImage(monsterYELLOW, monsterYELLOW_X * 60 + 7, monsterYELLOW_Y * 60 + 10, 45, 45);
    }
    if (!isAnyCandyLeft()) {
        finishGame();
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score = score + 5;
    } else if (board[shape.i][shape.j] == 5) {
        score = score + 15;
    } else if (board[shape.i][shape.j] == 6) {
        score = score + 25;
    } else if (shape.i == specialBall.i && shape.j == specialBall.j) {
        specialBall.i = -1;
        specialBall.j = -1;
        score = score + 50;
        window.clearInterval(specialBallInterval);
        eatCandy = true;
    } else if (board[shape.i][shape.j] == 8) {
        game_time_value = parseInt(game_time_value) + 40; //adds bonus time
        document.getElementById("gameTime").innerHTML = game_time_value; //update the table display also.
        board[shape.i][shape.j] == 0; // there is no clock any longer.
        window.clearInterval(gameIsOnInterval);
        let realTimeIs = new Date();
        let passedTime = (realTimeIs - start_time) / 1000; // seconds
        let leftTimeToPlay = (game_time_value - passedTime) * 1000;
        gameIsOnInterval = setInterval(finishGame, parseInt(leftTimeToPlay));
        Draw();
    } else if (shape.i == monsterRED_X && shape.j == monsterRED_Y) { //got eaten by a monster
        startNewRound();
        Draw();
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    // losing, still have more time to play,and more candies to eat, but life is over. 
    if (life == 0) {
        window.clearInterval(interval);
        window.clearInterval(gameIsOnInterval);
        window.clearInterval(specialBallInterval);
        window.clearInterval(monstersInterval);
        stopMusic();
        window.alert("Loser!");
        document.getElementById("newGame").style.display = "block";
    } else {
        Draw();
    }
}

function isAnyCandyLeft() {
    if (!eatCandy) {
        return true;
    }
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            if (board[i][j] == 1 || board[i][j] == 5 || board[i][j] == 6) {
                return true;
            }
        }
    }
    return false;
}

function finishGame() {
    window.clearInterval(interval);
    window.clearInterval(gameIsOnInterval);
    window.clearInterval(specialBallInterval);
    window.clearInterval(monstersInterval);
    stopMusic();
    if (score < 100) {
        window.alert("You are better than " + score + " points!")
    } else {
        window.alert("Winner!!!")
    }
    document.getElementById("newGame").style.display = "block";
}
// shows the choosen page 
function showSettings() {
    document.getElementById("settings").style.display = "block";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
    document.getElementById("numberOfBalls").value = 50;
    document.getElementById("fivePointBallColor").value = "#0000FF";
    document.getElementById("fifthTeenPointBallColor").value = "#40E0D0";
    document.getElementById("twentyFivePointBallColor").value = "#ff0080";
    document.getElementById("timeForGame").value = 60;
    document.getElementById("numberOfMonsters").value = 1;
    document.getElementById("left").value = "";
    document.getElementById("right").value = "";
    document.getElementById("up").value = "";
    document.getElementById("down").value = "";
    document.getElementById("left").innerText = "Choose Left Key";
    document.getElementById("right").innerText = "Choose Right Key";
    document.getElementById("down").innerText = "Choose Down Key";
    document.getElementById("up").innerText = "Choose Up Key";
}

function showLogin() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
}

function showRegister() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
}

function showWelcome() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("totalGame").style.display = "none";
}

function showGame() {
    document.getElementById("newGame").style.display = "none";
    numberOfBalls_value = document.getElementById("numberOfBalls").value;
    five_point_color_value = document.getElementById("fivePointBallColor").value;
    fifth_teen_point_color_value = document.getElementById("fifthTeenPointBallColor").value;
    twenty_five_point_color_value = document.getElementById("twentyFivePointBallColor").value;
    game_time_value = document.getElementById("timeForGame").value;
    number_of_monsters_value = document.getElementById("numberOfMonsters").value;
    left_value = document.getElementById("left").value;
    right_value = document.getElementById("right").value;
    up_value = document.getElementById("up").value;
    down_value = document.getElementById("down").value;
    document.getElementById("userNameWithGame").innerText = document.getElementById("usernameLogin").value;
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if ([parseInt(document.getElementById("left").value), parseInt(document.getElementById("right").value),
                parseInt(document.getElementById("up").value), parseInt(document.getElementById("down").value)
            ].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    if (!inputsAreValid()) {
        return;
    }
    document.getElementById("settings").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "block";
    document.getElementById("totalGame").style.textAlign = "center";

    settingsWithGame();
    context = canvas.getContext("2d");
    Start();
}

function settingsWithGame() {
    document.getElementById("lk").innerText = document.getElementById("left").innerText;
    document.getElementById("rk").innerText = document.getElementById("right").innerText;
    document.getElementById("dk").innerText = document.getElementById("down").innerText;
    document.getElementById("uk").innerText = document.getElementById("up").innerText;
    document.getElementById("numOfBalls").innerHTML = numberOfBalls_value;
    document.getElementById("5p").innerHTML = five_point_color_value;
    document.getElementById("5p").style.background = five_point_color_value;
    document.getElementById("15p").innerHTML = fifth_teen_point_color_value;
    document.getElementById("15p").style.background = fifth_teen_point_color_value;
    document.getElementById("25p").innerHTML = twenty_five_point_color_value;
    document.getElementById("25p").style.background = twenty_five_point_color_value;
    document.getElementById("gameTime").innerHTML = game_time_value;
    document.getElementById("mons").innerHTML = number_of_monsters_value;
}
$(document).ready(function() {
    allUsers = new Array;
    var defultUser = { username: "p", password: "p" }
    allUsers.push(defultUser);
});

function inputsAreValid() {
    if (numberOfBalls_value < 50 || numberOfBalls_value > 90) {
        window.alert("number of balls are invalid, please insert number of balls between 50 to 90");
        return false;
    }
    if (five_point_color_value == fifth_teen_point_color_value ||
        five_point_color_value == twenty_five_point_color_value ||
        twenty_five_point_color_value == fifth_teen_point_color_value) {
        window.alert("colors are invalid, please insert difftent colors");
        return false;
    }
    if (game_time_value < 60) {
        window.alert("time is invalid, please insert time about 60 seconds");
        return false;
    }

    if (number_of_monsters_value < 1 || number_of_monsters_value > 4) {
        window.alert("number of monsters invalid, please insert number btween 1 to 4");
        return false;
    }
    if (left_value == "") {
        window.alert("please insert all the keys for playing!")
        return false;
    }
    if (right_value == "") {
        window.alert("please insert all the keys for playing!")
        return false;
    }
    if (up_value == "") {
        window.alert("please insert all the keys for playing!")
        return false;
    }
    if (down_value == "") {
        window.alert("please insert all the keys for playing!")
        return false;
    }
    return true;
}

function startMusic() {
    audio = new Audio('pacman_beginning.mp3');
    audio.play();
}


function stopMusic() {
    window.clearInterval(musicInterval);
    audio.pause();
}

function moveMonsters() { //only update their locations.
    if (pacDirection == 1) { //up
        if ((monsterRED_X != -1) && (monsterRED_Y - 1 >= 0) && (board[monsterRED_X][monsterRED_Y - 1] != 4)) // not a wall.
            monsterRED_Y--;
        if ((monsterYELLOW_X != -1) && (monsterYELLOW_Y - 1 >= 0) && (board[monsterYELLOW_X][monsterYELLOW_Y - 1] != 4)) // not a wall.
            monsterYELLOW_Y--;
        if ((monsterBLUE_X != -1) && (monsterBLUE_Y - 1 >= 0) && (board[monsterBLUE_X][monsterBLUE_Y - 1] != 4)) // not a wall.
            monsterBLUE_Y--;
        if ((monsterGREEN_X != -1) && (monsterGREEN_Y - 1 >= 0) && (board[monsterGREEN_X][monsterGREEN_Y - 1] != 4)) // not a wall.
            monsterGREEN_Y--;

    } else if (pacDirection == 2) { //down
        if ((monsterRED_X != -1) && (monsterRED_Y + 1 < 12) && (board[monsterRED_X][monsterRED_Y + 1] != 4)) // not a wall.
            monsterRED_Y++;
        if ((monsterYELLOW_X != -1) && (monsterYELLOW_Y + 1 < 12) && (board[monsterYELLOW_X][monsterYELLOW_Y + 1] != 4)) // not a wall.
            monsterYELLOW_Y++;
        if ((monsterBLUE_X != -1) && (monsterBLUE_Y + 1 < 12) && (board[monsterBLUE_X][monsterBLUE_Y + 1] != 4)) // not a wall.
            monsterBLUE_Y++;
        if ((monsterGREEN_X != -1) && (monsterGREEN_Y + 1 < 12) && (board[monsterGREEN_X][monsterGREEN_Y + 1] != 4)) // not a wall.
            monsterGREEN_Y++;


    } else if (pacDirection == 3) { //left
        if ((monsterRED_X != -1) && (monsterRED_X - 1 >= 0) && (board[monsterRED_X - 1][monsterRED_Y] != 4)) // not a wall.
            monsterRED_X--;
        if ((monsterYELLOW_X != -1) && (monsterYELLOW_X - 1 >= 0) && (board[monsterYELLOW_X - 1][monsterYELLOW_Y] != 4)) // not a wall.
            monsterYELLOW_X--;
        if ((monsterBLUE_X != -1) && (monsterBLUE_X - 1 >= 0) && (board[monsterBLUE_X - 1][monsterBLUE_Y] != 4)) // not a wall.
            monsterBLUE_X--;
        if ((monsterGREEN_X != -1) && (monsterGREEN_X - 1 >= 0) && (board[monsterGREEN_X - 1][monsterGREEN_Y] != 4)) // not a wall.
            monsterGREEN_X--;

    } else if (pacDirection == 4) { //right
        if ((monsterRED_X != -1) && (monsterRED_X + 1 < 12) && (board[monsterRED_X + 1][monsterRED_Y] != 4)) // not a wall.
            monsterRED_X++;
        if ((monsterYELLOW_X != -1) && (monsterYELLOW_X + 1 < 12) && (board[monsterYELLOW_X + 1][monsterYELLOW_Y] != 4)) // not a wall.
            monsterYELLOW_X++;
        if ((monsterBLUE_X != -1) && (monsterBLUE_X + 1 < 12) && (board[monsterBLUE_X + 1][monsterBLUE_Y] != 4)) // not a wall.
            monsterBLUE_X++;
        if ((monsterGREEN_X != -1) && (monsterGREEN_X + 1 < 12) && (board[monsterGREEN_X + 1][monsterGREEN_Y] != 4)) // not a wall.
            monsterGREEN_X++;

    }

    if (((monsterRED_X != -1) && (board[monsterRED_X][monsterRED_Y] == 2)) ||
        ((monsterGREEN_X != -1) && (board[monsterGREEN_X][monsterGREEN_Y] == 2)) ||
        ((monsterBLUE_X != -1) && (board[monsterBLUE_X][monsterBLUE_Y] == 2)) ||
        ((monsterYELLOW_X != -1) && (board[monsterYELLOW_X][monsterYELLOW_Y] == 2))) { //its a pacman
        startNewRound();
        pacmanFailMusic();
        Draw();
    }
}


function startNewRound() {
    board[shape.i][shape.j] = 0;
    score = score - 10; //these are the rules.
    life--;
    var emptyCell = findRandomEmptyCell(board); //new start point for the next round.
    board[emptyCell[0]][emptyCell[1]] = 2; //put pacman. 
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    startMonstersFromEnds();
    Draw();
}

function startMonstersFromEnds() { //by number of monsters chosen.
    if (number_of_monsters_value >= 1) {
        monsterRED_X = 0;
        monsterRED_Y = 0;

        monsterGREEN_X = -1; //not in the game;
        monsterGREEN_Y = -1;
        monsterYELLOW_X = -1;
        monsterYELLOW_Y = -1;
        monsterBLUE_X = -1;
        monsterBLUE_Y = -1;

    }
    if (number_of_monsters_value >= 2) {
        monsterGREEN_X = 11;
        monsterGREEN_Y = 11;

    }
    if (number_of_monsters_value >= 3) {
        monsterYELLOW_X = 0;
        monsterYELLOW_Y = 11;

    }
    if (number_of_monsters_value == 4) {
        monsterBLUE_X = 10;
        monsterBLUE_Y = 0;
    }
}

function pacmanFailMusic() {
    audioFail = new Audio('Cut_fail.mp3');
    audioFail.play();
}

function moveSpeicalBall() {
    if (counterSteps == 3) {
        counterSteps = 0;
        specialTemp.i = specialBall.i;
        specialTemp.j = specialBall.j;
    } else if ((specialTemp.i - 1 == specialBall.i) && (specialTemp.j == specialBall.j)) { // last move was left
        if (specialBall.i > 0 && board[specialBall.i - 1][specialBall.j] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.i--;
            counterSteps++;
        } else {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
        }
    } else if (specialTemp.i + 1 == specialBall.i && specialTemp.j == specialBall.j) { // last move was right
        if (specialBall.i < 11 && board[specialBall.i + 1][specialBall.j] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.i++;
            counterSteps++;
        } else {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
        }
    } else if (specialTemp.i == specialBall.i && specialTemp.j - 1 == specialBall.j) { // last move was up
        if (specialBall.j > 0 && board[specialBall.i][specialBall.j - 1] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.j--;
            counterSteps++;
        } else {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
        }
    } else if (specialTemp.i == specialBall.i && specialTemp.j + 1 == specialBall.j) { // last move was down
        if (specialBall.j < 11 && board[specialBall.i][specialBall.j + 1] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.j++;
            counterSteps++;
        } else {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
        }
    }
    if (specialBall.i == specialTemp.i && specialTemp.j == specialBall.j) { // if after all the candy didnt move
        moveRandomSpeicalBall();
    }
}

function moveRandomSpeicalBall() {
    let randomNumber = Math.floor(Math.random() * 1000);
    if (randomNumber <= 250) {
        if (specialBall.j > 0 && board[specialBall.i][specialBall.j - 1] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.j--;
        }
    } else if (randomNumber > 250 && randomNumber <= 500) {
        if (specialBall.j < 11 && board[specialBall.i][specialBall.j + 1] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.j++;
        }
    } else if (randomNumber > 500 && randomNumber <= 750) {
        if (specialBall.i > 0 && board[specialBall.i - 1][specialBall.j] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.i--;
        }
    } else if (randomNumber > 750) {
        if (specialBall.i < 11 && board[specialBall.i + 1][specialBall.j] != 4) {
            specialTemp.i = specialBall.i;
            specialTemp.j = specialBall.j;
            specialBall.i++;
        }
    }
    if (specialBall.i == specialTemp.i && specialTemp.j == specialBall.j) { // if after all the candy didnt move
        moveSpeicalBall();
    }
}

function moveMonsters2() {
    var r = Math.floor(Math.random() * 10);
    if (r < 7) {
        hardMove();
    } else {
        moveMonsters();
    }
    if (((monsterRED_X != -1) && (board[monsterRED_X][monsterRED_Y] == 2)) ||
        ((monsterGREEN_X != -1) && (board[monsterGREEN_X][monsterGREEN_Y] == 2)) ||
        ((monsterBLUE_X != -1) && (board[monsterBLUE_X][monsterBLUE_Y] == 2)) ||
        ((monsterYELLOW_X != -1) && (board[monsterYELLOW_X][monsterYELLOW_Y] == 2))) { //its a pacman
        pacmanFailMusic();
        startNewRound();
        Draw();
    }
}

function hardMove() {
    let d1 = 0,
        d2 = 0,
        d3 = 0,
        d4 = 0;
    if (monsterRED_X != -1) { // the red monster exist
        if ((monsterRED_Y - 1 >= 0) && (board[monsterRED_X][monsterRED_Y - 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterRED_X);
            let y = parseInt(shape.j) - parseInt(monsterRED_Y) - 1;
            d1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterRED_Y + 1 < 12) && (board[monsterRED_X][monsterRED_Y + 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterRED_X);
            let y = parseInt(shape.j) - parseInt(monsterRED_Y) + 1;
            d2 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterRED_X - 1 >= 0) && (board[monsterRED_X - 1][monsterRED_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterRED_X) - 1;
            let y = parseInt(shape.j) - parseInt(monsterRED_Y);
            d3 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterRED_X + 1 < 12) && (board[monsterRED_X + 1][monsterRED_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterRED_X) + 1;
            let y = parseInt(shape.j) - parseInt(monsterRED_Y);
            d4 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if (Math.max(d1, d2, d3, d4) == d1) {
            monsterRED_Y--;
        } else if (Math.max(d1, d2, d3, d4) == d2) {
            monsterRED_Y++;
        } else if (Math.max(d1, d2, d3, d4) == d3) {
            monsterRED_X--;
        } else if (Math.max(d1, d2, d3, d4) == d4) {
            monsterRED_X++;
        }
    }

    d1 = 0, d2 = 0, d3 = 0, d4 = 0;

    if (monsterYELLOW_X != -1) { // the yellow monster exist
        if ((monsterYELLOW_Y - 1 >= 0) && (board[monsterYELLOW_X][monsterYELLOW_Y - 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterYELLOW_X);
            let y = parseInt(shape.j) - parseInt(monsterYELLOW_Y) - 1;
            d1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterYELLOW_Y + 1 < 12) && (board[monsterYELLOW_X][monsterYELLOW_Y + 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterYELLOW_X);
            let y = parseInt(shape.j) - parseInt(monsterYELLOW_Y) + 1;
            d2 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterYELLOW_X - 1 >= 0) && (board[monsterYELLOW_X - 1][monsterYELLOW_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterYELLOW_X) - 1;
            let y = parseInt(shape.j) - parseInt(monsterYELLOW_Y);
            d3 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterYELLOW_X + 1 < 12) && (board[monsterYELLOW_X + 1][monsterYELLOW_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterYELLOW_X) + 1;
            let y = parseInt(shape.j) - parseInt(monsterYELLOW_Y);
            d4 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if (Math.max(d1, d2, d3, d4) == d1) {
            monsterYELLOW_Y--;
        } else if (Math.max(d1, d2, d3, d4) == d2) {
            monsterYELLOW_Y++;
        } else if (Math.max(d1, d2, d3, d4) == d3) {
            monsterYELLOW_X--;
        } else if (Math.max(d1, d2, d3, d4) == d4) {
            monsterYELLOW_X++;
        }
    }
    d1 = 0, d2 = 0, d3 = 0, d4 = 0;


    if (monsterBLUE_X != -1) { // the blue monster exist
        if ((monsterBLUE_Y - 1 >= 0) && (board[monsterBLUE_X][monsterBLUE_Y - 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterBLUE_X);
            let y = parseInt(shape.j) - parseInt(monsterBLUE_Y) - 1;
            d1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterBLUE_Y + 1 < 12) && (board[monsterBLUE_X][monsterBLUE_Y + 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterBLUE_X);
            let y = parseInt(shape.j) - parseInt(monsterBLUE_Y) + 1;
            d2 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterBLUE_X - 1 >= 0) && (board[monsterBLUE_X - 1][monsterBLUE_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterBLUE_X) - 1;
            let y = parseInt(shape.j) - parseInt(monsterBLUE_Y);
            d3 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterBLUE_X + 1 < 12) && (board[monsterBLUE_X + 1][monsterBLUE_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterBLUE_X) + 1;
            let y = parseInt(shape.j) - parseInt(monsterBLUE_Y);
            d4 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if (Math.max(d1, d2, d3, d4) == d1) {
            monsterBLUE_Y--;
        } else if (Math.max(d1, d2, d3, d4) == d2) {
            monsterBLUE_Y++;
        } else if (Math.max(d1, d2, d3, d4) == d3) {
            monsterBLUE_X--;
        } else if (Math.max(d1, d2, d3, d4) == d4) {
            monsterBLUE_X++;
        }
    }
    d1 = 0, d2 = 0, d3 = 0, d4 = 0;

    if (monsterGREEN_X != -1) { // the green monster exist
        if ((monsterGREEN_Y - 1 >= 0) && (board[monsterGREEN_X][monsterGREEN_Y - 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterGREEN_X);
            let y = parseInt(shape.j) - parseInt(monsterGREEN_Y) - 1;
            d1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterGREEN_Y + 1 < 12) && (board[monsterGREEN_X][monsterGREEN_Y + 1] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterGREEN_X);
            let y = parseInt(shape.j) - parseInt(monsterGREEN_Y) + 1;
            d2 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterGREEN_X - 1 >= 0) && (board[monsterGREEN_X - 1][monsterGREEN_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterGREEN_X) - 1;
            let y = parseInt(shape.j) - parseInt(monsterGREEN_Y);
            d3 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if ((monsterGREEN_X + 1 < 12) && (board[monsterGREEN_X + 1][monsterGREEN_Y] != 4)) {
            let x = parseInt(shape.i) - parseInt(monsterGREEN_X) + 1;
            let y = parseInt(shape.j) - parseInt(monsterGREEN_Y);
            d4 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        if (Math.max(d1, d2, d3, d4) == d1) {
            monsterGREEN_Y--;
        } else if (Math.max(d1, d2, d3, d4) == d2) {
            monsterGREEN_Y++;
        } else if (Math.max(d1, d2, d3, d4) == d3) {
            monsterGREEN_X--;
        } else if (Math.max(d1, d2, d3, d4) == d4) {
            monsterGREEN_X++;
        }
    }

}