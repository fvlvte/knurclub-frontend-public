import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { PolskiAsset } from "../interfaces/PolskiAsset";
export class Zonk extends GenerycznyWielkiPolak {
  protected readonly SCALE_X: number = 0.1;
  protected readonly SCALE_Y: number = 0.1;

  protected readonly SCALE_GAIN = 2.1377 * 0.269;

  protected SCALE = this.SCALE_X;

  constructor() {
    super();
  }

  public getAssetList(): PolskiAsset[] {
    return [{ id: "zonk", path: "assets/zonk.png" }];
  }

  public onUpdate(deltaTime: number) {
    this.SCALE += (this.SCALE_GAIN * deltaTime) / 5000;
  }

  public reset() {
    this.currentImage = this.assets["zonk"];
    this.x = 100;
    this.y = 100;
    this.SCALE = this.SCALE_X;
  }

  public onDraw(context: CanvasRenderingContext2D) {
    if (this.currentImage !== null) {
      const scaledX = this.currentImage.width * this.SCALE;
      const scaledY = this.currentImage.height * this.SCALE;
      context.translate(this.x + scaledX / 2, this.y + scaledY / 2);

      // Apply the rotation
      const rotationAngleInDegrees = (this.SCALE * 1000) % 360;
      const rotationAngleInRadians = rotationAngleInDegrees * (Math.PI / 180);
      context.rotate(rotationAngleInRadians);
      context.drawImage(
        this.currentImage,
        -scaledX / 2,
        -scaledY / 2,
        scaledX,
        scaledY,
      );
    }

    context.resetTransform();
    context.restore();
  }
}
