import { Matrix2DConfig } from './Matrix2D.types';

export default class Matrix2D<T> {
  #buffer: Array<T> = [];

  #size: number = 0;

  constructor({ x, y }: Matrix2DConfig) {
    this.#buffer = Array.from({ length: x * y });
    this.#size = x * y;
  }

  static getIndex(x: number, y: number): number {
    return x * y + y;
  }

  get(x: number, y: number): T {
    return this.#buffer[Matrix2D.getIndex(x, y)];
  }

  set(x: number, y: number, value: T): void {
    this.#buffer[Matrix2D.getIndex(x, y)] = value;
  }

  getSize(): number {
    return this.#size;
  }
}
