let sketch = function (p) {
  let name = "tiles_1";
  let w = 800;
  let h = 800;
  let tiles = [];
  let tile_size = 50;
  let color_palette = [
    "#798bbe",
    "#231932",
    "#243475",
    "#608dd8",
    "#b0bece",
  ];

  p.setup = function () {
    p.createCanvas(w, h);
    p.pixelDensity(2);
    p.noStroke();
    p.noLoop();
  };

  p.draw = function () {
    createTileArray();

    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      p.fill(tile.color);
      p.square(tile.x_pos, tile.y_pos, 50);
      addTileDecoration(tile.x_pos, tile.y_pos);
    }
  };

  createTileArray = function () {
    tiles = [];

    for (let y = 0; y < h; y += tile_size) {
      for (let x = 0; x < w; x += tile_size) {
        tiles.push({
          x_pos: x,
          y_pos: y,
          color: p.random(color_palette),
        });
      }
    }
  }

  addTileDecoration = function (x, y) {
    const corner = p.random([0, 1, 2, 3]);

    switch (corner) {
      case 0:
        p.fill(p.random(color_palette));
        if (p.random() > 0.5) {
          p.arc(x, y, 100, 100, 0, p.HALF_PI, p.PIE);
        } else {
          p.arc(x + 25, y, 50, 50, 0, p.PI, p.PIE);
        }
        break;
      case 1:
        p.fill(p.random(color_palette));
        if (p.random() > 0.5) {
          p.arc(x + 50, y, 100, 100, p.HALF_PI, p.PI, p.PIE);
        } else {
          p.arc(x + 50, y + 25, 50, 50, p.HALF_PI, 2 * p.PI, p.PIE);
        }
        break;
      case 2:
        p.fill(p.random(color_palette));
        if (p.random() > 0.5) {
          p.arc(x + 50, y + 50, 100, 100, 0, p.HALF_PI + p.PI, p.PIE);
        } else {
          p.arc(x + 25, y + 50, 50, 50, p.PI, 2 * p.PI, p.PIE);
        }
        break;
      case 3:
        p.fill(p.random(color_palette));
        if (p.random() > 0.5) {
          p.arc(x, y + 50, 100, 100, p.HALF_PI + p.PI, 2 * p.PI, p.PIE);
        } else {
          p.arc(x, y + 25, 50, 50, 0 - p.HALF_PI, p.PI - p.HALF_PI, p.PIE);
        }
        break;
      default:
        break;
    }
  }

  p.mouseClicked = function () {
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
  };
};

let myp5 = new p5(sketch);