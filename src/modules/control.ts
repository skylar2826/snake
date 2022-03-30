import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./score-panel";
import _ from "lodash";

/**
 * 想法（暂不实现）：
 * 游戏可以重新开始\暂停\继续
 * 可以调节速度，最小速度为当前速度
 * 记录上次游戏记录
 */

class Control {
  private snake: Snake;
  private food: Food;
  private scorePanel: ScorePanel;
  private timer: number;
  private speed: number = 200;
  private readonly acc: number = 50;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(3, 2);
  }

  public run(): void {
    this.food.changeLocation(this.snake.getSnakeLocation());
    document.addEventListener("keydown", this.keyBoardHandler);
  }

  private keyBoardHandler = (event: KeyboardEvent): void => {
    window.clearInterval(this.timer);

    this.timer = window.setInterval(() => {
      /**
       * 下一次移动之前改变食物位置，生成身体
       * 原因：
       *  如果直接生成身体，身体会在起始点停留this.speed左右的时间，再拼接到身体上
       */
      if (this.isEat()) {
        this.food.changeLocation(this.snake.getSnakeLocation());
        this.snake.generaBodySection();
      }
      try {
        this.snake.move(event.key);
      } catch (e) {
        alert(e.message + " Game Over!");
        this.destroyed();
      }

      if (this.isEat()) {
        const isUpgrade = this.scorePanel.updateScorePanel();

        if (isUpgrade) {
          this.speed = this.speed - this.acc;
        }
      }
    }, this.speed);
  };

  private isEat(): boolean {
    const snakeHeadLocation = this.snake.getHeadLocation();
    const foodLocation = this.food.getLocation();

    return _.isEqual(snakeHeadLocation, foodLocation);
  }

  private destroyed(): void {
    window.clearInterval(this.timer);
    document.removeEventListener("keydown", this.keyBoardHandler);
  }
}

export default Control;
