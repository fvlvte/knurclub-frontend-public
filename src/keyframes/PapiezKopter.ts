import { GenerycznyWielkiPolak } from "../compontents/GenerycznyWielkiPolak";

export class PapiezKopter extends GenerycznyWielkiPolak {
  private PAPIESH_DRAG_MOMENTUM = 0.05;

  constructor() {
    super();
    this.ANIMATION_FRAMES = 5;
    this.ANIMATION_SPEED = 0.005;
    this.ANIMATION_ACCELERATION = 0.000008;
    this.ANIMATION_FRAME_MULTIPILER = 10;
  }

  public onUpdate(deltaTime: number) {
    this.animationSpeed += this.ANIMATION_ACCELERATION * deltaTime;

    if (this.animationSpeed > this.PAPIESH_DRAG_MOMENTUM)
      this.y -=
        this.animationSpeed * deltaTime * this.ANIMATION_FRAME_MULTIPILER;

    this.animationFrame += this.animationSpeed * deltaTime;

    if (this.animationFrame > this.ANIMATION_FRAMES) {
      this.animationFrame = 0;
    }
  }

  public reset() {
    const papajskiFrejm = this.refyPapiezowe[Math.floor(this.animationFrame)];

    this.y = window.innerHeight - papajskiFrejm.height;
    this.x = window.innerWidth / 2 - papajskiFrejm.width / 2;
    this.animationSpeed = this.ANIMATION_SPEED;
    this.animationFrame = 0;
  }
}
