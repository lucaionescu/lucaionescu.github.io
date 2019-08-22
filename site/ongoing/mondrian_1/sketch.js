var gui;
var canvas_w;
var canvas_h;
var square_w;
var square_h;
var num_splits = 7;
var x_split_prob = 0.1;
var y_split_prob = 0.1;
var color_prob = 0.2;
var colors = ['#FF0101', '#0101FD', '#FFF001'];
var white = '#F9F9F9';
var black = '#30303A';
var squares = [];

function split_on_x(square, split_coor) {
  square_a = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - split_coor + square.x),
    height: square.height
  };

  square_b = {
    x: split_coor,
    y: square.y,
    width: square.width - split_coor + square.x,
    height: square.height
  };

  squares.push(square_a);
  squares.push(square_b);
}

function split_on_y(square, split_coor) {
  square_a = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - split_coor + square.y)
  };

  square_b = {
    x: square.x,
    y: split_coor,
    width: square.width,
    height: square.height - split_coor + square.y,
  };

  squares.push(square_a);
  squares.push(square_b);
}

function split_square(x, y) {
  for (let i = squares.length - 1; i >= 0; i--) {
    square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      if (random() < x_split_prob) {
        squares.splice(i, 1);
        split_on_x(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (random() < y_split_prob) {
        squares.splice(i, 1);
        split_on_y(square, y);
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(black);
  strokeWeight(10);

  gui = createGui('customize');
  sliderRange(0, 1, 0.01);
  gui.addGlobals(
    'x_split_prob',
    'y_split_prob',
    'color_prob'
  );

  noLoop();
}

function draw() {
  squares = [{
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight
  }];

  canvas_w = windowWidth;
  canvas_h = windowHeight;
  square_w = canvas_w / num_splits;
  square_h = canvas_h / num_splits;

  for (let i = 0; i < canvas_w; i += square_w) {
    for (let k = 0; k < canvas_h; k += square_h) {
      split_square(i, k);
    }
  }

  squares.forEach(s => {
    s.color = (random() < color_prob) ? random(colors) : white;
  });

  squares.forEach(s => {
    rect(s.x, s.y, s.width, s.height);
    fill(s.color);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw();
}
