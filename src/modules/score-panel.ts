class ScorePanel {
  private score: number = 0;
  private level: number = 1;
  private isTopLevel: boolean = false;
  private MAX_LEVEL: number;
  private SCORE_LEVEL: number;
  private scoreEl: HTMLElement;
  private levelEl: HTMLElement;

  constructor(MaxLevel: number, ScoreLevel: number) {
    this.MAX_LEVEL = MaxLevel;
    this.SCORE_LEVEL = ScoreLevel;
    this.scoreEl = document.getElementById("score")!;
    this.levelEl = document.getElementById("level")!;
  }

  public updateScorePanel(): boolean {
    this.updateScore();
    return !this.isTopLevel && this.upgrade();
  }

  private updateScore(): void {
    this.scoreEl.innerHTML = ++this.score + "";
  }

  private upgrade(): boolean {
    if (this.score % this.SCORE_LEVEL !== 0) {
      return false;
    }

    this.levelEl.innerHTML = ++this.level + "";

    if (this.level === this.MAX_LEVEL) {
      this.levelEl.innerHTML = this.level + "(顶级)";
      this.isTopLevel = true;
    }
    return true;
  }
}

export default ScorePanel;
