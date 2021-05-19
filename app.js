const canvas = document.getElementById("main-canvas");
const canvasWrapper = document.querySelector("canvas-wrapper");
const settingsPanel = document.getElementById("settings-panel");
const settingsContainer = document.getElementById("settings");
const thicknessInput = document.getElementById("thickness-input");
const radiusInput = document.getElementById("radius-input");
const expandIcon = document.getElementById("expand-icon");
const delayInput = document.getElementById("delay-input");
const ctx = canvas.getContext("2d");
const colorPicker = new iro.ColorPicker('#color-picker', {
    width: 200,
    color: "#f00"
});
let mouseX;
let mouseY;
let radius = 10;
let thickness = 1;
let delay = 0;

delayInput.value = delay;
thicknessInput.value = thickness;
radiusInput.value = radius;
let settingsOpen = false;

function sleep(ms) {
    if (ms === 0) return;
    return( new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        })
    );
}

const drawCircle = async (x, y) => {
    ctx.fillStyle = colorPicker.color.hexString;
    // for (let angle = 0; angle <= 360; angle++) {
    //     const xPoint = x + Math.cos(angle) * radius;
    //     const yPoint = y + Math.sin(angle) * radius;
    //     ctx.fillRect(xPoint , yPoint, thickness, thickness);
    //     await sleep(delay);
    // }
    const draw = async (angle, ogThickness, ogRadius) => {
        if (angle < 0) return;
        const xPoint = x + Math.cos(angle) * ogRadius;
        const yPoint = y + Math.sin(angle) * ogRadius;
        ctx.fillRect(xPoint , yPoint, ogThickness, ogThickness);
        await sleep(delay);
        draw(angle-1, ogThickness, ogRadius);
    }
    draw(360, thickness, radius);
}
const draw = (e) => {
    if (e.buttons !== 1) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
    drawCircle(mouseX, mouseY);
}
$('#main-canvas').mousemove((e) => {
    draw(e);
});
$('#main-canvas').mousedown((e) => {
    draw(e);
    if (settingsOpen) {
        settingsPanel.classList.add("settings-panel-close");
        settingsPanel.classList.remove("settings-panel-open");
        settingsContainer.style.display = "none";
        expandIcon.style.display = "block";
        settingsOpen = false;
    }
});
$("#settings-panel").mouseenter(e => {
    settingsPanel.classList.remove("settings-panel-close");
    settingsPanel.classList.add("settings-panel-open");
    settingsContainer.style.display = "block";
    expandIcon.style.display = "none";
    settingsOpen = true;
});

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
