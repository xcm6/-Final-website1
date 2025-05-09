let font, pts = [], sample = 0.1;
function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup() {
  createCanvas(600,600);
  textFont(font);
  textSize(200);
  pts = font.textToPoints('Print', 50, 350, 200, { sampleFactor: sample });
}
function draw() {
  background(255);
  for (let p of pts) {
    let d = dist(mouseX,mouseY,p.x,p.y);
    let offset = map(d,0,200,20,0);
    ellipse(p.x + random(-offset,offset), p.y + random(-offset,offset), 8);
  }
}


