import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

enum StanyMarszałka {
  WJAZD,
  BACZNOŚĆ,
  WYJAZD,
  SPOCZYNEK,
}

export class Marszałek extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.666 * 0.666;
  protected readonly SCALE_Y: number = 0.666 * 0.666;

  private state: StanyMarszałka = StanyMarszałka.WJAZD;

  constructor() {
    super();
  }

  public getAssetList(): PolskiAsset[] {
    return [{ id: "marshall", path: "assets/marszalek.png" }];
  }

  public onUpdate(deltaTime: number) {
    if (!this.currentImage) return;

    switch (this.state) {
      case StanyMarszałka.WJAZD: {
        this.y -= this.animationSpeed * deltaTime;

        if (
          window.innerHeight - this.currentImage?.height * this.SCALE_X >=
          this.y
        ) {
          this.state = StanyMarszałka.BACZNOŚĆ;
          this.animationSpeed = 0;
        }
        break;
      }
      case StanyMarszałka.BACZNOŚĆ: {
        this.animationSpeed += 0.0009 * deltaTime;
        if (this.animationSpeed >= 0.5) {
          this.state = StanyMarszałka.WYJAZD;
        }
        break;
      }
      case StanyMarszałka.WYJAZD: {
        this.y += this.animationSpeed * deltaTime;
        if (
          this.y >=
          window.innerHeight + this.currentImage?.height * this.SCALE_Y
        ) {
          this.state = StanyMarszałka.SPOCZYNEK;
        }
        break;
      }
    }
  }

  public reset() {
    this.currentImage = this.assets["marshall"];
    console.log(this.assets["marshall"]);
    this.x =
      (window.innerWidth - this.currentImage.width * this.SCALE_X) *
      Math.random();
    this.y = window.innerHeight;
    this.animationSpeed = 0.5;
    this.state = StanyMarszałka.WJAZD;
  }
}
