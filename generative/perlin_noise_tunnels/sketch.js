let n = 1000;
let t = 0;
let particles = [];
let name = "perlin_noise_tunnels";

function Particle() {
  this.loc = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.i = random(-10, 10);
  this.c = color(255, 255, 255, 10);

  this.display = function () {
    stroke(this.c);
    point(this.loc.x, this.loc.y);
  }

  this.update = function (t) {
    this.loc.x += this.vel.x;
    this.loc.y += this.vel.y;
    this.vel = p5.Vector.fromAngle((noise(t, this.i) * TWO_PI) * 2);
    this.vel.add(p5.Vector.fromAngle((noise(this.loc.x / 100, this.loc.y / 100) * TWO_PI) * 3));
    this.i += 0.001;
  }
}

function setup() {
  pixelDensity(3);

  createCanvas(windowWidth, windowHeight);
  background("#19181a");

  for (let i = 0; i < n; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(t);
    particles[i].display();
  }

  t += 0.001;
}

function keyPressed() {
  if (keyCode == 83) {
    var today = new Date();
    var date = today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
    var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    var fileName = name + "_" + date + "_" + time;
    saveCanvas(fileName, "png")
  }
}
