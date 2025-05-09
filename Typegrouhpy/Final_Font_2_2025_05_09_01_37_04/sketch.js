/**
 * Print PsycheDream
 * 灵感：迷幻超现实，色彩扭曲与时间扭曲
 */
let font, pts = [], noiseOff = [], center;

function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  textFont(font);
  textSize(200);
  // 获取文字顶点和噪声偏移
  pts = font.textToPoints('Print', 50, 350, 200, { sampleFactor: 0.06 });
  noiseOff = pts.map(() => random(1000));
  center = createVector(width/2, height/2);
  noStroke();
}

function draw() {
  background((frameCount * 0.5) % 360, 50, 10);
  
  // 核心扭曲：点沿径向和切向噪声偏移
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    let off = noise(noiseOff[i], frameCount * 0.005);
    // 径向摆动
    let angle = atan2(p.y - center.y, p.x - center.x) + off * TWO_PI * 2;
    let radius = dist(p.x, p.y, center.x, center.y) + sin(frameCount * 0.02 + off * 10) * 20;
    let x = center.x + cos(angle) * radius;
    let y = center.y + sin(angle) * radius;
    // 色相随时间和位置变化
    let h = (map(i, 0, pts.length, 0, 360) + frameCount) % 360;
    fill(h, 80, 100, 80);
    ellipse(x, y, off * 12 + 4);
  }
  
  // 按下时：时间反转+“幻影”拉丝
  if (mouseIsPressed) {
    for (let k = 0; k < 5; k++) {
      let tOff = frameCount * (k % 2 ? -0.1 : 0.1);
      for (let p of pts) {
        let a = noise(p.x * 0.01, p.y * 0.01, tOff) * TWO_PI * 3;
        let r = 30 + sin(tOff + a) * 30;
        let x = p.x + cos(a) * r;
        let y = p.y + sin(a) * r;
        fill(random(360), 100, 100, 20);
        ellipse(x, y, 20);
      }
    }
  }
  
  // 底部标题
  fill(0, 0, 100);
  textSize(16);
  textAlign(CENTER);
  text('Print PsycheDream', width / 2, height - 20);
}

