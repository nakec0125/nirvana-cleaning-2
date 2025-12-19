class IntroScreen {
  constructor() {
    this.buttonX = 0;
    this.buttonY = 0;
    this.buttonW = 200;
    this.buttonH = 60;
    this.videoX = 49;
    this.videoY = 43;
    this.videoW = 240;
    this.videoH = 180;
  }

  show() {
    background(0);

    // 왼쪽 상단 흰색 박스 (비디오 영역)
    fill(0);
    stroke(255);
    strokeWeight(2);
    rect(this.videoX, this.videoY, this.videoW, this.videoH);

    // 스켈레톤 그리기 (사용자 지정 함수 적용)
    this.drawSkeleton();

    // 설명 텍스트들
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);

    text(
      "쏟아지는 자극적인 기사, 무분별한 비난과 욕설들. 당신의 내면은 안전한가요?",
      49,
      350
    );

    text(
      "열반 청소는 디지털 독소로 가득 찬 마음의 방을 비우는 인터랙티브 여정입니다.",
      49,
      400
    );
    text(
      "화면을 뒤덮은 부정적인 텍스트들은 당신의 손길 아래 사라집니다. 더러움이 사라진 자리에는",
      49,
      430
    );
    text(
      "마침내 고요하고 텅 빈 열반의 상태에 도달합니다. 복잡한 세상 속 잠시 멈춰 서서",
      49,
      460
    );
    text("당신만의 평온을 되찾는 청소의 시간을 가져보시길 바랍니다.", 49, 490);

    text("청소 방법은 간단합니다.", 49, 540);
    text(
      "화면 왼쪽 상단에 위치한 카메라 화면 그 아래에 쓰여진 청소 제스처를 통해 방을 청소하면 됩니다.",
      49,
      570
    );
    text(
      "청소를 하며 나타나는 텍스트들을 통해 당신의 내면이 정화되고 있음을 시각화할 것입니다.",
      49,
      600
    );

    text("그럼, 당신의 마음에 평온이 깃들길 바랍니다.", 49, 660);

    // ==========================================
    // 청소하기 버튼
    // ==========================================
    this.buttonX = GAME_WIDTH - 249;
    this.buttonY = GAME_HEIGHT - 109;

    let isHover =
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH;

    textAlign(CENTER, CENTER);
    textSize(24);

    if (isHover) {
      fill(255);
      stroke(0);
      strokeWeight(3);
      rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH);

      fill(0);
      noStroke();
      text(
        "청소하기",
        this.buttonX + this.buttonW / 2,
        this.buttonY + this.buttonH / 2
      );
    } else {
      fill(255);
      noStroke();
      text(
        "청소하기",
        this.buttonX + this.buttonW / 2,
        this.buttonY + this.buttonH / 2
      );
    }
  }

  handleClick() {
    if (
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH
    ) {
      changeState("cleaning");
    }
  }

  // =========================================================
  // 요청하신 drawSkeleton 함수 (원본 그대로 적용)
  // =========================================================
  drawSkeleton() {
    // 상체 스켈레톤 그리기 (허리까지만)
    if (poses.length > 0) {
      let pose = poses[0];

      push();
      translate(this.videoX, this.videoY);

      // 상체만 표시할 키포인트 인덱스
      const upperBodyIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      // 스켈레톤 연결선 그리기 (상체만)
      if (typeof connections !== "undefined") {
        // connections 변수 안전장치 추가
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

      // 키포인트 그리기 (상체만)
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
}
