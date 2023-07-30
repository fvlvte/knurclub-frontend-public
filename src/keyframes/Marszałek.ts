import { GenerycznyWielkiPolak } from "../compontents/GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

enum StanyMarszałka {
  WJAZD,
  BACZNOŚĆ,
  WYJAZD,
  SPOCZYNEK,
}

export class Marszałek extends GenerycznyWielkiPolak {
  constructor() {
    super();
  }

  private state: StanyMarszałka = StanyMarszałka.WJAZD;

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
    this.x =
      (window.innerWidth - this.currentImage.width * this.SCALE_X) *
      Math.random();
    this.y = window.innerHeight;
    this.animationSpeed = 0.5;
    this.state = StanyMarszałka.WJAZD;
  }
}
