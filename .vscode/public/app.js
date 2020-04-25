var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var life;

$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});
//comments
function Start() {
    board = new Array();
	score = 0;
	life = 5;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    board[i][j] = 1;
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
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
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
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
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
            } else if (board[i][j] == 1) { // points
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 4) { //walls
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
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
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score++;
	}
	if (board[shape.i][shape.j] == 3) { // eaten by a monster !!
		score = score - 10 ; //these are the rules.
		var emptyCell = findRandomEmptyCell(board); //new start point for next round.
		board[emptyCell[0]][emptyCell[1]] = 2; //put pacman. 

		////////////////////////////////////////            todo: לצייר באמת מפלצות בפינות הלוחחחח !!
		var numOfMonsters = document.getElementById("numberOfMonsters").value;
		if (numOfMonsters == 1)	
			board[0][0] = 3;
		else if ( numOfMonsters == 2){
			board[0][0] = 3;
			board[9][9] = 3;
		}
		else if ( numOfMonsters == 3){
			board[0][0] = 3;
			board[9][9] = 3;
			board[0][9] = 3;
		}
		else{ //num = 4
			board[0][0] = 3;
			board[9][9] = 3;
			board[0][9] = 3;
			board[9][0] = 3;
		}
	}

    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score == 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}

// shows the choosen page 

function showSettings() {
    document.getElementById("settings").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
}

function showLogin() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
}

function showRegister() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "none";
}

function showWelcome() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("totalGame").style.display = "none";
}

function showGame() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("totalGame").style.display = "block";
    settingsWithGame();
}

function settingsWithGame() {
    document.getElementById("lk").innerText = document.getElementById("left").innerText;
    document.getElementById("rk").innerText = document.getElementById("right").innerText;
    document.getElementById("dk").innerText = document.getElementById("down").innerText;
    document.getElementById("uk").innerText = document.getElementById("up").innerText;
    document.getElementById("numOfBalls").innerHTML = document.getElementById("numberOfBalls").value;
    document.getElementById("5p").innerHTML = document.getElementById("fivePointBallColor").value;
    document.getElementById("5p").style.background = document.getElementById("fivePointBallColor").value;
    document.getElementById("15p").innerHTML = document.getElementById("fifthTeenPointBallColor").value;
    document.getElementById("15p").style.background = document.getElementById("fifthTeenPointBallColor").value;
    document.getElementById("25p").innerHTML = document.getElementById("twentyFivePointBallColor").value;
    document.getElementById("25p").style.background = document.getElementById("twentyFivePointBallColor").value;
    document.getElementById("gameTime").innerHTML = document.getElementById("timeForGame").value;
    document.getElementById("mons").innerHTML = document.getElementById("numberOfMonsters").value;
}
$(document).ready(function() {
    allUsers = new Array;
    var defultUser = { username: "p", password: "p" }
        //var allUsers = [defultUser];
        //allUsers[0] = defultUser;
    allUsers.push(defultUser);
});

//var txtbox1=document.getElementById("txtbox1");
//sessionStorage.setItem("name",txtbox1.value);

//sessionStorage.setItem(getElementById("username"), getElementById("password"));