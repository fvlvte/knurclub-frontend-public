export interface WielkiPolak {
  onUpdate(deltaTime: number): void;
  onDraw(context: CanvasRenderingContext2D): void;
  setRefArray(refik: HTMLImageElement[]): void;
  getFrameCount(): number;
  reset(): void;
  getY(): number;
  getX(): number;
}
