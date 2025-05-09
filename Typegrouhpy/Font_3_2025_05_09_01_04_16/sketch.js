let font, basePts = [], pivot;

function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}

function setup() {
  createCanvas(600,600);
  textFont(font);
  textSize(200);
  // 预计算文字顶点
  basePts = font.textToPoints('Print', 50, 350, 200, { sampleFactor:0.08 });
  pivot = createVector(width/2, height/2);
  background(255);
}

function draw() {
  // 拖拽时在当前位置“印”出文字轮廓
  if (mouseIsPressed) {
    for (let p of basePts) {
      // 以拖拽点为中心，偏移原始轮廓
      ellipse(p.x - 50 + (mouseX - pivot.x), p.y - 350 + (mouseY - pivot.y), 8);
    }
  }
}

// 按 C 清空画布
function keyPressed() {
  if (key === 'c' || key === 'C') background(255);
}
