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

//comments
function Start() {
    board = new Array();
    score = 0;
    life = document.getElementById("lblLife");
    pac_color = "yellow";
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
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 12; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2) ||
                (i == 0 && j == 0) ||
                (i == 1 && j == 0) ||
                (i == 2 && j == 0) ||
                (i == 2 && j == 1) ||
                (i == 3 && j == 1) ||
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
                (i == 0 && j == 11) ||
                (i == 11 && j == 3) ||
                (i == 11 && j == 4) ||
                (i == 11 && j == 5) ||
                (i == 11 && j == 6) ||
                (i == 11 && j == 7)

            ) {
                board[i][j] = 4;
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
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
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
    interval = setInterval(UpdatePosition, 250);
    startMusic();
    musicInterval = setInterval(startMusic, 60000);
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
        return 1;
    }
    if (keysDown[down_value]) {
        return 2;
    }
    if (keysDown[left_value]) {
        return 3;
    }
    if (keysDown[right_value]) {
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) { //pacman
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle //eye
                context.fillStyle = "black"; //color
                context.fill();
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
            }
        }
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
    }
    if (board[shape.i][shape.j] == 3) { // eaten by a monster !!
        score = score - 10; //these are the rules.
        var emptyCell = findRandomEmptyCell(board); //new start point for next round.
        board[emptyCell[0]][emptyCell[1]] = 2; //put pacman. 

        ////////////////////////////////////////            todo: לצייר באמת מפלצות בפינות הלוחחחח !!
        var numOfMonsters = number_of_monsters_value;
        if (numOfMonsters == 1)
            board[0][0] = 3;
        else if (numOfMonsters == 2) {
            board[0][0] = 3;
            board[9][9] = 3;
        } else if (numOfMonsters == 3) {
            board[0][0] = 3;
            board[9][9] = 3;
            board[0][9] = 3;
        } else { //num = 4
            board[0][0] = 3;
            board[9][9] = 3;
            board[0][9] = 3;
            board[9][0] = 3;
        }
    }

    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    // if (score >= 20 && time_elapsed <= 10) {
    //     pac_color = "green";
    // }
    let winningScore = numberOfBalls_value * 0.6 * 5 + numberOfBalls_value * 0.3 * 15 + numberOfBalls_value * 0.1 * 25;
    if (score == winningScore) {
        window.clearInterval(interval);
        window.alert("Game completed");
        stopMusic();
        document.getElementById("newGame").style.display = "block";
    } else if (life == 0) {
        window.clearInterval(interval);
        window.alert("Loser!");
        stopMusic();
        document.getElementById("newGame").style.display = "block";
        //finishGame();
    } else {
        Draw();
    }
}

function finishGame() {
    window.clearInterval(interval);
    window.clearInterval(gameIsOnInterval);
    if (score < 100) {
        window.alert("You are better than " + score + " points!")
    } else {
        window.alert("Winner!!!")
    }
    stopMusic();
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
        //var allUsers = [defultUser];
        //allUsers[0] = defultUser;
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