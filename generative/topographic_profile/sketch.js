let name = "topographic_profile";
let w = 2000;
let h = 2000;
let noiseMultiplier = 100;
let colorPalette = [
  "#457579",
  "#528780",
  "#E9D8B3",
  "#E57F52",
  "#A2333D",
  "#ECC958",
  "#819268",
];

function setup() {
  var canvas = createCanvas(2000, 2000);
  canvas.parent('sketch-holder');
  noLoop();

  strokeWeight(0.5);
}

function draw() {
  background("#19181a");
  plateWidth = 250;

  for (let x = 50; x < 2000 - plateWidth; x += 300) {
    for (let y = 200; y <= 2000; y += 300) {
      numOfPlates = Math.floor(random(1, 5));
      drawProfile(x, y, x + plateWidth, numOfPlates);
      randomDots(x, y, x + plateWidth, numOfPlates * 50);
    }
  }
}

function drawProfile(startX, startY, endX, numOfPlates) {
  let y_off = random(100);

  for (let y_index = numOfPlates; y_index > 0; y_index--) {
    fill(random(colorPalette));

    beginShape();
    vertex(startX, startY);

    for (let x = startX; x < endX; x++) {
      let n = yNoise(y_off);
      let y = startY - (y_index * 50);
      vertex(x, y + n);
      y_off += 0.01;
    }

    vertex(endX, startY);
    vertex(startX, startY);
    endShape();

    y_off = random(100);
  }
}

function randomDots(minX, minY, maxX, maxY) {
  strokeWeight(0.5);
  stroke("#222222")
  for (let i = 0; i < 100; i++) {
    point(random(minX, minY), random(maxX, maxY));
  }
}

function yNoise(y_off) {
  return (0.8 * noise(y_off, 0, 1, -50, 50) * TWO_PI / 8) * noiseMultiplier;
}

function mouseClicked() {
  clear();
  redraw();
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
