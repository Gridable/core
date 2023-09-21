import Matrix2D from './Matrix2D';

describe('test', () => {
  it('should size Matrix 2x2 equals 4', () => {
    const matrix = new Matrix2D({ x: 2, y: 2 });

    expect(matrix.getSize()).toBe(4);
  });
});
