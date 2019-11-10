let cns;
let ctx;
let width;
let height;
let n;
let d;
let centerX;
let centerY;
let radiusX;
let radiusY;

function init() {
    cns = document.getElementById('canvas');
    ctx = cns.getContext('2d');
    n = 1;
    d = 1;
    width = 500;
    height = 500;
    centerX = width / 2;
    centerY = height / 2;
    radiusX = width / 2;
    radiusY = height / 2;
    cns.width = width;
    cns.height = height;
}

function draw() {
    let k = n / d;
    if (n <= 7) {
        n++;
    } else {
        d++;
        n = 1;
    } if (d >= 9) {
        d = 1;
    }
    console.log(`${n} ${d}`);
    

    ctx.clearRect(0, 0, width, height);
    setTimeout(() => { ctx.strokeStyle = getRandomColor(); }, 300);
    if (n % 3 != 0) {
        k = Math.floor(k) % 2 == 0 ? Math.floor(k) * 2 : Math.floor(k);
        for (let theta = -360; theta < 360; theta += 1) {
            let x = Math.cos(k * inRadian(theta)) * Math.cos(inRadian(theta)) * radiusX + centerX;
            let y = Math.cos(k * inRadian(theta)) * Math.sin(inRadian(theta)) * radiusY + centerY;
            line(x, y);
        }
    } else if ((k * 10) % 10 == 0) {
        let max = k % 2 == 0 ? 360 * 2 : 360;
        for (let theta = 0; theta < max; theta += 1) {
            let x = Math.cos(k * inRadian(theta)) * Math.cos(inRadian(theta)) * radiusX + centerX;
            let y = Math.cos(k * inRadian(theta)) * Math.sin(inRadian(theta)) * radiusY + centerY;
            line(x, y);
        }
    } else if ((k * 10) % 10 == 5) {
        for (let theta = 0; theta < 360 * 2; theta += 1) {
            let x = Math.cos(k * inRadian(theta)) * Math.cos(inRadian(theta)) * radiusX + centerX;
            let y = Math.cos(k * inRadian(theta)) * Math.sin(inRadian(theta)) * radiusY + centerY;
            line(x, y);
        }
    } else if (Math.floor(k) == n) {
        k = 12 * k;
        for (let theta = 0; theta < 360 / (2 * k); theta += 1) {
            let x = Math.cos(k * inRadian(theta)) * Math.cos(inRadian(theta)) * radiusX + centerX;
            let y = Math.cos(k * inRadian(theta)) * Math.sin(inRadian(theta)) * radiusY + centerY;
            line(x, y);
        }
    } else {
        for (let theta = 0; theta < 360; theta += 1) {
            let x = Math.cos(k * inRadian(theta)) * Math.cos(inRadian(theta)) * radiusX + centerX;
            let y = Math.cos(k * inRadian(theta)) * Math.sin(inRadian(theta)) * radiusY + centerY;
            line(x, y);
        }
    }
}

function inRadian(angle) {
    return angle * 2 * Math.PI / 360.0;
}

function getRandomColor() {
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
    return Math.floor(min + Math.abs((max - min)) * Math.random());
}

function line(x, y) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
}

function logConsole(message) {
    console.log(message);
}

function update() {
    setTimeout(() => {
        draw();
        requestAnimationFrame(update);
    }, 250);
}

init();
update();
//draw();