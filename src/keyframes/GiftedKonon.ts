import { GenerycznyWielkiPolak } from "../compontents/GenerycznyWielkiPolak";

export class GiftedKonon extends GenerycznyWielkiPolak {
  constructor() {
    super();
    this.ANIMATION_FRAMES = 16;
    this.ANIMATION_SPEED = 0.008;
    this.ANIMATION_ACCELERATION = 0;
    this.ANIMATION_FRAME_MULTIPILER = 10;
  }

  public onUpdate(deltaTime: number) {
    this.animationSpeed += this.ANIMATION_ACCELERATION * deltaTime;

    this.animationFrame += this.animationSpeed * deltaTime;

    if (this.animationFrame > this.ANIMATION_FRAMES) {
      this.animationFrame = 0;
    }
  }

  public reset() {
    const papajskiFrejm = this.refyPapiezowe[Math.floor(this.animationFrame)];

    this.y = 50;
    this.x = window.innerWidth / 2 - papajskiFrejm.width / 2;
    this.animationSpeed = this.ANIMATION_SPEED;
    this.animationFrame = 0;
  }
}
