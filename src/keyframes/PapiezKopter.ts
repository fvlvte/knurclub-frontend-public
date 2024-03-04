import { GenerycznyWielkiPolak } from './GenerycznyWielkiPolak'
import { PolskiAsset } from '../interfaces/PolskiAsset'

export class PapiezKopter extends GenerycznyWielkiPolak {
  private PAPIESH_DRAG_MOMENTUM = 0.05

  constructor() {
    super()
    this.ANIMATION_FRAMES = 5
    this.ANIMATION_SPEED = 0.005
    this.ANIMATION_ACCELERATION = 0.000008
    this.ANIMATION_FRAME_MULTIPILER = 10
  }

  public getAssetList(): PolskiAsset[] {
    const assetList: PolskiAsset[] = []
    for (let i = 0; i < this.ANIMATION_FRAMES; i++) {
      assetList.push({
        id: `bigPoppa${i}`,
        path: `/assets/PAPAJ/papiez${i}.png`,
      })
    }
    return assetList
  }

  public onUpdate(deltaTime: number) {
    this.animationSpeed += this.ANIMATION_ACCELERATION * deltaTime

    if (this.animationSpeed > this.PAPIESH_DRAG_MOMENTUM)
      this.y -=
        this.animationSpeed * deltaTime * this.ANIMATION_FRAME_MULTIPILER

    this.animationFrame += this.animationSpeed * deltaTime

    if (this.animationFrame > this.ANIMATION_FRAMES) {
      this.animationFrame = 0
    }

    this.currentImage =
      this.assets[`bigPoppa${Math.floor(this.animationFrame)}`]
  }

  public reset() {
    const papajskiFrejm =
      this.assets[`bigPoppa${Math.floor(this.animationFrame)}`]

    if (typeof papajskiFrejm !== 'undefined') {
      this.y = window.innerHeight - papajskiFrejm.height
      this.x = window.innerWidth / 2 - papajskiFrejm.width / 2
      this.animationSpeed = this.ANIMATION_SPEED
      this.animationFrame = 0
    }
  }
}
