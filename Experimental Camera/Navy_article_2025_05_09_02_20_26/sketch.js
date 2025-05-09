// sketch.js

// —— 手势检测相关 —— 
let handPose;
let video;
let hands = [];

// —— 准星 —— 
let crossX, crossY;

// —— 游戏状态 —— 
let gameState = 'start';

// —— 简化版 Duck 对象 —— 
let duck = {
  x: 0, y: 0, w: 80, h: 60,
  speed: 3,
  state: 'flying', // 'flying' or 'falling'
  fallV: 0
};

// —— 简化版 Dog —— 
let dog = {
  state: 'none', // 'none', 'pickup', 'laugh'
  timer: 0
};

// —— 分数与关卡 —— 
let score = 0;
let level = 1;
let killsThisLevel = 0;
let killsNeeded = 3;

// —— 弹窗队列 —— 
let scorePopups = [];
let nextLevelTimer = 0;

function preload() {
  // 使用原版 API 创建 handPose 实例
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  // 摄像头初始化（隐藏画面）
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 启动手势检测
  handPose.detectStart(video, gotHands);

  // 初始准星位置
  crossX = width / 2;
  crossY = height / 2;

  resetDuck();
}

function draw() {
  if (gameState === 'start') {
    drawStartScreen();
    applyEffects();
    return;
  }

  // 更新准星：平滑跟随食指尖（landmarks[8]）
  if (hands.length > 0) {
    let kp = hands[0].keypoints[8];
    crossX = lerp(crossX, kp.x, 0.2);
    crossY = lerp(crossY, kp.y, 0.2);
  }

  // 背景
  background(100, 150, 255);

  // 更新 & 绘制鸭子
  updateDuck();
  drawDuck();

  // 更新 & 绘制分数弹窗
  updatePopups();
  drawPopups();

  // HUD
  drawHUD();

  // 准星
  drawCrosshair(crossX, crossY);

  // 更新 & 绘制狗
  updateDog();
  drawDog();

  // 下一关提示
  if (nextLevelTimer > 0) {
    drawNextLevel();
    nextLevelTimer--;
  }

  applyEffects();
}

// 点击射击
function mousePressed() {
  if (gameState === 'play') shoot();
}

function keyPressed() {
  if (gameState === 'start' && keyCode === ENTER) {
    gameState = 'play';
  }
}

// 手势回调
function gotHands(results) {
  hands = results;
}

// —— Duck 逻辑 —— 
function resetDuck() {
  duck.x = -duck.w;
  duck.y = random(height * 0.2, height * 0.6);
  duck.state = 'flying';
  duck.fallV = 0;
}

function updateDuck() {
  if (duck.state === 'flying') {
    duck.x += duck.speed;
    if (duck.x > width + duck.w) resetDuck();
  } else {
    duck.y += duck.fallV;
    duck.fallV += 0.5;
    if (duck.y > height) {
      if (killsThisLevel >= killsNeeded) {
        nextLevelTimer = 120;
        level++;
        killsNeeded += 2;
        killsThisLevel = 0;
        duck.speed += 1;
      }
      resetDuck();
    }
  }
}

function drawDuck() {
  fill(255, 255, 0);
  noStroke();
  rect(duck.x, duck.y, duck.w, duck.h);
}

// —— 射击 —— 
function shoot() {
  // “FIRE!” 提示
  scorePopups.push({ x: width - 60, y: height - 20, txt: 'FIRE!', t: 30, c: color(255,0,0) });

  // 判断是否击中
  if (crossX > duck.x && crossX < duck.x + duck.w &&
      crossY > duck.y && crossY < duck.y + duck.h) {
    score += 100;
    killsThisLevel++;
    duck.state = 'falling';
    duck.fallV = 5;
    scorePopups.push({
      x: duck.x + duck.w/2,
      y: duck.y + duck.h/2,
      txt: '+100',
      t: 60,
      c: color(255)
    });
    dog.state = 'pickup';
    dog.timer = 60;
  } else {
    dog.state = 'laugh';
    dog.timer = 60;
  }
}

// —— 分数弹窗 —— 
function updatePopups() {
  for (let i = scorePopups.length - 1; i >= 0; i--) {
    let p = scorePopups[i];
    p.y -= 1;
    p.t--;
    if (p.t <= 0) scorePopups.splice(i, 1);
  }
}

function drawPopups() {
  textSize(24);
  for (let p of scorePopups) {
    fill(p.c);
    text(p.txt, p.x, p.y);
  }
}

// —— HUD & 准星 & 下一关 —— 
function drawHUD() {
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, 200, 100);
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, 10, 10);
  text(`Level: ${level}`, 10, 35);
  text(`Kills: ${killsThisLevel}/${killsNeeded}`, 10, 60);
}

function drawCrosshair(x, y) {
  stroke(255, 0, 0);
  strokeWeight(2);
  line(x - 15, y, x + 15, y);
  line(x, y - 15, x, y + 15);
}

function drawNextLevel() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255, 255, 255, 200);
  text('NEXT LEVEL', width/2, height/2);
}

// —— Dog 动画 —— 
function updateDog() {
  if (dog.state === 'none') return;
  dog.timer--;
  if (dog.timer <= 0) dog.state = 'none';
}

function drawDog() {
  if (dog.state === 'none') return;
  let w = 120, h = 80;
  let x = width/2 - w/2, y = height - h - 20;
  fill(dog.state === 'pickup' ? color(0,255,0) : color(255,0,0));
  rect(x, y, w, h);
}

// —— 简易视觉后处理 —— 
function applyEffects() {
  noStroke();
  fill(0, 50);
  for (let y = 0; y < height; y += 4) {
    rect(0, y, width, 2);
  }
  for (let i = 0; i < 50; i++) {
    fill(random(255), random(255), random(255), 50);
    let s = random(2, 6);
    ellipse(random(width), random(height), s, s);
  }
  if (frameCount % 120 < 5) {
    copy(random(-5,5), random(-5,5), width, height, 0, 0, width, height);
  }
}

// —— 开始界面 —— 
function drawStartScreen() {
  background(0);
  textSize(48);
  fill(255);
  text('Duck Hunt REMIX', width/2, height/2 - 80);
  textSize(20);
  text('Use your hand to aim (hover finger) and click to shoot.', width/2, height/2 - 10);
  textSize(24);
  fill(255, 200, 0);
  text('Press ENTER to start', width/2, height/2 + 80);
}

