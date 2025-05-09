let font, pts = [], noiseOffsets = [];

function preload() {
  font = loadFont('HankenGrotesk-Italic-VariableFont_wght.otf');
}

function setup() {
  createCanvas(600,600);
  textFont(font);
  textSize(200);
  pts = font.textToPoints('World', 50, 350, 200, { sampleFactor:0.06 });
  // 每个点一个噪声偏移
  noiseOffsets = pts.map(() => random(1000));
}

function draw() {
  background(255);
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    // 用 Perlin noise 驱动每个点的偏移
    let angle = noise(noiseOffsets[i] + frameCount * 0.005) * TWO_PI * 2;
    let r = map(noise(noiseOffsets[i] + frameCount * 0.005), 0, 1, -20, 20);
    let x = p.x + cos(angle) * r;
    let y = p.y + sin(angle) * r;
    ellipse(x, y, 6);
  }
}
