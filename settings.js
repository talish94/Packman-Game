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