let font, homePts, movers = [];
class Mover {
  constructor(x,y){ this.home=createVector(x,y); this.pos=this.home.copy(); }
  update(){
    let m = createVector(mouseX,mouseY);
    let d = p5.Vector.dist(m,this.pos);
    if(d<100) this.pos.lerp(m,0.1);
    else       this.pos.lerp(this.home,0.05);
  }
  show(){ ellipse(this.pos.x,this.pos.y,8); }
}
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600);
  textFont(font);
  textSize(200);
  homePts = font.textToPoints('Hello', 50, 350, 200, { sampleFactor:0.1 });
  movers = homePts.map(p=> new Mover(p.x,p.y));
}
function draw(){
  background(255);
  for(let m of movers){ m.update(); m.show(); }
}
