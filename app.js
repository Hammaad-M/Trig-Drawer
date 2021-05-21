const canvas = document.getElementById("main-canvas");
const canvasWrapper = document.querySelector(".canvas-wrapper");
const settingsPanel = document.getElementById("settings-panel");
const settingsContainer = document.getElementById("settings");
const thicknessInput = document.getElementById("thickness-input");
const radiusInput = document.getElementById("radius-input");
const expandIcon = document.getElementById("expand-icon");
const delayInput = document.getElementById("delay-input");
const ctx = canvas.getContext("2d");
const colorPicker = new iro.ColorPicker('#color-picker', {
    width: 200,
    color: "#75ffa8"
});
let mouseX;
let mouseY;
let radius = 100;
let thickness = 1;
let delay = 10;
let saveDelay = delay;
let canvasCleared = false;
let settingsOpen = true;
delayInput.value = delay;
thicknessInput.value = thickness;
radiusInput.value = radius;

function sleep(ms) {
    if (ms === 0) return;
    return( new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        })
    );
}

const createCircle = async (x, y, weight, r, color, angle=360) => {
    if (angle < 0 || canvasCleared) return;
    const xPoint = x + Math.cos(angle * (Math.PI/180)) * r;
    const yPoint = y + Math.sin(angle * (Math.PI/180)) * r;
    if (ctx.fillStyle !== color) {
        let temp = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.fillRect(xPoint , yPoint, weight, weight);
        ctx.fillStyle = temp;
    } else {
        ctx.fillRect(xPoint , yPoint, weight, weight);
    }
    await sleep(delay);
    createCircle(x, y, weight, r, color, angle-1);
}

const draw = (e) => {
    if (e.buttons !== 1 || settingsOpen) return;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    createCircle(
        mouseX, 
        mouseY, 
        thickness, 
        radius, 
        colorPicker.color.hexString
    );
}

$('#main-canvas').mousemove((e) => {
    draw(e);
});
$('#main-canvas').mousedown((e) => {
    canvasCleared = false;
    draw(e);
    if (settingsOpen) {
        settingsPanel.classList.add("settings-panel-close");
        settingsPanel.classList.remove("settings-panel-open");
        settingsContainer.style.display = "none";
        expandIcon.style.display = "block";
        settingsOpen = false;
    }
});
$("#settings-panel").mouseenter(() => {
    if (!mouseDown) {
        settingsPanel.classList.remove("settings-panel-close");
        settingsPanel.classList.add("settings-panel-open");
        settingsContainer.style.display = "block";
        expandIcon.style.display = "none";
        settingsOpen = true;
    }
});
$("#color-picker").mouseup(() => {
    $(".slider").css({
        "background-color": colorPicker.color.hexString
    });
});
$(window).mousedown(() => mouseDown = true);
$(window).mouseup(() => mouseDown = false);

window.addEventListener("resize", resize);

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
function updateThickness() {
    thickness = parseInt(thicknessInput.value);
}
function updateRadius() {
    radius = parseInt(radiusInput.value);
}
function updateDelay() {
    delay = parseInt(delayInput.value);
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCleared = true;
}