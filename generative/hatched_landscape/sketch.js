let sketch = function (p) {
  let name = "hatched_landscape";
  let w = 800;
  let h = 800;

  p.setup = function () {
    p.createCanvas(w, h);
    p.pixelDensity(2);
    p.noLoop();
  };

  p.draw = function () {
    p.background("#fafafa");
    p.strokeWeight(1.5);

    let x_off = p.random(10);
    let y_off = p.random(10);

    p.strokeWeight(.5);

    for (let x = 50; x < 100; x += 10) {
      let y_max = 100 + p.map(p.noise(y_off), 0, 1, -20, 20);

      for (let y = 500; y > y_max; y--) {
        x += p.map(p.noise(x_off), 0, 1, -10, 10);

        p.point(x, y);
        y_off += 0.01;
      }

      x_off += 0, 1;
    }
  }

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