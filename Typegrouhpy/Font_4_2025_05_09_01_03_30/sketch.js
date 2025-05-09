let font, sample=0.05;
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600);
  textFont(font);
  textSize(200);
}
function draw(){
  background(255);
  let pts = font.textToPoints('Hello', 50, 350, 200, { sampleFactor: sample });
  for (let p of pts) ellipse(p.x,p.y,6);
}
function keyPressed(){
  if(keyCode===UP_ARROW) sample = min(sample+0.01,0.2);
  if(keyCode===DOWN_ARROW) sample = max(sample-0.01,0.01);
}
