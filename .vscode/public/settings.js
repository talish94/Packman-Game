var downKey;
var upKey;
var leftKey;
var rightKey;
//left key choose
function leftFunction() {
    document.addEventListener("keydown", leftChoosen);
    document.getElementById("left").innerText = "choose now key for left move";
    document.getElementById("left").value = "";
}

function leftChoosen(e) {
    leftKey = e.code;
    if (leftKey != e.code && !inputCheck(e)) {
        return;
    }
    document.getElementById("left").innerText = e.code;
    document.getElementById("left").value = e.keyCode;
    document.removeEventListener("keydown", leftChoosen);
}
//right key choose
function rightFunction() {
    document.addEventListener("keydown", rightChoosen);
    document.getElementById("right").innerText = "choose now key for right move";
    document.getElementById("right").value = "";

}

function rightChoosen(e) {
    rightKey = e.code;
    if (rightKey != e.code && !inputCheck(e)) {
        return;
    }
    document.getElementById("right").innerText = e.code;
    document.getElementById("right").value = e.keyCode;
    document.removeEventListener("keydown", rightChoosen);
}
//up key choose
function upFunction() {
    document.addEventListener("keydown", upChoosen);
    document.getElementById("up").innerText = "choose now key for up move";
    document.getElementById("up").value = "";

}

function upChoosen(e) {
    upKey = e.code;
    if (upKey != e.code && !inputCheck(e)) {
        return;
    }
    document.getElementById("up").innerText = e.code;
    document.getElementById("up").value = e.keyCode;
    document.removeEventListener("keydown", upChoosen);
}
//down key choose
function downFunction() {
    document.addEventListener("keydown", downChoosen);
    document.getElementById("down").innerText = "choose now key for down move";
    document.getElementById("down").value = "";

}

function downChoosen(e) {
    downKey = e.code;
    if (downKey != e.code && !inputCheck(e)) {
        return;
    }
    document.getElementById("down").innerText = e.code;
    document.getElementById("down").value = e.keyCode;
    document.removeEventListener("keydown", downChoosen);
}
// this function checks if the user already choose this input.
function inputCheck(e) {
    if (e.code == downKey || e.code == upKey || e.code == leftKey ||
        e.code == rightKey) {
        alert("please choose diffrent key! you have choose this key already");
        return false;
    }
    return true;
}
//#region random settings  
function randomSettings() {
    document.getElementById("left").innerHTML = "ArrowLeft";
    document.getElementById("right").innerHTML = "ArrowRight";
    document.getElementById("up").innerHTML = "ArrowUp";
    document.getElementById("down").innerHTML = "ArrowDown";
    document.getElementById("left").value = 37;
    document.getElementById("right").value = 39;
    document.getElementById("up").value = 38;
    document.getElementById("down").value = 40;
    document.getElementById("numberOfBalls").value = Math.floor(Math.random() * (90 - 50 + 1) + 50);
    document.getElementById("numberOfMonsters").value = Math.floor(Math.random() * 4) + 1;
    document.getElementById("timeForGame").value = Math.floor(Math.random() * (500 - 60 + 1) + 60);
    let color5point = getRandomColor();
    let color15point = getRandomColor();
    while (color15point == color5point) {
        color15point = getRandomColor()
    }
    let color25point = getRandomColor();
    while (color25point == color5point || color25point == color15point) {
        color25point = getRandomColor();
    }
    document.getElementById("fivePointBallColor").value = color5point;
    document.getElementById("fifthTeenPointBallColor").value = color15point;
    document.getElementById("twentyFivePointBallColor").value = color25point;
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//#endregion