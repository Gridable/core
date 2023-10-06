import { Matrix2DConfig } from './Matrix2D.types';

export default class Matrix2D<T> {
  #buffer = new Array<T | undefined>();

  #x: number = 0;

  #y: number = 0;

  constructor({ x, y }: Matrix2DConfig) {
    this.#buffer = Array.from<T | undefined>({ length: x * y });
    this.#x = x;
    this.#y = y;
  }

  getIndex(x: number, y: number): number {
    return x * this.#y + y;
  }

  get(x: number, y: number): T | undefined {
    if (x > this.#x || y > this.#y) {
      return undefined;
    }

    return this.#buffer[this.getIndex(x, y)];
  }

  set(x: number, y: number, value: T): void {
    if (x >= this.#x || y >= this.#y) {
      const newX = x >= this.#x ? this.#nextBound(x + 1) : this.#x;
      const newY = y >= this.#y ? this.#nextBound(y + 1) : this.#y;

      this.#rise(newX, newY);
    }

    this.#buffer[this.getIndex(x, y)] = value;
  }

  // eslint-disable-next-line class-methods-use-this
  #nextBound(n: number): number {
    return 2 ** Math.ceil(Math.sqrt(n));
  }

  #rise(newX: number, newY: number): void {
    const newBuffer = Array.from<T | undefined>({ length: newX * newY });

    // eslint-disable-next-line unicorn/prevent-abbreviations
    for (let i = 0; i < this.#x; i += 1) {
      for (let k = 0; k < this.#y; k += 1) {
        newBuffer[i * newY + k] = this.get(i, k);
      }
    }

    this.#x = newX;
    this.#y = newY;

    this.#buffer = newBuffer;
  }

  getSize(): number {
    return this.#x * this.#y;
  }
}
