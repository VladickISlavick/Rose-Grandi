let cns;
let ctx;
let width;
let height;
let centerX;
let centerY;
let n;
let d;
let scale;
let thetaLine;
let theta;
let oldD;

function init() {
    cns = document.getElementById('canvas');
    ctx = cns.getContext('2d');
    width = 500;
    height = 500;
    centerX = width / 2;
    centerY = height / 2;
    radiusX = width / 3;
    radiusY = height / 3;
    n = random(2, 50);//count pelat
    d = 17;//angle ?
    oldD = d;
    scale = 200;
    theta = 0;
    thetaLine = 0;
    cns.width = width;
    cns.height = height;
}

function drawLine() {
    if (450 <= thetaLine) {
        if (d >= 360) {
            d = oldD;
            return;
        }
        ++d;
        thetaLine = 0;
        ctx.clearRect(0, 0, width, height);
    }

    let lineK1 = inRadian(thetaLine * d);
    let lineK2 = inRadian((thetaLine + 1) * d);
    let lineR1 = Math.cos(lineK1 * n) * scale;
    let lineR2 = Math.cos(lineK2 * n) * scale;
    let lineX1 = lineR1 * Math.cos(lineK1) + centerX;
    let lineX2 = lineR2 * Math.cos(lineK2) + centerX;
    let lineY1 = lineR1 * Math.sin(lineK1) + centerY;
    let lineY2 = lineR2 * Math.sin(lineK2) + centerY;

    thetaLine += 1;
    
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = 'black';
    line(lineX1, lineY1, lineX2, lineY2);
}

function draw() {
    if (theta >= 360) {
        return;
    }

    let k1 = inRadian(theta);
    let k2 = inRadian(theta + 1);
    let r1 = Math.cos(k1 * n) * scale;
    let r2 = Math.cos(k2 * n) * scale;
    let x1 = r1 * Math.cos(k1) + centerX;
    let x2 = r2 * Math.cos(k2) + centerX;
    let y1 = r1 * Math.sin(k1) + centerY;
    let y2 = r2 * Math.sin(k2) + centerY;

    theta+=0.5;

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'red';
    line(x1, y1, x2, y2);
}

function randomColor() {
    let hex = "0123456789abcdef";
    let id = "#";
    let res = "";
    for (let i = 0; i < 6; i++) {
        let index = random(0, hex.length);
        res += hex[index];
    }
    return id + res;
}

function random(min, max) {
    return Math.floor(min + Math.abs(min - max) * Math.random());
}

function inRadian(angle) {
    return Math.PI * 2 * angle / 360;
}

function line(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
}

function update() {
//    if (thetaLine >= 360) draw();
    drawLine();
    requestAnimationFrame(update);
}

init();
update();
