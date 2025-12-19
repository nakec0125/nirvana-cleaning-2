// ========== 시작 화면 ==========
class StartScreen {
  constructor() {
    this.buttonX = 0;
    this.buttonY = 0;
    this.buttonW = 200;
    this.buttonH = 60;
  }

  show() {
    background(0);

    // 영문 제목
    fill(255);
    noStroke();
    textSize(48);
    text("Cleaning for NIRVANA", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100);

    // 한글 제목
    textSize(64);
    text("열반 청소", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // 시작 버튼
    this.buttonX = GAME_WIDTH / 2 - this.buttonW / 2;
    this.buttonY = GAME_HEIGHT / 2 + 150;

    let isHover =
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH;

    if (isHover) {
      fill(255);
      stroke(0);
      strokeWeight(3);
      rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH);

      fill(0);
      noStroke();
      textSize(28);
      text("시작", GAME_WIDTH / 2, this.buttonY + this.buttonH / 2);
    } else {
      fill(255);
      noStroke();
      textSize(28);
      text("시작", GAME_WIDTH / 2, this.buttonY + this.buttonH / 2);
    }
  }

  handleClick() {
    if (
      mouseX > this.buttonX &&
      mouseX < this.buttonX + this.buttonW &&
      mouseY > this.buttonY &&
      mouseY < this.buttonY + this.buttonH
    ) {
      changeState("intro");
    }
  }
}
