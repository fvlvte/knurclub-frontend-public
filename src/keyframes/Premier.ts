import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

enum StanyPremiera {
  WJAZD,
  BACZNOŚĆ,
  WYJAZD,
  SPOCZYNEK,
}

export class Premier extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.666 * 0.666 * 2.137;
  protected readonly SCALE_Y: number = 0.666 * 0.666 * 2.137;

  private state: StanyPremiera = StanyPremiera.WJAZD;

  constructor() {
    super();
  }

  public getAssetList(): PolskiAsset[] {
    return [{ id: "primeminaster", path: "/assets/premier.png" }];
  }

  public onUpdate(deltaTime: number) {
    if (!this.currentImage) return;

    switch (this.state) {
      case StanyPremiera.WJAZD: {
        this.y -= this.animationSpeed * deltaTime;

        if (
          window.innerHeight - this.currentImage?.height * this.SCALE_X >=
          this.y
        ) {
          this.state = StanyPremiera.BACZNOŚĆ;
          this.animationSpeed = 0;
        }
        break;
      }
      case StanyPremiera.BACZNOŚĆ: {
        this.animationSpeed += 0.0009 * deltaTime;
        if (this.animationSpeed >= 0.5) {
          this.state = StanyPremiera.WYJAZD;
        }
        break;
      }
      case StanyPremiera.WYJAZD: {
        this.y += this.animationSpeed * deltaTime;
        if (
          this.y >=
          window.innerHeight + this.currentImage?.height * this.SCALE_Y
        ) {
          this.state = StanyPremiera.SPOCZYNEK;
        }
        break;
      }
    }
  }

  public reset() {
    this.currentImage = this.assets["primeminaster"];
    if (typeof this.currentImage !== "undefined") {
      this.x =
        (window.innerWidth - this.currentImage.width * this.SCALE_X) *
        Math.random();
      this.y = window.innerHeight;
      this.animationSpeed = 0.5 * 0.2137;
      this.state = StanyPremiera.WJAZD;
    }
  }
}
