let font, A = [], B = [], t = 0;
function preload(){
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup(){
  createCanvas(600,600);
  textFont(font); textSize(180);
  A = font.textToPoints('Hello', 50,350,180, { sampleFactor:0.08 });
  B = font.textToPoints('World', 50,350,180, { sampleFactor:0.08 });
}
function draw(){
  background(30);
  stroke(255); noFill();
  beginShape();
  for(let i=0;i<A.length;i++){
    let m = (sin(t)+1)/2;
    vertex( lerp(A[i].x,B[i].x,m), lerp(A[i].y,B[i].y,m) );
  }
  endShape(CLOSE);
  t += 0.02;
  // 按下时加上红色点阵叠加
  if(mouseIsPressed){
    stroke(255,0,0);
    for(let i=0;i<A.length;i++){
      let m2 = (cos(t)+1)/2;
      point( lerp(A[i].x,B[i].x,m2), lerp(A[i].y,B[i].y,m2) );
    }
  }
  // 底部白字标题
  noStroke();
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text('Hello–World Morph', width/2, height-20);
}



