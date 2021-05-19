const canvas = document.getElementById("main-canvas");
const canvasWrapper = document.querySelector("canvas-wrapper");
const settingsPanel = document.getElementById("settings-panel");
const settingsContainer = document.getElementById("settings");
const thicknessInput = document.getElementById("thickness-input");
const radiusInput = document.getElementById("radius-input");
const expandIcon = document.getElementById("expand-icon");

const ctx = canvas.getContext("2d");
const colorPicker = new iro.ColorPicker('#color-picker', {
    width: 200,
    color: "#f00"
});
let mouseX;
let mouseY;
let radius = 10;
let thickness = 1;
thicknessInput.value = thickness;
radiusInput.value = radius;
let settingsOpen = false;

const drawCircle = (x, y) => {
    ctx.fillStyle = colorPicker.color.hexString;
    for (let i = 0; i <= 360; i++) {
        const xPoint = x + Math.cos(i) * radius;
        const yPoint = y + Math.sin(i) * radius;
        ctx.fillRect(xPoint , yPoint, thickness, thickness);
    }
}

$('#main-canvas').mousemove((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    drawCircle(mouseX, mouseY);
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
