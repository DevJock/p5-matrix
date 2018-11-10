let Width = 0;
let Height = 0;
let fontSize = 15;

let codes = [];
let codeCount = 5;
let spacing = fontSize;
let offset = fontSize / 2;

let minLength = 10;
let maxLength = 20;

let minSpeed = 2;
let maxSpeed = 8;

let canvas;

let utfStart = 0x30A1;
let utfEnd = 0x30FA;

function setup() {
    canvas = createCanvas(0, 0);
    canvas.parent(document.getElementById("canvasHolder"));
    windowResized();
    frameRate(60);
    textSize(fontSize);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
}

function windowResized() {
    let w = document.getElementById("canvasHolder").offsetWidth;
    let h = document.getElementById("canvasHolder").offsetWidth;
    resizeCanvas(w, h);
    Width = canvas.width;
    Height = canvas.height;
    fontSize = Height / Width * 25;
    spacing = fontSize;
    offset = fontSize / 2;
    maxLength = Math.floor(Height / fontSize/2);
    codeCount = Math.floor(Width / fontSize);
    codes = [];
    let x = offset;
    for (let i = 0; i < codeCount; i++) {
        let y = random(-Height);
        let count = Math.ceil(random() * maxLength + minLength);
        let speed = Math.ceil(random() * maxSpeed + minSpeed);
        codes.push(new CODES(x, y, count, speed, utfStart, utfEnd));
        x += spacing;
    }
}

function draw() {
    background(0);
    for (let i = 0; i < codes.length; i++) {
        codes[i].Render();
    }
}



class CODES {
    constructor(x, y, count, speed, utfStart, utfEnd) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.count = count;
        this.symbols = [];
        this.opacity = 51;
        for (let i = 0; i < this.count; i++) {
            this.symbols.push(new SYMBOL(this.x, this.y + i * fontSize / 1.2, this.speed, this.opacity, utfStart, utfEnd));
            this.opacity += 255 / this.count;
        }
    }

    Render() {
        for (let i = 0; i < this.symbols.length; i++) {
            if (random() > 0.9 && random() > 0.9) {
                this.symbols[i].UpdateSymbol();
            }
        }
        this.symbols.forEach(symbol => {
            symbol.Draw();
        })
    }
}


class SYMBOL {
    constructor(x, y, speed, opacity, utfStart, utfEnd, char = '') {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.opacity = opacity;
        this.utfStart = utfStart;
        this.utfEnd = utfEnd;
        this.UpdateSymbol(char);
    }
    UpdateSymbol(char = '') {
        if (this.custom) {
            return;
        }
        if (char !== '') {
            this.custom = true;
            this.unicode = char;
            return;
        }
        this.unicode = String.fromCharCode(this.utfStart + round(random(0, this.utfEnd - this.utfStart)));
    }
    Draw() {
        this.y = (this.y >= Height) ? 0 : this.y += this.speed;
        fill(51, 255, 51, this.opacity);
        text(this.unicode, this.x, this.y);
    }
}