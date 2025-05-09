/**
 * World Rain Letters
 * 灵感：文字雨 (Type Rain) + 水滴意象
 */
let font, rain = [], letters = [];
const WORD = 'WORLD';
function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}
function setup() {
  createCanvas(600,600);
  textFont(font); textSize(20);
  // 普通雨滴
  for(let i=0;i<300;i++){
    rain.push({
      x: random(width),
      y: random(-600,0),
      speed: random(2,6),
      isLetter: false,
      ch: ''
    });
  }
  // 字母雨
  for(let i=0;i<WORD.length;i++){
    letters.push({
      x: random(width),
      y: random(-600,0),
      speed: random(2,4),
      isLetter: true,
      ch: WORD[i]
    });
  }
  rain = rain.concat(letters);
}
function draw() {
  background(0);
  fill(100,200,255);
  noStroke();
  // 绘制雨滴和字母
  for(let r of rain){
    if(r.isLetter){
      fill(255);
      text(r.ch, r.x, r.y);
    } else {
      stroke(100,200,255);
      line(r.x, r.y, r.x, r.y + 8);
    }
    // 更新位置
    r.y += r.speed;
    if(r.y > height) r.y = random(-200,0);
  }
  // 鼠标按下时：字母雨加速闪烁
  if(mouseIsPressed){
    for(let r of rain){
      if(r.isLetter){
        fill(random(255),random(255),random(255));
        text(r.ch, r.x, r.y);
        r.y -= 8;
      }
    }
  }
  // 底部白字标题
  noStroke();
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text('World Rain Letters', width/2, height - 20);
}
