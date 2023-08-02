import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

enum StanyPudziana {
  WJAZD,
  BACZNOŚĆ,
  WYJAZD,
  SPOCZYNEK,
}

export class Pudzian extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.666 * 0.666;
  protected readonly SCALE_Y: number = 0.666 * 0.666;

  constructor() {
    super();
  }

  private state: StanyPudziana = StanyPudziana.WJAZD;

  public getAssetList(): PolskiAsset[] {
    return [{ id: this.constructor.name, path: "assets/mariusz.png" }];
  }

  public onUpdate(deltaTime: number) {
    if (!this.currentImage) return;

    switch (this.state) {
      case StanyPudziana.WJAZD: {
        this.x += this.animationSpeed * deltaTime;

        if (this.x >= 0) {
          this.state = StanyPudziana.BACZNOŚĆ;
          this.animationSpeed = 0;
        }
        break;
      }
      case StanyPudziana.BACZNOŚĆ: {
        this.animationSpeed += 0.0009 * deltaTime;
        if (this.animationSpeed >= 0.5) {
          this.state = StanyPudziana.WYJAZD;
        }
        break;
      }
      case StanyPudziana.WYJAZD: {
        this.x -= this.animationSpeed * deltaTime;
      }
    }

    this.currentImage = this.assets[this.constructor.name];
  }

  public reset() {
    this.currentImage = this.assets[this.constructor.name];

    this.x = -1 * (this.currentImage.width * this.SCALE_X);
    this.y = window.innerHeight - this.currentImage.height * this.SCALE_Y;
    this.animationSpeed = 0.5;
    this.state = StanyPudziana.WJAZD;
  }
}
