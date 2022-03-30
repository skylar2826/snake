import _ from "lodash";

class Food {
  private el: HTMLElement;

  constructor() {
    this.el = document.getElementById("food")!;
  }

  public getLocation(): Array<number> {
    const coordinateX: number = this.el.offsetLeft;
    const coordinateY: number = this.el.offsetTop;
    return [coordinateX, coordinateY];
  }

  private generateCoordinate(): Array<number> {
    return [
      Math.floor(Math.random() * 10) * 30,
      Math.floor(Math.random() * 10) * 30,
    ];
  }

  public changeLocation(coordinates: Array<Array<number>>): void {
    let isNew: boolean = false;
    let newCoordinate: Array<number>;
    do {
      newCoordinate = this.generateCoordinate();
      if (
        !coordinates.some((coordinate) => _.isEqual(coordinate, newCoordinate))
      ) {
        isNew = true;
        break;
      }
    } while (!isNew);

    this.el.style.left = newCoordinate[0] + "px";
    this.el.style.top = newCoordinate[1] + "px";
  }
}

export default Food;
