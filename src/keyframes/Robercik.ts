import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

export class Robercik extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.666 * 0.666;
  protected readonly SCALE_Y: number = 0.666 * 0.666;

  constructor() {
    super();
  }

  public getAssetList(): PolskiAsset[] {
    return [{ id: "robercik", path: "/assets/robercik.png" }];
  }

  public onUpdate(deltaTime: number) {
    if (!this.currentImage) return;

    this.x += this.animationSpeed * deltaTime;

    if (this.x > window.innerWidth + this.currentImage.width * this.SCALE_X) {
      this.reset();
    }

    this.currentImage = this.assets["robercik"];
  }

  public reset() {
    this.currentImage = this.assets["robercik"];

    if (typeof this.currentImage !== "undefined") {
      this.x = 0 - this.currentImage.width * this.SCALE_X;
      this.y = window.innerHeight - this.currentImage.height * this.SCALE_Y;
      this.animationSpeed = 2.137 * 2;
    }
  }
}
