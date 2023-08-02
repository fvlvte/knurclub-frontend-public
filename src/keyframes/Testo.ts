import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

export class Testo extends GenerycznyWielkiPolak {
  constructor() {
    super();
    this.ANIMATION_FRAMES = 40;
    this.ANIMATION_SPEED = 0.008;
    this.ANIMATION_ACCELERATION = 0;
    this.ANIMATION_FRAME_MULTIPILER = 10;
  }

  public getAssetList(): PolskiAsset[] {
    const assetList: PolskiAsset[] = [];
    for (let i = 0; i < this.ANIMATION_FRAMES; i++) {
      assetList.push({ id: `testo${i}`, path: `assets/TESTO/testo${i}.png` });
    }
    return assetList;
  }

  public onUpdate(deltaTime: number) {
    this.animationSpeed += this.ANIMATION_ACCELERATION * deltaTime;

    this.animationFrame += this.animationSpeed * deltaTime;

    if (this.animationFrame > this.ANIMATION_FRAMES) {
      this.animationFrame = 0;
    }

    this.currentImage = this.assets[`testo${Math.floor(this.animationFrame)}`];
  }

  public reset() {
    this.currentImage = this.assets[`testo${Math.floor(this.animationFrame)}`];

    if (typeof this.currentImage !== "undefined") {
      this.y = 0;
      this.x = window.innerWidth / 2 - this.currentImage.width / 2 - 213.7;
      this.animationSpeed = this.ANIMATION_SPEED;
      this.animationFrame = 0;
    }
  }
}
