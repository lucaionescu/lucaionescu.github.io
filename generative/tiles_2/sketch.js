let sketch = function (p) {
  let name = "tiles_2";
  let w = 800;
  let h = 800;
  let tiles = [];
  let tileSize = 50;
  let stroke = 0;
  let padding = 0;
  let tileDecorationProb = 0.8;
  let colorPalette = [
    "#170C0C",
    "#141E9A",
    "#0B2ED3",
    "#1050DC",
    "#1FB6E6",
    "#78DCF1",
    "#CDE9F0",
    "#FAFAFA",
  ];

  quarterCircle = function (x, y) {
    const corner = p.random([0, 1, 2, 3]);
    p.fill(p.random(colorPalette));

    switch (corner) {
      case 0:
        p.arc(x, y, 100, 100, 0, p.HALF_PI, p.PIE);
        break;
      case 1:
        p.arc(x + 50, y, 100, 100, p.HALF_PI, p.PI, p.PIE);
        break;
      case 2:
        p.arc(x + 50, y + 50, 100, 100, p.PI, p.PI + p.HALF_PI, p.PIE);
        break;
      case 3:
        p.arc(x, y + 50, 100, 100, p.HALF_PI + p.PI, 2 * p.PI, p.PIE);
        break;
      default:
        break;
    }
  }

  halfCircle = function (x, y) {
    const corner = p.random([0, 1, 2, 3]);
    p.fill(p.random(colorPalette));

    switch (corner) {
      case 0:
        p.arc(x + 25, y, 50, 50, 0, p.PI, p.PIE);
        break;
      case 1:
        p.arc(x + 50, y + 25, 50, 50, p.HALF_PI, p.PI + p.HALF_PI, p.PIE);
        break;
      case 2:
        p.arc(x + 25, y + 50, 50, 50, p.PI, 2 * p.PI, p.PIE);
        break;
      case 3:
        p.arc(x, y + 25, 50, 50, 0 - p.HALF_PI, p.PI - p.HALF_PI, p.PIE);
        break;
      default:
        break;
    }
  }

  let tileDecorations = [
    quarterCircle,
    halfCircle,
  ];

  p.setup = function () {
    p.createCanvas(w, h);
    p.pixelDensity(2);
    p.strokeWeight(stroke);
    p.noLoop();
  };

  p.draw = function () {
    createTileArray();

    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      p.fill(tile.color);
      p.square(tile.x_pos, tile.y_pos, 50);
      if (p.random() < tileDecorationProb) {
        decorationFunction = p.random(tileDecorations);
        decorationFunction(tile.x_pos, tile.y_pos);
      }
    }
  };

  createTileArray = function () {
    tiles = [];

    for (let y = 0; y < h; y += tileSize + padding) {
      for (let x = 0; x < w; x += tileSize + padding) {
        tiles.push({
          x_pos: x,
          y_pos: y,
          color: p.random(colorPalette),
        });
      }
    }
  }

  p.mouseClicked = function () {
    padding = p.map(p.mouseX, 0, p.width, 0, 50);
    stroke = p.map(p.mouseY, 0, p.height, 0, 10);
    p.strokeWeight(stroke);
    p.clear();
    p.redraw();
  };

  p.keyPressed = function () {
    if (p.keyCode == 83) {
      var today = new Date();
      var date = today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
      var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
      var fileName = name + "_" + date + "_" + time;
      p.saveCanvas(fileName, "png");
    }
    if (p.keyCode == 82) {
      padding = 0;
      p.strokeWeight(0);
      p.clear();
      p.redraw();
    }
  };
};

let myp5 = new p5(sketch);