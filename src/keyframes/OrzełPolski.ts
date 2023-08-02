import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";

export class OrzełPolski extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.666 * 0.666;
  protected readonly SCALE_Y: number = 0.666 * 0.666;

  constructor() {
    super();
  }

  public getAssetList(): PolskiAsset[] {
    return [{ id: "orzeł", path: "assets/orzeł.png" }];
  }

  public onUpdate(deltaTime: number) {
    if (!this.currentImage) return;

    this.x += this.animationSpeed * deltaTime;
    this.y -= (this.animationSpeed * deltaTime) / 2;

    this.currentImage = this.assets["orzeł"];
  }

  public reset() {
    this.currentImage = this.assets["orzeł"];

    if (typeof this.currentImage !== "undefined") {
      this.x = 0 - this.currentImage.width * this.SCALE_X;
      this.y = window.innerHeight - this.currentImage.height * this.SCALE_Y;
      this.animationSpeed = 0.666;
    }
  }

  public onDraw(context: CanvasRenderingContext2D) {
    if (this.currentImage !== null) {
      const przeszkalowanyAdamX = this.currentImage.width * this.SCALE_X;
      const przeszkalowanyAdamY = this.currentImage.height * this.SCALE_Y;
      context.translate(
        this.x + przeszkalowanyAdamX / 2,
        this.y + przeszkalowanyAdamY / 2,
      );

      // Apply the rotation
      const rotationAngleInDegrees = this.x % 360;
      const rotationAngleInRadians = rotationAngleInDegrees * (Math.PI / 180);
      context.rotate(rotationAngleInRadians);
      context.drawImage(
        this.currentImage,
        -przeszkalowanyAdamX / 2,
        -przeszkalowanyAdamY / 2,
        przeszkalowanyAdamX,
        przeszkalowanyAdamY,
      );
    }

    context.resetTransform();
    context.restore();
  }
}
