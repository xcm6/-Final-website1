let font;
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600);
  textFont(font);
}
function draw(){
  background(255);
  let cfg = [
    {sz:250,f:0.05},
    {sz:200,f:0.1},
    {sz:150,f:0.2}
  ];
  for(let c of cfg){
    let pts = font.textToPoints('Hello', 50, 350, c.sz, { sampleFactor:c.f });
    beginShape();
    for(let p of pts) vertex(p.x,p.y);
    endShape();
  }
}
