// =========================================================
// [데이터 섹션]
// =========================================================
let rawHeadlines = [
  "콜드플레이 공연서 ‘불륜’ 발각 된 CEO... 각종 패러디 쏟아졌다",
  "처벌 피하며, 불륜 소문내고 싶다면 법무법인 통해 회사에 내용증명 보내라, 사실일까?",
  "박하선, 상간녀 소송까지 진행 중인데 웃는 외도남에 '무섭다'",
  "'마약 투약' 유아인, 실형 면했다고 벌써 복귀? 장재현 영화 출연설 [공식]",
  "울산서 집단 마약 투약 혐의 베트남인 7명 체포",
  "지인에게 흉기 휘두른 60대 남성 입건…살인미수 혐의",
  "김치냉장고에 여친 시신 유기한 40대… 검찰, 무기징역 구형",
  "어선 조리장, 선장 가혹행위 방조·시신 유기…대법, 징역 4년 확정",
  "'에드 시런 파경 암시' 충격, 신곡서 “가정 불화” 털어놔",
  "‘택시가 눈 앞에 멈췄다는 이유로’... 수차례 ‘묻지마 폭행’",
  "여성 묻지마 폭행·행인 도끼 위협…檢, 이상동기 범죄자들 직구속 기소",
  "부모 폭행하다 형한테 맞자 가족 3명 모두 살해…30대 기소",
  "아들 총기 살해 '패륜' 父…“비속살해죄 없어 존속살해죄도 폐지”",
  "“성폭행 이혼 뒤, 유흥비 끊겨”…생일상 차린 아들 살해 60대, 사형 구형",
  "리버풀 우승 퍼레이드 '차량 돌진' 범인 징역 21년6개월 선고",
  "아내 친구를 강제추행한 남편···법원, ´도주 우려´ 법정구속",
  "176억 원 사기에도 법정구속 면했다…청연한방병원장 1심서 징역 4년e",
  "사제 총기로 아들 쏜 60대 아버지…1심 사형 선고 여부 촉각t",
  "분당서 행인 6명에 '묻지마 폭행'…50대 남성 검거",
  "은종, 윤딴딴과 6년만 파경…“외도·폭행 있었다” 충격 고백",
  "후쿠오카에서 2명 흉기에 찔려, 30세 용의자 살인미수혐의로 체포",
  "지적장애 자매 성폭행 혐의 장애인센터 전 간부 구속영장 재신청",
];

let splitHeadlines = [];
for (let line of rawHeadlines) {
  let words = line.split(" ");
  for (let i = 0; i < words.length; i++) {
    splitHeadlines.push(words[i]);
  }
}

let shortWords = [
  "개자식",
  "ㅆㅂ",
  "ㅂㅅ",
  "지랄",
  "쓰레기",
  "젠장",
  "지옥",
  "창녀",
  "창놈",
  "바보",
  "멍청이",
  "헛소리",
  "닥쳐",
  "꺼져",
  "방귀",
  "개새끼",
  "미친놈",
  "망할",
  "빌어먹을",
  "염병",
  "후레자식",
  "쌍놈",
  "개돼지",
  "또라이",
  "미친년",
  "ㄱㄹ",
  "ㅅㅂ",
  "혐오",
  "차별",
  "증오",
  "죽음",
  "살인",
  "폭력",
  "파괴",
  "절망",
  "고통",
  "분노",
  "악플",
  "패륜",
  "사기꾼",
  "거짓말쟁이",
  "범죄자",
  "살인마",
  "변태",
  "폐급",
  "찌질이",
  "기생충",
  "진드기",
  "쥐새끼",
  "하등한",
  "천한",
  "더러운",
  "추한",
  "악질",
  "망종",
  "불륜",
  "외도",
  "바람",
  "엉덩이",
  "똥",
  "오줌",
  "ㄴㄱㅁ",
  "ㅆㅆㄲ",
  "죽어",
  "자살",
  "쌰갈",
];

// [추가] 열반 관련 메시지
let nirvanaWords = [
  "윤회에서 벗어났다.",
  "번뇌가 소멸되었다.",
  "아집에서 벗어났다.",
  "깨달음을 얻었다.",
  "반야에 다다랐다.",
  "해탈에 이르렀다.",
];

// =========================================================
// [CLASS] CleaningScreen
// =========================================================
class CleaningScreen {
  constructor() {
    this.videoX = 49;
    this.videoY = 43;
    this.videoW = 240;
    this.videoH = 180;
    this.availableNirvanaWords = []; // 사용 가능한 열반 메시지 (각 1번씩만)

    // 게임 오브제 리스트
    this.bags = [];
    this.webs = [];
    this.stains = [];

    // 먼지 시스템
    this.dustSystem = null;

    // 타겟 변수
    this.currentBagTarget = null;
    this.currentStainTarget = null;
    this.currentWebTarget = null;

    // 제스처 변수
    this.prevKeypoints = null;
    this.currentGesture = "none";
    this.gestureStrength = 0;

    this.initialized = false;

    // [추가] 열반 상태 변수
    this.nirvanaMessages = []; // 사라진 자리에 뜨는 메시지들
    this.allCleaned = false; // 모든 청소 완료 여부
    this.whiteFadeAlpha = 0; // 화면 하얗게 페이드인/아웃 투명도
    this.nirvanaStartTime = 0; // 열반 시작 시간
    this.isReturning = false; // 초기 화면으로 돌아가는 중인지
  }

  reset() {
    this.bags = [];
    this.webs = [];
    this.stains = [];
    this.dustSystem = null;
    this.currentBagTarget = null;
    this.currentStainTarget = null;
    this.currentWebTarget = null;
    this.prevKeypoints = null;
    this.currentGesture = "none";
    this.gestureStrength = 0;
    this.nirvanaMessages = [];
    this.allCleaned = false;
    this.whiteFadeAlpha = 0;
    this.nirvanaStartTime = 0;
    this.isReturning = false;
    this.initialized = false;
    this.availableNirvanaWords = [];
  }

  initializeGame() {
    if (this.initialized) return;

    // 방 구조 계산
    let wallW = GAME_WIDTH * 0.4;
    let wallH = GAME_HEIGHT * 0.4;
    let roomTL = createVector(
      (GAME_WIDTH - wallW) / 2,
      (GAME_HEIGHT - wallH) / 2
    );
    let roomTR = createVector(
      (GAME_WIDTH - wallW) / 2 + wallW,
      (GAME_HEIGHT - wallH) / 2
    );
    let floorTop = (GAME_HEIGHT - wallH) / 2 + wallH;
    let wallX = roomTL.x;
    let wallRight = roomTR.x;

    // 1. 얼룩
    this.stains.push(new Stain(GAME_WIDTH * 0.53, GAME_HEIGHT * 0.15, 90, 35));
    this.stains.push(new Stain(GAME_WIDTH * 0.43, GAME_HEIGHT * 0.45, 50, 45));
    this.stains.push(new Stain(GAME_WIDTH * 0.22, GAME_HEIGHT * 0.6, 35, 45));
    this.stains.push(new Stain(GAME_WIDTH * 0.35, GAME_HEIGHT * 0.85, 80, 30));
    this.stains.push(new Stain(GAME_WIDTH * 0.88, GAME_HEIGHT * 0.5, 40, 100));

    // 2. 쓰레기봉투
    this.bags.push(new TrashBag(wallX + 5, floorTop + 5, 0.6));
    this.bags.push(new TrashBag(wallRight - 50, floorTop + 25, 0.65));
    this.bags.push(new TrashBag(GAME_WIDTH * 0.15, GAME_HEIGHT * 0.88, 1.0));
    this.bags.push(new TrashBag(GAME_WIDTH * 0.54, GAME_HEIGHT * 0.85, 1.1));
    this.bags.push(new TrashBag(GAME_WIDTH * 0.75, GAME_HEIGHT * 0.87, 1.05));
    this.bags.push(new TrashBag(GAME_WIDTH * 0.4, GAME_HEIGHT * 0.75, 0.75));
    this.bags.sort((a, b) => a.center.y - b.center.y);

    // 3. 거미줄
    this.webs.push(new OrganicWeb(roomTL.x, roomTL.y, 50, "topLeft"));
    this.webs.push(new OrganicWeb(roomTR.x, roomTR.y, 50, "topRight"));
    this.webs.push(
      new OrganicWeb(GAME_WIDTH * 0.92, GAME_HEIGHT * 0.15, 45, "topRight")
    );

    // 4. 먼지 시스템
    this.dustSystem = new DustSystem(30);

    this.initialized = true;

    // 열반 메시지 풀 초기화 (섞어서)
    this.availableNirvanaWords = [...nirvanaWords].sort(
      () => Math.random() - 0.5
    );

    // [추가] 재시작 시 상태 초기화
    this.nirvanaMessages = [];
    this.allCleaned = false;
    this.whiteFadeAlpha = 0;
    this.nirvanaStartTime = 0;
    this.isReturning = false;
  }

  show() {
    if (!this.initialized) this.initializeGame();

    // 1. 기본 배경 및 오브제 그리기
    background(0);
    this.drawRoomBackground();

    // 감지 및 제스처 업데이트 (청소가 다 안 끝났을 때만)
    if (!this.allCleaned) {
      this.handleDetection();
      if (this.currentGesture !== "none") {
        this.applyGestureEffect(this.currentGesture, this.gestureStrength);
      }
      this.checkAllCleaned(); // 모든 청소가 끝났는지 확인
    }

    // --- [수정된 부분] 얼룩 처리 ---
    for (let i = this.stains.length - 1; i >= 0; i--) {
      this.stains[i].show();
      if (this.stains[i].opacity <= 0) {
        if (this.availableNirvanaWords.length > 0) {
          let message = this.availableNirvanaWords.pop();
          this.nirvanaMessages.push(
            new NirvanaMessage(this.stains[i].cx, this.stains[i].cy, message)
          );
        }
        this.stains.splice(i, 1);
      }
    }

    if (this.dustSystem) this.dustSystem.show();

    // --- [수정된 부분] 거미줄 처리 ---
    for (let i = this.webs.length - 1; i >= 0; i--) {
      this.webs[i].show();
      if (this.webs[i].opacity <= 0) {
        if (this.availableNirvanaWords.length > 0) {
          let message = this.availableNirvanaWords.pop();
          this.nirvanaMessages.push(
            new NirvanaMessage(this.webs[i].cx, this.webs[i].cy, message)
          );
        }
        this.webs.splice(i, 1);
      }
    }

    // --- [수정된 부분] 쓰레기봉투 처리 ---
    for (let i = this.bags.length - 1; i >= 0; i--) {
      this.bags[i].show();
      if (this.bags[i].opacity <= 0) {
        if (this.availableNirvanaWords.length > 0) {
          let message = this.availableNirvanaWords.pop();
          this.nirvanaMessages.push(
            new NirvanaMessage(
              this.bags[i].center.x,
              this.bags[i].center.y,
              message
            )
          );
        }
        this.bags.splice(i, 1);
      }
    }

    this.drawCameraFeedback();
    if (!this.allCleaned) this.drawUI();

    // 열반 메시지 표시
    for (let i = this.nirvanaMessages.length - 1; i >= 0; i--) {
      this.nirvanaMessages[i].show();
      if (this.nirvanaMessages[i].dead) {
        this.nirvanaMessages.splice(i, 1);
      }
    }

    if (this.allCleaned) {
      // 1. 화면 페이드 인 (하얗게)
      if (!this.isReturning && this.whiteFadeAlpha < 255) {
        this.whiteFadeAlpha += 2;
        if (this.whiteFadeAlpha >= 255) {
          this.whiteFadeAlpha = 255;
          this.nirvanaStartTime = millis();
        }
      }

      // 흰색 레이어 그리기 (완전히 덮기)
      fill(255, this.whiteFadeAlpha);
      noStroke();
      rect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // 2. 최종 메시지 표시 및 대기
      if (this.whiteFadeAlpha === 255 && !this.isReturning) {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(
          "당신은 열반에 도달하였습니다.\n부디 평안하길 바랍니다.",
          GAME_WIDTH / 2,
          GAME_HEIGHT / 2
        );

        // 5초 대기 후 복귀 시작
        if (millis() - this.nirvanaStartTime > 5000) {
          this.isReturning = true;
        }
      }

      // 3. 초기 화면으로 즉시 복귀 (페이드 아웃 없이)
      if (this.isReturning) {
        // 상태 완전 초기화
        this.reset();
        // sketch.js의 gameState 직접 변경 (페이드 없이)
        gameState = "start";
      }
    }
  }

  checkAllCleaned() {
    if (this.allCleaned) return;

    let noStains = this.stains.length === 0;
    let noWebs = this.webs.length === 0;
    let noBags = this.bags.length === 0;
    // 먼지 시스템이 있고, 파티클이 없어야 함
    let noDust = this.dustSystem && this.dustSystem.particles.length === 0;

    if (noStains && noWebs && noBags && noDust) {
      this.allCleaned = true;
    }
  }

  handleDetection() {
    let result = { gesture: "none", strength: 0 };

    // 1. Face Gesture
    if (faces.length > 0) {
      let faceRes = this.detectFaceGesture(faces[0]);
      if (faceRes.gesture !== "none") {
        result = faceRes;
      }
    }

    // 2. Body Pose
    if (result.gesture === "none" && poses.length > 0) {
      result = this.detectBodyGesture(poses[0].keypoints);
    }

    this.currentGesture = result.gesture;
    this.gestureStrength = result.strength;
  }

  detectFaceGesture(face) {
    let kp = face.keypoints;
    if (!kp) return { gesture: "none", strength: 0 };

    let leftEye = kp[33];
    let rightEye = kp[263];
    let topLip = kp[13];
    let bottomLip = kp[14];
    let leftMouth = kp[61];
    let rightMouth = kp[291];

    if (
      !leftEye ||
      !rightEye ||
      !topLip ||
      !bottomLip ||
      !leftMouth ||
      !rightMouth
    )
      return { gesture: "none", strength: 0 };

    // 얼굴 거리 - 가까이 있을 때
    let eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    let isClose = eyeDist > 50; // 더 넓은 범위

    // 입 모양 - 오므린 모양 또는 열린 입 모두 허용
    let mouthH = dist(topLip.x, topLip.y, bottomLip.x, bottomLip.y);

    // 입이 조금이라도 움직이면
    let isMouthActive = mouthH > 5;

    if (isClose && isMouthActive) {
      return { gesture: "blowDust", strength: 2.0 };
    }

    return { gesture: "none", strength: 0 };
  }

  detectBodyGesture(keypoints) {
    let nose = keypoints[0];
    let leftWrist = keypoints[9];
    let rightWrist = keypoints[10];
    let rightShoulder = keypoints[6];
    let rightElbow = keypoints[8];

    if (rightWrist.confidence < 0.3) {
      return { gesture: "none", strength: 0 };
    }

    if (!this.prevKeypoints) {
      this.prevKeypoints = keypoints;
      return { gesture: "none", strength: 0 };
    }

    let prevLeftWrist = this.prevKeypoints[9];
    let prevRightWrist = this.prevKeypoints[10];
    let avgWristY = (leftWrist.y + rightWrist.y) / 2;
    let prevAvgWristY = (prevLeftWrist.y + prevRightWrist.y) / 2;

    // 1. 쓰레기봉투
    let wristDist = dist(leftWrist.x, leftWrist.y, rightWrist.x, rightWrist.y);
    let downwardSpeed = avgWristY - prevAvgWristY;

    if (
      leftWrist.confidence > 0.3 &&
      wristDist < 250 &&
      downwardSpeed > 2 &&
      downwardSpeed < 15
    ) {
      this.prevKeypoints = keypoints;
      return {
        gesture: "pressDown",
        strength: constrain(downwardSpeed / 10, 0.3, 1),
      };
    }

    // 2. 얼룩 (오른팔 들고 좌우 흔들기)
    let rightArmRaised = rightWrist.y < rightElbow.y + 30;
    let rightHorizontalSpeed = abs(rightWrist.x - prevRightWrist.x);

    if (rightArmRaised && rightHorizontalSpeed > 8) {
      this.prevKeypoints = keypoints;
      return {
        gesture: "waveHands",
        strength: constrain(rightHorizontalSpeed / 20, 0.4, 1.2),
      };
    }

    // 3. 거미줄
    let wasHigh = prevAvgWristY < nose.y + 20;
    let pullSpeed = avgWristY - prevAvgWristY;

    if (leftWrist.confidence > 0.3 && wasHigh && pullSpeed > 15) {
      this.prevKeypoints = keypoints;
      return {
        gesture: "waveArms",
        strength: constrain(pullSpeed / 25, 0.5, 1.0),
      };
    }

    this.prevKeypoints = keypoints;
    return { gesture: "none", strength: 0 };
  }

  applyGestureEffect(gesture, strength) {
    if (gesture === "blowDust") {
      if (this.dustSystem) {
        // 기존: frameCount % 20 === 0 && 5개씩
        // 변경: frameCount % 5 === 0 && 10개씩 (4배 빠름)
        if (frameCount % 20 === 0 && this.dustSystem.particles.length > 0) {
          this.dustSystem.clean(10);
        }
      }
    } else if (gesture === "waveHands") {
      if (!this.currentStainTarget || this.currentStainTarget.opacity <= 0) {
        let livingStains = this.stains.filter((s) => s.opacity > 0);
        this.currentStainTarget =
          livingStains.length > 0 ? random(livingStains) : null;
      }
      if (this.currentStainTarget) {
        // 기존: 5 * strength
        // 변경: 20 * strength (4배 빠름)
        this.currentStainTarget.opacity -= 5 * strength;
        if (this.currentStainTarget.opacity <= 0)
          this.currentStainTarget = null;
      }
    } else if (gesture === "pressDown") {
      if (!this.currentBagTarget || this.currentBagTarget.opacity <= 0) {
        let livingBags = this.bags.filter((b) => b.opacity > 0);
        this.currentBagTarget =
          livingBags.length > 0 ? random(livingBags) : null;
      }
      if (this.currentBagTarget) {
        // 기존: 5 * strength
        // 변경: 20 * strength (4배 빠름)
        this.currentBagTarget.opacity -= 5 * strength;
        if (this.currentBagTarget.opacity <= 0) this.currentBagTarget = null;
      }
    } else if (gesture === "waveArms") {
      if (!this.currentWebTarget || this.currentWebTarget.opacity <= 0) {
        let livingWebs = this.webs.filter((w) => w.opacity > 0);
        this.currentWebTarget =
          livingWebs.length > 0 ? random(livingWebs) : null;
      }
      if (this.currentWebTarget) {
        // 기존: 15 * strength
        // 변경: 60 * strength (4배 빠름)
        this.currentWebTarget.opacity -= 15 * strength;
        if (this.currentWebTarget.opacity <= 0) this.currentWebTarget = null;
      }
    }
  }

  drawRoomBackground() {
    stroke(255, 50);
    strokeWeight(1);
    noFill();
    let wallW = GAME_WIDTH * 0.4;
    let wallH = GAME_HEIGHT * 0.4;
    let wallX = (GAME_WIDTH - wallW) / 2;
    let wallY = (GAME_HEIGHT - wallH) / 2;
    rect(wallX, wallY, wallW, wallH);
    line(0, 0, wallX, wallY);
    line(GAME_WIDTH, 0, wallX + wallW, wallY);
    line(0, GAME_HEIGHT, wallX, wallY + wallH);
    line(GAME_WIDTH, GAME_HEIGHT, wallX + wallW, wallY + wallH);
  }

  drawCameraFeedback() {
    push();
    fill(0);
    stroke(255);
    strokeWeight(2);
    rect(this.videoX, this.videoY, this.videoW, this.videoH);

    if (poses.length > 0) {
      let pose = poses[0];
      push();
      translate(this.videoX, this.videoY);
      const upperBodyIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      if (typeof connections !== "undefined") {
        for (let i = 0; i < connections.length; i++) {
          let connection = connections[i];
          let indexA = connection[0];
          let indexB = connection[1];
          if (
            upperBodyIndices.includes(indexA) &&
            upperBodyIndices.includes(indexB)
          ) {
            let a = pose.keypoints[indexA];
            let b = pose.keypoints[indexB];
            if (a.confidence > 0.1 && b.confidence > 0.1) {
              stroke(255);
              strokeWeight(2);
              line(a.x, a.y, b.x, b.y);
            }
          }
        }
      }
      for (let i = 0; i < pose.keypoints.length; i++) {
        if (upperBodyIndices.includes(i)) {
          let keypoint = pose.keypoints[i];
          if (keypoint.confidence > 0.1) {
            fill(255);
            noStroke();
            ellipse(keypoint.x, keypoint.y, 8, 8);
          }
        }
      }
      pop();
    }
    this.drawHands();
    this.drawFace();
    pop();
  }

  drawHands() {
    if (hands.length > 0) {
      push();
      translate(this.videoX, this.videoY);
      for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
          let keypoint = hand.keypoints[j];
          fill(255);
          noStroke();
          ellipse(keypoint.x, keypoint.y, 6, 6);
        }
      }
      pop();
    }
  }

  drawFace() {
    // 얼굴: 입모양 + 실루엣만 (기존 최적화 유지)
    if (faces.length > 0) {
      push();
      translate(this.videoX, this.videoY);
      let face = faces[0];

      let faceIndices = [
        // 얼굴 실루엣
        10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365,
        379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234,
        127, 162, 21, 54, 103, 67, 109,
        // 입술
        61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 146, 91, 181, 84, 17,
        314, 405, 321, 375, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
        324, 318, 402, 317, 14, 87, 178, 88, 95,
      ];

      for (let i of faceIndices) {
        let keypoint = face.keypoints[i];
        if (keypoint) {
          fill(255);
          noStroke();
          ellipse(keypoint.x, keypoint.y, 2, 2);
        }
      }
      pop();
    }
  }

  drawUI() {
    fill(255);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);

    let uiY = this.videoY + this.videoH + 20;
    let gestureName = "대기 중";

    if (this.currentGesture === "pressDown") gestureName = "쓰레기 누르기";
    else if (this.currentGesture === "waveHands") gestureName = "얼룩 닦기";
    else if (this.currentGesture === "waveArms") gestureName = "거미줄 뜯기";
    else if (this.currentGesture === "blowDust") gestureName = "먼지 불기";

    text("현재 동작: " + gestureName, this.videoX, uiY);

    let stainCount = this.stains.length;
    let webCount = this.webs.length;
    let bagCount = this.bags.length;
    let dustCount = this.dustSystem ? this.dustSystem.particles.length : 0;

    text("얼룩: " + stainCount, this.videoX, uiY + 40);
    text("거미줄: " + webCount, this.videoX, uiY + 60);
    text("쓰레기: " + bagCount, this.videoX, uiY + 80);
    text("먼지: " + dustCount, this.videoX, uiY + 100);

    textSize(12);
    text("제스처 방법", this.videoX, uiY + 130);
    text("먼지 : 얼굴을 가까이 하고 '후' 불기", this.videoX, uiY + 150);
    text(
      "쓰레기 : 양손이 아래를 향하게 하고 천천히 아래로 누르기",
      this.videoX,
      uiY + 170
    );
    text(
      "얼룩 : 오른쪽 팔을 들고 손을 펼쳐 좌우로 흔들기",
      this.videoX,
      uiY + 190
    );
    text("거미줄 : 높이 든 두 손을 아래로 확 당기기", this.videoX, uiY + 210);
  }
}

// =========================================================
// [CLASS] Helper Classes
// =========================================================

// [추가] 열반 메시지 클래스
class NirvanaMessage {
  constructor(x, y, message) {
    this.x = x;
    this.y = y;
    this.message = message; // 외부에서 받음
    this.alpha = 255;
    this.dead = false;
  }

  show() {
    if (this.dead) return;
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, this.alpha);
    noStroke();
    text(this.message, this.x, this.y);
    pop();

    this.alpha -= 3;
    if (this.alpha <= 0) {
      this.dead = true;
    }
  }
}

// Stain: 천천히 흐르는 효과 추가
class Stain {
  constructor(cx, cy, w, h) {
    this.cx = cx; // 중심 좌표 저장
    this.cy = cy;
    this.particles = [];
    this.opacity = 255;
    let maxRadiusW = w * 1.5;
    let maxRadiusH = h * 1.5;
    let shapeNoiseOffset = random(1000);
    let attempt = 0;
    let maxAttempts = 1500;

    while (this.particles.length < 60 && attempt < maxAttempts) {
      attempt++;
      let angle = random(TWO_PI);
      let r = sqrt(random()) * 1.0;
      let noiseVal = noise(
        cos(angle) * 50 + 10,
        sin(angle) * 20 + 10,
        shapeNoiseOffset
      );
      let limitRadiusFactor = map(noiseVal, 0, 1, 0.3, 1.0);
      let pX = cx + cos(angle) * (maxRadiusW * r);
      let pY = cy + sin(angle) * (maxRadiusH * r);

      if (r > limitRadiusFactor) continue;

      let word = random(shortWords);
      let size = random(5, 10);
      let overlapping = false;
      let myRadius = size * 0.6 + 2;

      for (let other of this.particles) {
        let d = dist(pX, pY, other.x, other.y);
        if (d < myRadius + other.radius) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        this.particles.push({
          x: pX,
          y: pY,
          word: word,
          size: size,
          radius: myRadius,
          baseAlpha: random(180, 255),
          rot: random(-0.5, 0.5),
          dripSpeed: random(0.02, 0.1) * (size / 10),
        });
      }
    }
  }

  show() {
    if (this.opacity <= 0) return;
    push();
    for (let p of this.particles) {
      let alpha = map(this.opacity, 0, 255, 0, p.baseAlpha);
      if (alpha < 5) continue;

      let flowNoise = noise(p.x * 0.01, p.y * 0.01, frameCount * 0.005);
      p.y += p.dripSpeed * (1 + flowNoise);

      fill(255, alpha);
      noStroke();
      textSize(p.size);
      push();
      translate(p.x, p.y);
      rotate(p.rot);
      textAlign(CENTER, CENTER);
      text(p.word, 0, 0);
      pop();
    }
    pop();
  }
}

class TrashBag {
  constructor(x, y, scale) {
    this.center = createVector(x, y);
    this.scale = scale;
    this.particles = [];
    this.opacity = 255;
    let gap = 18 * scale;
    let maxR = 65 * scale;

    for (let py = -180 * scale; py <= 40 * scale; py += gap) {
      for (let px = -maxR; px <= maxR; px += gap) {
        let isValid = false;
        let hRatio = map(py, 40 * scale, -180 * scale, 0, 1);
        let currentRadius = 0;
        if (hRatio < 0.1) {
          currentRadius = maxR * 0.8;
        } else if (hRatio < 0.75) {
          currentRadius = maxR * (0.9 + sin(hRatio * PI) * 0.1);
        } else {
          currentRadius = maxR * 0.3;
        }
        if (abs(px) < currentRadius) {
          isValid = true;
        }
        if (isValid) {
          this.particles.push({
            x: px + random(-2, 2),
            y: py,
            word: random(splitHeadlines),
            size: random(9, 12) * scale,
            baseAlpha: random(150, 255),
            rot: random(-0.15, 0.15),
          });
        }
      }
    }
  }

  show() {
    if (this.opacity <= 0) return;
    push();
    translate(this.center.x, this.center.y);
    for (let p of this.particles) {
      let alpha = map(this.opacity, 0, 255, 0, p.baseAlpha);
      noStroke();
      fill(255, alpha);
      textSize(p.size);
      push();
      translate(p.x, p.y);
      rotate(p.rot);
      text(p.word, 0, 0);
      pop();
    }
    pop();
  }
}

class OrganicWeb {
  constructor(cx, cy, radius, type) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius * 1.5;
    this.particles = [];
    this.opacity = 255;
    this.swayPhase = random(TWO_PI);

    let ribs = 8;
    let rings = 6;
    let mixedWords = [...splitHeadlines, ...shortWords];
    let baseRotation = 0;
    if (type === "topLeft") baseRotation = -PI / 6;
    if (type === "topRight") baseRotation = PI / 6;
    if (type === "bottomRight") baseRotation = PI / 3;

    let ringVertices = [];
    for (let r = 1; r <= rings; r++) {
      let vertices = [];
      let currentBaseRadius = (this.radius / rings) * r * (1 + r * 0.05);
      for (let i = 0; i < ribs; i++) {
        let angle = baseRotation + (TWO_PI / ribs) * i;
        let angleOffset = random(-0.08, 0.08) * (r * 0.2);
        let radiusOffset = random(-0.1, 0.1) * currentBaseRadius;
        let finalAngle = angle + angleOffset;
        let finalRadius = currentBaseRadius + radiusOffset;
        let vx = this.cx + cos(finalAngle) * finalRadius;
        let vy = this.cy + sin(finalAngle) * finalRadius;
        vertices.push({ x: vx, y: vy, angle: finalAngle });
      }
      ringVertices.push(vertices);
    }
    // Spokes
    let outerVertices = ringVertices[rings - 1];
    for (let i = 0; i < ribs; i++) {
      let endPoint = outerVertices[i];
      let distVal = dist(this.cx, this.cy, endPoint.x, endPoint.y);
      let steps = floor(distVal / 8);
      for (let j = 1; j <= steps; j++) {
        let t = j / steps;
        if (t < 0.15) continue;
        let px = lerp(this.cx, endPoint.x, t);
        let py = lerp(this.cy, endPoint.y, t);
        this.particles.push({
          x: px,
          y: py,
          word: random(mixedWords),
          size: random(3, 6),
          baseAlpha: 240,
          rot: endPoint.angle + PI / 2,
        });
      }
    }
    // Rings
    for (let r = 0; r < rings; r++) {
      let currentVertices = ringVertices[r];
      let curveAmountBase = (this.radius / rings) * (r + 1) * 0.1;
      for (let i = 0; i < ribs; i++) {
        let p1 = currentVertices[i];
        let p2 = currentVertices[(i + 1) % ribs];
        let segDist = dist(p1.x, p1.y, p2.x, p2.y);
        let steps = floor(segDist / 10);
        if (steps < 2) steps = 2;
        let lineAngle = atan2(p2.y - p1.y, p2.x - p1.x);
        for (let k = 0; k <= steps; k++) {
          let t = k / steps;
          let lx = lerp(p1.x, p2.x, t);
          let ly = lerp(p1.y, p2.y, t);
          let curveOffset = sin(t * PI) * curveAmountBase;
          let dirX = this.cx - lx;
          let dirY = this.cy - ly;
          let len = sqrt(dirX * dirX + dirY * dirY);
          dirX /= len;
          dirY /= len;
          let finalX = lx + dirX * curveOffset;
          let finalY = ly + dirY * curveOffset;
          this.particles.push({
            x: finalX,
            y: finalY,
            word: random(mixedWords),
            size: random(4, 6),
            baseAlpha: 220,
            rot: lineAngle + random(-0.05, 0.05),
          });
        }
      }
    }

    for (let p of this.particles) {
      let d = dist(this.cx, this.cy, p.x, p.y);
      let ratio = constrain(d / (this.radius * 1.2), 0, 1);
      p.mobility = pow(1.0 - ratio, 1.5);
    }
  }

  show() {
    if (this.opacity <= 0) return;
    push();

    let time = frameCount * 0.15;
    let baseSwayX = sin(time + this.swayPhase) * 4;
    let baseSwayY = cos(time * 0.9 + this.swayPhase) * 2;

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);

    for (let p of this.particles) {
      let alpha = map(this.opacity, 0, 255, 0, p.baseAlpha);
      if (alpha < 5) continue;

      let mySwayX = baseSwayX * p.mobility;
      let mySwayY = baseSwayY * p.mobility;

      fill(255, alpha);
      textSize(p.size);
      push();
      translate(p.x + mySwayX, p.y + mySwayY);
      rotate(p.rot);
      text(p.word, 0, 0);
      pop();
    }
    pop();
  }
}

class DustSystem {
  constructor(count) {
    this.particles = [];
    let actualCount = count * 2.5;

    let created = 0;
    while (created < actualCount) {
      let isCluster = random() < 0.3 && created < actualCount - 2;
      let clusterX = random(GAME_WIDTH);
      let clusterY = random(GAME_HEIGHT);
      let loop = isCluster ? 3 : 1;

      for (let k = 0; k < loop; k++) {
        this.particles.push({
          x: isCluster ? clusterX + random(-15, 15) : random(GAME_WIDTH),
          y: isCluster ? clusterY + random(-15, 15) : random(GAME_HEIGHT),
          word: random(shortWords),
          size: random(7, 12),
          rot: random(-0.5, 0.5),
          alpha: random(150, 200),
          t: random(1000),
          speed: random(0.2, 0.5),
        });
        created++;
      }
    }
  }

  show() {
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    for (let p of this.particles) {
      p.x += map(noise(p.t), 0, 1, -1, 1) * p.speed * 2;
      p.y += map(noise(p.t + 100), 0, 1, -0.5, 0.5) * p.speed * 2;
      p.t += 0.01;

      if (p.x < -30) p.x = GAME_WIDTH + 30;
      if (p.x > GAME_WIDTH + 30) p.x = -30;
      if (p.y < -30) p.y = GAME_HEIGHT + 30;
      if (p.y > GAME_HEIGHT + 30) p.y = -30;

      fill(220, p.alpha);
      textSize(p.size);
      push();
      translate(p.x, p.y);
      rotate(p.rot);
      text(p.word, 0, 0);
      pop();
    }
    pop();
  }

  // [추가] 청소된 파티클 개수 반환
  clean(amount) {
    let cleaned = 0;
    for (let i = 0; i < amount; i++) {
      if (this.particles.length > 0) {
        let idx = floor(random(this.particles.length));
        this.particles.splice(idx, 1);
        cleaned++;
      }
    }
    return cleaned;
  }
}
