// ========== 해탈 화면 ==========
class EndScreen {
  constructor() {
    this.buttonX = 0;
    this.buttonY = 0;
    this.buttonW = 220;
    this.buttonH = 60;
  }

  show() {
    background(255, 255, 250);

    // 해탈 메시지
    fill(0);
    noStroke();
    textSize(48);
    text("당신은 해탈하였습니다", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80);

    textSize(28);
    fill(50);
    text("수고하셨습니다.", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);

    textSize(20);
    fill(100);
    text(
      "깨끗한 마음으로 세상을 바라보세요.",
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 30
    );

    // 다시 시작하기 버튼
    this.buttonX = GAME_WIDTH / 2 - this.buttonW / 2;
    this.buttonY = GAME_HEIGHT / 2 + 100;

    let isHover =
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH;

    if (isHover) {
      fill(100, 100, 150);
    } else {
      fill(80, 80, 120);
    }

    stroke(0);
    strokeWeight(2);
    rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, 10);

    fill(255);
    noStroke();
    textSize(24);
    text("다시 시작하기", GAME_WIDTH / 2, this.buttonY + this.buttonH / 2);
  }

  handleClick() {
    if (
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH
    ) {
      changeState("start");
    }
  }
}
