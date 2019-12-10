let sketch = function (p) {
  let n_points = 200;
  let colors = [
    p.color(255, 0, 0),
    p.color(0, 255, 0),
    p.color(0, 0, 255),
  ];

  p.setup = function () {
    p.createCanvas(800, 800);
    p.noLoop();
    p.noStroke();
    p.pixelDensity(2);
  };

  p.draw = function () {
    p.background("#202020");
    p.blendMode(p.EXCLUSION);

    for (let x = 100; x < p.width - 50; x += 100) {
      for (let y = 100; y < p.height - 50; y += 100) {
        drawBlob(x, y);
      }
    }

    addNoiseLayer(250000);
  };

  drawBlob = function (center_x, center_y) {
    let angle = p.radians(360) / n_points;
    let t = p.random(100);

    for (let c = 0; c < colors.length; c++) {
      p.fill(colors[c]);
      p.beginShape();

      for (let i = 0; i < n_points; i++) {
        let x = p.cos(angle * i) * 1.5;
        let y = p.sin(angle * i) * 1.5;
        let vec = p.createVector(x, y);
        let d = p.map(center_x, 0, p.width, 1, 3);
        let n = p.map(p.noise(vec.x + t, vec.y + t), 0, 1, 5, 15);
        vec.mult(n * d);
        p.vertex(center_x + vec.x, center_y + vec.y);
      }

      p.endShape(p.CLOSE);
      t += p.map(center_y, 0, p.height, 0.1, 0.3);
    }
  };

  addNoiseLayer = function (n_points) {
    p.blendMode(p.BLEND);
    noise_layer = p.createGraphics(p.width, p.height);
    noise_layer.noStroke();
    noise_layer.fill(110, 20);

    for (let i = 0; i < n_points; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let s = p.map(p.noise(x, y), 0, 1, 0, 2);
      noise_layer.square(x, y, s);
    }

    p.image(noise_layer, 0, 0);
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