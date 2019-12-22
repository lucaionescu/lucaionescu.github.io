let sketch = function (p) {
  let name = "gradient_dust";
  let w = 800;
  let h = 800;
  let n_shapes = 20;
  let min_size = 20;
  let padding = 50;

  p.setup = function () {
    p.createCanvas(w, h);
    p.pixelDensity(2);
    p.noLoop();
  };

  p.draw = function () {
    p.background(30);

    for (let i = 0; i < n_shapes; i++) {
      drawShape();
    };
  }

  drawShape = function () {
    let x_min = p.random(padding, p.width - padding)
    let x_max = p.random(x_min + min_size, p.width - padding)
    let y_min = p.random(padding, p.height - padding)
    let y_max = p.random(y_min + min_size, p.height - padding)
    let n_points = p.map(x_max + y_max, 0, p.width + p.height, 1000, 20000);


    p.blendMode(p.BLEND);
    pg = p.createGraphics(p.width, p.height);
    pg.noStroke();

    for (let i = 0; i < n_points; i++) {
      let x = p.random(x_min, x_max);
      let y = p.random(y_min, y_max);
      let s = p.map(p.noise(x, y), 0, 1, 0, 2);
      let r = p.map(x, 50, 200, 0, 200)
      let g = p.map(y, 100, 400, 0, 200)
      let b = p.map(x + y, padding, p.width + p.height, 0, 200)
      pg.fill(r, g, b, 20);
      pg.square(x, y, s);
    }

    p.image(pg, 0, 0);
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