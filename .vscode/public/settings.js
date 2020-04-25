var downKey;
var upKey;
var leftKey;
var rightKey;
//left key choose
function leftFunction() {
    document.addEventListener("keydown", leftChoosen);
    document.getElementById("left").innerText = "choose now key for left move";
}

function leftChoosen(e) {
    if (leftKey != e.code && !inputCheck(e)) {
        return;
    }
    leftKey = e.code;
    document.getElementById("left").innerText = e.code;
    document.removeEventListener("keydown", leftChoosen);
}
//right key choose
function rightFunction() {
    document.addEventListener("keydown", rightChoosen);
    document.getElementById("right").innerText = "choose now key for right move";
}

function rightChoosen(e) {
    if (rightKey != e.code && !inputCheck(e)) {
        return;
    }
    rightKey = e.code;
    document.getElementById("right").innerText = e.code;
    document.removeEventListener("keydown", rightChoosen);
}
//up key choose
function upFunction() {
    document.addEventListener("keydown", upChoosen);
    document.getElementById("up").innerText = "choose now key for up move";
}

function upChoosen(e) {
    if (upKey != e.code && !inputCheck(e)) {
        return;
    }
    upKey = e.code;
    document.getElementById("up").innerText = e.code;
    document.removeEventListener("keydown", upChoosen);
}
//down key choose
function downFunction() {
    document.addEventListener("keydown", downChoosen);
    document.getElementById("down").innerText = "choose now key for down move";
}

function downChoosen(e) {
    if (downKey != e.code && !inputCheck(e)) {
        return;
    }
    downKey = e.code;
    document.getElementById("down").innerText = e.code;
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
    document.getElementById("numberOfBalls").value = Math.floor(Math.random() * 50) + 1;
    document.getElementById("numberOfMonsters").value = Math.floor(Math.random() * 4) + 1;
    document.getElementById("timeForGame").value = Math.floor(Math.random() * 1000) + 60;
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