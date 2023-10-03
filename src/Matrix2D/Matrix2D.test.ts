import Matrix2D from './Matrix2D';

describe('test Matrix2D', () => {
  it('should size Matrix 2x2 equals 4', () => {
    const matrix = new Matrix2D<number>({ x: 2, y: 2 });

    expect(matrix.getSize()).toBe(4);
  });

  it('fill matrix 2x2 and compare values', () => {
    const matrix = new Matrix2D<number>({ x: 2, y: 2 });

    matrix.set(0, 0, 1);
    matrix.set(0, 1, 2);
    matrix.set(1, 0, 3);
    matrix.set(1, 1, 4);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(1, 0)).toBe(3);
    expect(matrix.get(1, 1)).toBe(4);
  });

  it('fill matrix 3x1 and compare values', () => {
    const matrix = new Matrix2D<number>({ x: 3, y: 1 });

    matrix.set(0, 0, 1);
    matrix.set(0, 1, 2);
    matrix.set(0, 2, 3);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(0, 2)).toBe(3);
  });

  it('fill matrix 1x3 and compare values', () => {
    const matrix = new Matrix2D<number>({ x: 1, y: 3 });

    matrix.set(0, 0, 1);
    matrix.set(1, 0, 2);
    matrix.set(2, 0, 3);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(1, 0)).toBe(2);
    expect(matrix.get(2, 0)).toBe(3);
  });

  it('overflow matrix 2x2', () => {
    const matrix = new Matrix2D<number>({ x: 2, y: 2 });

    matrix.set(0, 0, 1);
    matrix.set(0, 1, 2);
    matrix.set(1, 0, 3);
    matrix.set(1, 1, 4);

    matrix.set(0, 2, 100);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(1, 0)).toBe(3);
    expect(matrix.get(1, 1)).toBe(4);
    expect(matrix.get(0, 2)).toBe(100);
    expect(matrix.getSize()).toBe(8);

    matrix.set(2, 0, 100);

    expect(matrix.get(2, 0)).toBe(100);
    expect(matrix.getSize()).toBe(16);

    matrix.set(3, 0, 44);

    expect(matrix.get(3, 0)).toBe(44);
    expect(matrix.getSize()).toBe(16);

    matrix.set(4, 0, 55);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(1, 0)).toBe(3);
    expect(matrix.get(1, 1)).toBe(4);
    expect(matrix.get(0, 2)).toBe(100);
    expect(matrix.get(4, 0)).toBe(55);
    expect(matrix.getSize()).toBe(32);

    matrix.set(5, 5, 66);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(1, 0)).toBe(3);
    expect(matrix.get(1, 1)).toBe(4);
    expect(matrix.get(0, 2)).toBe(100);
    expect(matrix.get(4, 0)).toBe(55);
    expect(matrix.get(5, 5)).toBe(66);
    expect(matrix.getSize()).toBe(64);

    matrix.set(6, 6, 77);

    expect(matrix.get(0, 0)).toBe(1);
    expect(matrix.get(0, 1)).toBe(2);
    expect(matrix.get(1, 0)).toBe(3);
    expect(matrix.get(1, 1)).toBe(4);
    expect(matrix.get(0, 2)).toBe(100);
    expect(matrix.get(4, 0)).toBe(55);
    expect(matrix.get(5, 5)).toBe(66);
    expect(matrix.get(6, 6)).toBe(77);
    expect(matrix.getSize()).toBe(64);
  });
});
