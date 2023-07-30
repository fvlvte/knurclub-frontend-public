import { PolskiAsset } from "./PolskiAsset";

export interface WielkiPolak {
  getName(): string;
  onUpdate(deltaTime: number): void;
  onDraw(context: CanvasRenderingContext2D): void;
  setRefArray(refik: HTMLImageElement[]): void;
  getFrameCount(): number;
  reset(): void;
  getY(): number;
  getX(): number;
  getAssetList(): PolskiAsset[];
  onAssetLoaded(id: string, asset: HTMLImageElement): void;
}
