import { WielkiPolak } from "../interfaces/WielkiPolak";

export class GenerycznyWielkiPolak implements WielkiPolak {
  protected ANIMATION_FRAMES = 5;
  protected ANIMATION_SPEED = 0.005;
  protected ANIMATION_ACCELERATION = 0.000008;
  protected ANIMATION_FRAME_MULTIPILER = 10;
  protected SCALE_X = 1;
  protected SCALE_Y = 1;

  protected refyPapiezowe: HTMLImageElement[] = [];

  protected x = 0;
  protected y = 0;

  protected animationSpeed = this.ANIMATION_SPEED;
  protected animationFrame = 0;

  public getY(): number {
    return this.y;
  }

  public getX(): number {
    return this.x;
  }

  public setRefArray(refik: HTMLImageElement[]): void {
    this.refyPapiezowe = refik;
  }

  public getFrameCount(): number {
    return this.ANIMATION_FRAMES;
  }

  public onUpdate(deltaTime: number): void {
    alert("nie uzywaj tak tej klasy debil " + deltaTime);
  }

  public onDraw(context: CanvasRenderingContext2D) {
    context.save();

    const currentFrame = Math.floor(this.animationFrame);
    const currentImage = this.refyPapiezowe[currentFrame];

    context.drawImage(
      currentImage,
      this.x,
      this.y,
      currentImage.width * this.SCALE_X,
      currentImage.height * this.SCALE_Y,
    );
    context.restore();
  }

  public reset() {
    this.animationSpeed = 0;
  }
}
