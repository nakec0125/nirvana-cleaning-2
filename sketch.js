// ========== 게임 화면 크기 설정 ==========
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

// ========== 게임 상태 관리 ==========
let gameState = "start"; // "start" → "intro" → "cleaning" → "end"
let fadeAlpha = 0;
let isFading = false;
let nextState = "";

// ========== 화면 객체 ==========
let startScreen, introScreen, cleaningScreen, endScreen;

// ========== 카메라 & BodyPose 변수 (ml5@1.x) ==========
let video;
let bodyPose;
let poses = [];
let connections;

// ========== HandPose & FaceMesh 변수 ==========
let handPose;
let hands = [];
let faceMesh;
let faces = [];

function preload() {
  // 폰트 로드 (필요시)
  bodyPose = ml5.bodyPose({ flipped: true });
  customFont = loadFont("assets/OnulArticleBuri-Regular.otf");
}

// ========== p5.js 메인 함수 ==========
function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  textAlign(CENTER, CENTER);
  textFont(customFont);
  textStyle(BOLD);

  // 카메라 설정
  video = createCapture(VIDEO);
  video.size(240, 180);
  video.hide();

  // BodyPose 초기화 (상체 추적)
  bodyPose.detectStart(video, gotPoses);

  // HandPose 초기화 (손 추적)
  handPose = ml5.handPose({ flipped: true }, handPoseLoaded);

  // FaceMesh 초기화 (얼굴 표정 추적)
  faceMesh = ml5.faceMesh({ flipped: true }, faceMeshLoaded);

  // 각 화면 초기화
  startScreen = new StartScreen();
  introScreen = new IntroScreen();
  cleaningScreen = new CleaningScreen();
  endScreen = new EndScreen();

  connections = bodyPose.getSkeleton();
}

function handPoseLoaded() {
  console.log("HandPose 모델 로드 완료!");
  handPose.detectStart(video, gotHands);
}

function faceMeshLoaded() {
  console.log("FaceMesh 모델 로드 완료!");
  faceMesh.detectStart(video, gotFaces);
}

function gotPoses(results) {
  poses = results;
}

function gotHands(results) {
  hands = results;
}

function gotFaces(results) {
  faces = results;
}

function draw() {
  // 페이드 효과 처리 중
  if (isFading) {
    handleFade();
    return;
  }

  // 상태별 화면 렌더링
  switch (gameState) {
    case "start":
      startScreen.show();
      break;
    case "intro":
      introScreen.show();
      break;
    case "cleaning":
      cleaningScreen.show();
      break;
    case "end":
      endScreen.show();
      break;
  }
}

function mousePressed() {
  if (isFading) return;

  switch (gameState) {
    case "start":
      startScreen.handleClick();
      break;
    case "intro":
      introScreen.handleClick();
      break;
    case "cleaning":
      cleaningScreen.handleClick();
      break;
    case "end":
      endScreen.handleClick();
      break;
  }
}

// ========== 화면 전환 함수 ==========
function changeState(newState) {
  nextState = newState;
  isFading = true;
  fadeAlpha = 0;
}

function handleFade() {
  // 현재 화면 그리기
  switch (gameState) {
    case "start":
      startScreen.show();
      break;
    case "intro":
      introScreen.show();
      break;
    case "cleaning":
      cleaningScreen.show();
      break;
    case "end":
      endScreen.show();
      break;
  }

  // 페이드 아웃 (검은색 오버레이)
  fadeAlpha += 8;
  fill(0, fadeAlpha);
  noStroke();
  rect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // 페이드 완료 후 상태 전환
  if (fadeAlpha >= 255) {
    gameState = nextState;
    isFading = false;
    fadeAlpha = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
