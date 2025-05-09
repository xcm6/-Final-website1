let font, particles = [];
let exploded = false;

class P {
  constructor(x,y) {
    this.home = createVector(x,y);
    this.pos = this.home.copy();
    this.vel = createVector(0,0);
  }
  update() {
    if (exploded) {
      this.vel.mult(0.96);          // 摩擦
      this.pos.add(this.vel);
      // 恢复时慢慢回到原位
      if (this.vel.mag() < 0.5) {
        this.pos = p5.Vector.lerp(this.pos, this.home, 0.05);
      }
    }
  }
  show() {
    ellipse(this.pos.x, this.pos.y, 8);
  }
}

function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}

function setup() {
  createCanvas(600,600);
  textFont(font);
  textSize(200);
  let pts = font.textToPoints('World', 50, 350, 200, { sampleFactor:0.06 });
  particles = pts.map(p => new P(p.x,p.y));
}

function draw() {
  background(255);
  for (let p of particles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
  // 给每个粒子一个随机初速度
  exploded = true;
  for (let p of particles) {
    let dir = p5.Vector.sub(p.home, createVector(width/2, height/2)).normalize();
    p.vel = p5.Vector.random2D().mult(random(5,15)).add(dir.mult(random(2,8)));
  }
}
