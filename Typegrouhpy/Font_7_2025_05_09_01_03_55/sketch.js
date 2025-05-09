let font, pts = [];
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600,WEBGL);
  textFont(font);
  textSize(200);
  let raw = font.textToPoints('World', -200, 50, 200, { sampleFactor:0.06 });
  pts = raw.map(p=>({pos:createVector(p.x,p.y,random(-200,200))}));
}
function draw(){
  background(255);
  rotateY(map(mouseX,0,width,-PI/4,PI/4));
  for(let p of pts){
    push();
    translate(p.pos);
    sphere(3);
    pop();
  }
}
