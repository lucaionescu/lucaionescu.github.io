let sketch = function (p) {
  let name = "perlin";
  let w = 800;
  let h = 800;

  let n_particles = 500;
  let particles = [];

  p.setup = function () {
    p.createCanvas(w, h);
    p.background(25);
    p.smooth();
    p.strokeWeight(2);

    initializeParticles();
  };

  p.draw = function () {
    updateParticles();
    drawParticles();
  };

  initializeParticles = function () {
    for (let i = 0; i < n_particles; i++) {
      particles.push({
        loc: p.createVector(p.random(w), p.random(h)),
        vel: p.createVector(0, 0),
      });
    }
  };

  updateParticles = function () {
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      particle.loc.x += 0.5 * ;
      particle.loc.y += 0.5 * ;

      particle.vel.x += p.random(0.5);
      particle.vel.y += p.random(0.5);
    }
  };

  drawParticles = function () {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      p.stroke(255, 255, 255, 30);
      p.point(particle.loc.x, particle.loc.y);
    }
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