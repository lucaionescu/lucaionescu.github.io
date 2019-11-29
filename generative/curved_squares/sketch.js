let name = "curved_squares";
let w = 800;
let h = 800;
let backgroundPalette = ["#fafafa", "#ffffff", "#cac3c0", "#eaeac7", "#f2d6bb", "#f7f4ca", "#fcede1"]
let fillPalette = ["#2f2f2f", "#574a4e", "#52170d", "#333746", "#1b272d", "#282f43"]

function setup() {
  var canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  noLoop();
}

function draw() {
  background(random(backgroundPalette));
  fill(random(fillPalette));
  noStroke();

  let squareSize = Math.floor(width / random(5, 50));
  let numOfSquares = Math.floor(random(3, width / squareSize));
  let padding = Math.floor((width - (squareSize * numOfSquares)) / (numOfSquares + 1));
  let maxRadius = map(squareSize, width / 5, width / 50, 1, 10);

  for (let y = padding; y <= height - padding; y += (squareSize + padding)) {
    for (let x = padding; x <= width - padding; x += (squareSize + padding)) {
      let corner_radius = map(x + y, padding, width, 0, maxRadius);
      rect(x, y, squareSize, squareSize, corner_radius);
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

function mouseClicked() {
  clear();
  redraw();
}
