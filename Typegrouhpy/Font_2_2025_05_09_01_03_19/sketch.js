let font, basePts, particles = [];
class Particle {
  constructor(x,y){ this.x=x; this.y=y; }
  show(){ ellipse(this.x, this.y, 10); }
}
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600);
  textFont(font);
  textSize(250);
  basePts = font.textToPoints('Print', 50, 400, 250, { sampleFactor:0.08 });
  rebuild();
}
function draw(){
  background(255);
  for(let p of particles) p.show();
}
function mousePressed(){
  if(particles.length>0) particles.splice(0,1);
  else rebuild();
}
function rebuild(){
  particles = basePts.map(p=> new Particle(p.x,p.y));
}
