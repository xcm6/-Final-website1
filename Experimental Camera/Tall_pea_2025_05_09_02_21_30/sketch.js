/*
  Duck Hunt - Cult Remix with BG Music and Start Screen
  -------------------------------------------------------
*/

// 
let gameState = "start";

// 手势检测（摄像头仅用于检测，不显示在游戏画面上）
let handPose;
let video;
let hands = [];

// 素材图片与音频
let bgImg, duckImg, dogLaugh, dogPickup;
let gunSound;   // 开枪音频
let bgMusic;    // 背景音乐

// Duck Hunt 游戏参数
let duckX, duckY;
let duckWidth = 80, duckHeight = 60;
let duckSpeed = 3;
let score = 0;

// 鸭子状态："flying" 或 "falling"
let duckState = "flying";
let duckFallVelocity = 0;
let duckRotation = 0;

// 关卡控制
let currentLevel = 1;
let killsThisLevel = 0;
let killsNeeded = 3;

// 分数弹出提示（数组：{x, y, value, timer}）
let scorePopups = [];

// NEXT LEVEL 提示计时器
let nextLevelTimer = 0;

// 狗动画状态 ("none" | "pickup" | "laugh")
let dogState = "none";
let dogAnimProgress = 0;
  
// 射击检测
let gunDetected = false;
let prevIndexY = null;
let shootCooldown = 0;
let cooldownMax = 15;
let shotDisplayTimer = 0;

// 准星平滑跟随（使用 lerp 平滑更新）
let crossX = 0, crossY = 0;
let smoothFactor = 0.2;

// ----------------------
// preload：加载模型、素材与音频
// ----------------------
function preload() {
  handPose = ml5.handPose();
  
  // 加载图片素材
  bgImg = loadImage("background.jpg");
  duckImg = loadImage("duck.gif");
  dogLaugh = loadImage("dogLaugh.gif");
  dogPickup = loadImage("dogPickup.jpg");
  
  // 加载音频素材
  gunSound = loadSound("gunshot.mp3");
  bgMusic = loadSound("bgMusic.mp3");
}

// ----------------------
// setup
// ----------------------
function setup() {
  createCanvas(640, 480);
  
  // 创建摄像头采集（仅用于手势检测，不显示在画布上）
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  handPose.detectStart(video, gotHands);
  
  resetDuck();
  crossX = width / 2;
  crossY = height / 2;
}

// ----------------------
// draw：主循环
// ----------------------
function draw() {
  if (gameState === "start") {
    drawStartScreen();
    return;
  }
  
  // 游戏状态为 "play" 时执行游戏逻辑
  
  // 绘制背景
  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  } else {
    background(0, 155, 255);
  }
  
  // 处理手势检测（摄像头不直接绘制）
  if (hands.length > 0) {
    let hand = hands[0];
    gunDetected = isGunGesture(hand);
    if (gunDetected) {
      let indexTip = hand.keypoints[8]; // 食指尖
      // 【左右互换】准星 x 坐标用 width - indexTip.x
      crossX = lerp(crossX, width - indexTip.x, smoothFactor);
      crossY = lerp(crossY, indexTip.y, smoothFactor);
      drawCrosshair(crossX, crossY);
      detectShooting(indexTip.y);
    }
  } else {
    gunDetected = false;
  }
  
  // 更新并绘制鸭子
  moveDuck();
  drawDuck();
  
  // 更新并绘制分数弹出提示
  updateScorePopups();
  
  // 绘制 HUD（得分、关卡、击杀数）
  drawHUD();
  
  // 显示“开枪!”提示
  if (shotDisplayTimer > 0) {
    drawShotInfo();
    shotDisplayTimer--;
  }
  
  if (shootCooldown > 0) shootCooldown--;
  
  // 更新狗动画
  updateDog();
  
  // 关卡完成后显示 NEXT LEVEL 提示
  if (nextLevelTimer > 0) {
    drawNextLevelMessage();
    nextLevelTimer--;
  }
  
  // 应用整体视觉后处理效果（老 TV、扫描线、噪点与 glitch 效果）
  applyVisualEffects();
}

// ----------------------
// 开始画面绘制（增加英文玩法说明）
// ----------------------
function drawStartScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  
  // 标题
  textSize(48);
  fill(255);
  text("Duck Hunt REMIX", width/2, height/2 - 100);
  
  // 英文玩法说明
  textSize(20);
  fill(200);
  let instructions = "Use your hand to aim and shoot the ducks.\n" +
                     "Raise your hand upward to fire.\n" +
                     "Hit the ducks to score points and advance levels.\n" +
                     "Beware, the game gets harder with each level.";
  text(instructions, width/2, height/2 - 20);
  
  // 提示进入游戏
  textSize(24);
  fill(255, 200, 0);
  text("Press ENTER to start", width/2, height/2 + 100);
  
  // 添加视觉后处理效果
  applyVisualEffects();
}

// ----------------------
// 键盘事件：按下 Enter 进入游戏，并启动背景音乐
// ----------------------
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "play";
    if (bgMusic && bgMusic.isLoaded()) {
      bgMusic.loop();
    }
  }
}

// ----------------------
// HandPose 回调
// ----------------------
function gotHands(results) {
  hands = results;
}

// ----------------------
// Duck Hunt 游戏逻辑
// ----------------------
function resetDuck() {
  duckX = -duckWidth;
  duckY = random(height * 0.2, height * 0.6);
  duckState = "flying";
  duckFallVelocity = 0;
  duckRotation = 0;
}

function moveDuck() {
  if (duckState === "flying") {
    duckX += duckSpeed;
    if (duckX > width + duckWidth) resetDuck();
  }
}

function drawDuck() {
  if (duckState === "flying") {
    if (duckImg) {
      image(duckImg, duckX, duckY, duckWidth, duckHeight);
    } else {
      fill(255, 255, 0);
      noStroke();
      ellipse(duckX + duckWidth/2, duckY + duckHeight/2, duckWidth, duckHeight);
    }
  } else if (duckState === "falling") {
    duckY += duckFallVelocity;
    duckFallVelocity += 0.5;
    duckRotation += 0.1;
    push();
    translate(duckX + duckWidth/2, duckY + duckHeight/2);
    rotate(duckRotation);
    if (duckImg) {
      imageMode(CENTER);
      image(duckImg, 0, 0, duckWidth, duckHeight);
      imageMode(CORNER);
    } else {
      fill(255, 255, 0);
      noStroke();
      ellipse(0, 0, duckWidth, duckHeight);
    }
    pop();
    if (duckY > height) {
      resetDuck();
      if (killsThisLevel >= killsNeeded) {
        nextLevelTimer = 120;
        currentLevel++;
        killsNeeded += 2;
        killsThisLevel = 0;
        duckSpeed += 1;
      }
    }
  }
}

function updateScorePopups() {
  for (let i = scorePopups.length - 1; i >= 0; i--) {
    let popup = scorePopups[i];
    popup.y -= 1;
    popup.timer--;
    let alpha = map(popup.timer, 0, 60, 0, 255);
    push();
    fill(255, 255, 255, alpha);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(popup.value, popup.x, popup.y);
    pop();
    if (popup.timer <= 0) scorePopups.splice(i, 1);
  }
}

// ----------------------
// 枪势检测与射击
// ----------------------
function isGunGesture(hand) {
  if (!hand || !hand.keypoints) return false;
  
  let palmBase = hand.keypoints[0];
  let thumbTip = hand.keypoints[4];
  let indexTip = hand.keypoints[8];
  let middleTip = hand.keypoints[12];
  let ringTip = hand.keypoints[16];
  let pinkyTip = hand.keypoints[20];
  if (!palmBase || !thumbTip || !indexTip || !middleTip || !ringTip || !pinkyTip) return false;
  
  let distIndexPalm = dist(indexTip.x, indexTip.y, palmBase.x, palmBase.y);
  let distMiddlePalm = dist(middleTip.x, middleTip.y, palmBase.x, palmBase.y);
  let indexExtended = distIndexPalm > (distMiddlePalm + 10);
  
  let thumbIndexDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
  let thumbOpen = thumbIndexDist > 30;
  
  let mr = dist(middleTip.x, middleTip.y, ringTip.x, ringTip.y);
  let rp = dist(ringTip.x, ringTip.y, pinkyTip.x, pinkyTip.y);
  let folded = (mr + rp) < 100;
  
  return indexExtended && thumbOpen && folded;
}

function detectShooting(currentIndexY) {
  if (prevIndexY === null) {
    prevIndexY = currentIndexY;
    return;
  }
  if (shootCooldown > 0) {
    prevIndexY = currentIndexY;
    return;
  }
  let diff = prevIndexY - currentIndexY;
  if (diff > 15) {
    shootCooldown = cooldownMax;
    shoot();
  }
  prevIndexY = currentIndexY;
}

function shoot() {
  let duckCenterX = duckX + duckWidth/2;
  let duckCenterY = duckY + duckHeight/2;
  let d = dist(crossX, crossY, duckCenterX, duckCenterY);
  
  // 播放开枪音频
  if (gunSound && gunSound.isLoaded()) {
    gunSound.play();
  }
  
  if (d < duckWidth) {
    score += 100;
    killsThisLevel++;
    scorePopups.push({
      x: duckCenterX,
      y: duckCenterY,
      value: "+100",
      timer: 60
    });
    duckState = "falling";
    duckFallVelocity = 5;
    duckRotation = 0;
    dogState = "pickup";
    dogAnimProgress = 0;
  } else {
    dogState = "laugh";
    dogAnimProgress = 0;
  }
  shotDisplayTimer = 30;
}

// ----------------------
// 狗动画更新与绘制
// ----------------------
function updateDog() {
  if (dogState === "none") return;
  dogAnimProgress += 1/60;
  if (dogState === "pickup") {
    let targetY = height - dogPickup.height - 50;
    let currentY = lerp(height, targetY, dogAnimProgress);
    let currentX = width/2 - dogPickup.width/2;
    let alpha = 255;
    if (dogAnimProgress > 0.8) {
      alpha = map(dogAnimProgress, 0.8, 1, 255, 0);
    }
    push();
    tint(255, alpha);
    image(dogPickup, currentX, currentY, dogPickup.width, dogPickup.height);
    pop();
    if (dogAnimProgress >= 1) dogState = "none";
  } else if (dogState === "laugh") {
    let currentX = width/2 - dogLaugh.width/2;
    let currentY = height - dogLaugh.height;
    let alpha = 255;
    if (dogAnimProgress > 0.7) {
      alpha = map(dogAnimProgress, 0.7, 1, 255, 0);
    }
    push();
    tint(255, alpha);
    image(dogLaugh, currentX, currentY, dogLaugh.width, dogLaugh.height);
    pop();
    if (dogAnimProgress >= 1) dogState = "none";
  }
}

// ----------------------
// NEXT LEVEL 提示绘制
// ----------------------
function drawNextLevelMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(48);
  let flashAlpha = 255 * abs(sin(frameCount * 0.1));
  fill(255, flashAlpha);
  text("NEXT LEVEL", width/2, height/2);
  pop();
}

// ----------------------
// HUD 与准星绘制
// ----------------------
function drawCrosshair(x, y) {
  stroke(255, 0, 0);
  strokeWeight(3);
  line(x - 15, y, x + 15, y);
  line(x, y - 15, x, y + 15);
}

function drawHUD() {
  noStroke();
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Level: " + currentLevel, 20, 50);
  text("Kills: " + killsThisLevel + "/" + killsNeeded, 20, 80);
}

function drawShotInfo() {
  fill(255, 0, 0);
  textSize(24);
  textAlign(RIGHT, BOTTOM);
  text("FIRE!", width - 10, height - 10);
  textAlign(LEFT, BASELINE);
}

// ----------------------
// 视觉后处理效果（老 TV、扫描线、噪点与 glitch 效果）
// ----------------------
function applyVisualEffects() {
  filter(POSTERIZE, 3);
  push();
  noStroke();
  fill(0, 50);
  for (let y = 0; y < height; y += 4) {
    rect(0, y, width, 1);
  }
  pop();
  push();
  noStroke();
  for (let i = 0; i < 30; i++) {
    fill(random(255), random(255), random(255), 50);
    ellipse(random(width), random(height), random(2, 6));
  }
  pop();
  if (frameCount % 120 < 10) {
    push();
    let glitchX = random(-10, 10);
    let glitchY = random(-10, 10);
    copy(get(), glitchX, glitchY, width, height, 0, 0, width, height);
    pop();
  }
}

