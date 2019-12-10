let name = "pantone_1";
let w = 800;
let h = 800;
let p = 0.4;
let splits = 0;
let s = 0;
let palette = [
  "#170C0C",
  "#170C0C",
  "#170C0C",
  "#170C0C",
  "#111543",
  "#141E9A",
  "#0B2ED3",
  "#1050DC",
  "#1FB6E6",
  "#78DCF1",
  "#CDE9F0",
  "#EEF3F6",
  "#FEE333",
  "#FD9A27",
  "#FD0D1B",
  "#40082D",
];

function setup() {
  createCanvas(w, h);
  noStroke();
  noLoop();

  splits = randomGaussian(50, 15);
  s = w / splits;
}

function draw() {
  for (let x = 0; x < w; x += s) {
    if (random() < p) {
      palette.push(palette[0]);
      palette.splice(0, 1);
    } else {
      palette.push(...palette.slice(0, 4));
      palette = palette.slice(4);
    }

    let c_i = 0;

    for (let i = 0; i < splits; i++) {
      c_i = c_i < palette.length ? c_i : 0;
      fill(palette[c_i]);
      rect(x, i * s, s, s);
      c_i++;
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    var today = new Date();
    var date = today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
    var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    var fileName = name + "_" + date + "_" + time;
    saveCanvas(fileName, "png");
  }
}
