enum Direction {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

enum InvertDirection {
  ArrowRight = "ArrowLeft",
  ArrowLeft = "ArrowRight",
  ArrowUp = "ArrowDown",
  ArrowDown = "ArrowUp",
}

const HORIZONTAL: Array<string> = [Direction.ArrowRight, Direction.ArrowLeft];
const VERTICAL: Array<string> = [Direction.ArrowUp, Direction.ArrowDown];

class Snack {
  private headEl: HTMLElement;
  private bodyEl: HTMLCollection;
  private snakeEl: HTMLElement;
  readonly moveUnit: number = 10;
  readonly boxSize: number = 300;

  constructor() {
    this.snakeEl = document.getElementById("snake")!;
    this.headEl = document.querySelector("#snake > div")!;
    this.bodyEl = this.snakeEl.getElementsByTagName("div");
  }

  public getHeadLocation(): Array<number> {
    const coordinateX: number = this.headEl.offsetLeft;
    const coordinateY: number = this.headEl.offsetTop;
    return [coordinateX, coordinateY];
  }

  public getSnakeLocation() {
    let snakeCoordinates = [];
    for (let i = 0; i < this.bodyEl.length; i++) {
      const coordinate = [
        (this.bodyEl[i] as HTMLElement).offsetLeft,
        (this.bodyEl[i] as HTMLElement).offsetTop,
      ];
      snakeCoordinates.push(coordinate);
    }
    return snakeCoordinates;
  }

  public generaBodySection(): void {
    this.snakeEl.insertAdjacentHTML("beforeend", "<div></div>");
  }

  private isCollideSelf(): boolean {
    for (let i = this.bodyEl.length - 1; i > 0; i--) {
      const bodySection = this.bodyEl[i] as HTMLElement;
      if (
        bodySection.offsetLeft === this.headEl.offsetLeft &&
        bodySection.offsetTop === this.headEl.offsetTop
      ) {
        return true;
      }
    }
    return false;
  }

  private isCollideWall(direction: string): boolean {
    switch (direction) {
      case Direction.ArrowRight:
        return this.headEl.offsetLeft + this.moveUnit >= this.boxSize;
      case Direction.ArrowLeft:
        return this.headEl.offsetLeft <= 0;
      case Direction.ArrowUp:
        return this.headEl.offsetTop <= 0;
      case Direction.ArrowDown:
        return this.headEl.offsetTop + this.moveUnit >= this.boxSize;
      default:
        break;
    }
    return false;
  }

  private getNewLocation(direction: string): number {
    switch (direction) {
      case Direction.ArrowRight:
        return this.headEl.offsetLeft + this.moveUnit;
      case Direction.ArrowLeft:
        return this.headEl.offsetLeft - this.moveUnit;
      case Direction.ArrowUp:
        return this.headEl.offsetTop - this.moveUnit;
      case Direction.ArrowDown:
        return this.headEl.offsetTop + this.moveUnit;
      default:
        break;
    }
    return 0;
  }

  private isTurnAround(direction: string, newLocation: number): boolean {
    if (HORIZONTAL.includes(direction)) {
      return (
        this.bodyEl.length > 1 &&
        (this.bodyEl[1] as HTMLElement).offsetLeft === newLocation
      );
    } else if (VERTICAL.includes(direction)) {
      return (
        this.bodyEl.length > 1 &&
        (this.bodyEl[1] as HTMLElement).offsetTop === newLocation
      );
    }
    return false;
  }

  private moving(direction: string): void {
    let newLocation: number;
    newLocation = this.getNewLocation(direction);
    if (this.isTurnAround(direction, newLocation)) {
      newLocation = this.getNewLocation(InvertDirection[direction]);
    }
    this.movingBody();

    if (HORIZONTAL.includes(direction)) {
      this.headEl.style.left = newLocation + "px";
    } else if (VERTICAL.includes(direction)) {
      this.headEl.style.top = newLocation + "px";
    }
  }

  private movingBody(): void {
    for (let i = this.bodyEl.length - 1; i > 0; i--) {
      (this.bodyEl[i] as HTMLElement).style.left =
        (this.bodyEl[i - 1] as HTMLElement).offsetLeft + "px";
      (this.bodyEl[i] as HTMLElement).style.top =
        (this.bodyEl[i - 1] as HTMLElement).offsetTop + "px";
    }
  }

  public move(direction: string): void {
    if (this.isCollideWall(direction)) {
      throw new Error("蛇撞墙了...");
    }
    this.moving(direction);
    if (this.isCollideSelf()) {
      throw new Error("蛇撞到自己了...");
    }
  }
}

export default Snack;
