// @flow

import {
  convertStringToMatrix,
  getAdjacentMinesCount,
  getUpperLine,
  getLowerLine,
  getLowerCases,
  getUpperCases,
  getPreviousCase,
  getNextCase,
  convertMatrixToString,
} from '../src/minesweeper';

import doMagic from '../src/minesweeper';

describe('all tests', () => {
  const grid = `*...
....
.*..
....`;

  it('test', () => {
    expect(true).toBe(true);
  });

  it('convert String to Matrix', () => {
    // given
    const expectedMatrix = [
      ['*', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '*', '.', '.'],
      ['.', '.', '.', '.'],
    ];

    // when
    const matrix = convertStringToMatrix(grid);

    // then
    expect(matrix).toEqual(expectedMatrix);
  });

  it('should return upper line', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 1;

    // when
    const upperline = getUpperLine(matrix, rowIndex);

    // then
    const expectedUpperLine = ['*', '.', '.', '.'];
    expect(upperline).toEqual(expectedUpperLine);
  });

  it('should return empty upper line', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 0;

    // when
    const upperline = getUpperLine(matrix, rowIndex);

    // then
    const expectedUpperLine = [];
    expect(upperline).toEqual(expectedUpperLine);
  });

  it('should return lower line', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 1;

    // when
    const lowerline = getLowerLine(matrix, rowIndex);

    // then
    const expectedLowerLine = ['.', '*', '.', '.'];
    expect(lowerline).toEqual(expectedLowerLine);
  });

  it('should return empty lower line', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 3;

    // when
    const lowerline = getLowerLine(matrix, rowIndex);

    // then
    const expectedLowerLine = [];
    expect(lowerline).toEqual(expectedLowerLine);
  });

  it('should return lower adjacent cases', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 1;
    const columnIndex = 1;

    // when
    const lowerCases = getLowerCases(matrix, rowIndex)(columnIndex);

    // then
    const expectedCases = ['.', '*', '.'];
    expect(lowerCases).toEqual(expectedCases);
  });

  it('should return empty lower adjacent cases', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 3;
    const columnIndex = 1;

    // when
    const lowerCases = getLowerCases(matrix, rowIndex)(columnIndex);

    // then
    const expectedCases = [];
    expect(lowerCases).toEqual(expectedCases);
  });

  it('should return upper adjacent cases', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 1;
    const columnIndex = 1;

    // when
    const upperCases = getUpperCases(matrix, rowIndex)(columnIndex);

    // then
    const expectedCases = ['*', '.', '.'];
    expect(upperCases).toEqual(expectedCases);
  });

  it('should return empty upper adjacent cases', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 0;
    const columnIndex = 1;

    // when
    const upperCases = getUpperCases(matrix, rowIndex)(columnIndex);

    // then
    const expectedCases = [];
    expect(upperCases).toEqual(expectedCases);
  });

  it('should return previous case', () => {
    // given
    const line = ['*', '.', '.', '.'];
    const index = 1;

    // when
    const previousCase = getPreviousCase(line, index);

    // then
    const expectedCase = ['*'];
    expect(previousCase).toEqual(expectedCase);
  });

  it('should return empty when index is 0', () => {
    // given
    const line = ['*', '.', '.', '.'];
    const index = 0;

    // when
    const previousCase = getPreviousCase(line, index);

    // then
    const expectedCase = [];
    expect(previousCase).toEqual(expectedCase);
  });

  it('should return next case', () => {
    // given
    const line = ['*', '.', '.', '.'];
    const index = 1;

    // when
    const nextCase = getNextCase(line, index);

    // then
    const expectedCase = ['.'];
    expect(nextCase).toEqual(expectedCase);
  });

  it('should return empty when index is line.length', () => {
    // given
    const line = ['*', '.', '.', '.'];
    const index = 3;

    // when
    const nextCase = getNextCase(line, index);

    // then
    const expectedCase = [];
    expect(nextCase).toEqual(expectedCase);
  });

  it('should return *', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 0;
    const columnIndex = 0;

    // when
    const adjacentMinesCount = getAdjacentMinesCount(
      matrix,
      rowIndex,
      columnIndex
    );

    //then
    const expectedCount = '*';

    expect(adjacentMinesCount).toEqual(expectedCount);
  });

  it('should return the number of adjacent mines', () => {
    // given
    const matrix = convertStringToMatrix(grid);
    const rowIndex = 1;
    const columnIndex = 1;

    // when
    const adjacentMinesCount = getAdjacentMinesCount(
      matrix,
      rowIndex,
      columnIndex
    );

    //then
    const expectedCount = '2';

    expect(adjacentMinesCount).toEqual(expectedCount);
  });

  it('should convert matrix to string', () => {
    // given
    const matrix = [
      ['*', '1', '0', '0'],
      ['2', '2', '1', '0'],
      ['1', '*', '1', '0'],
      ['1', '1', '1', '0'],
    ];

    // when
    const convertedMatrix = convertMatrixToString(matrix);

    //then
    const expectedString = `*100
2210
1*10
1110`;

    expect(convertedMatrix).toEqual(expectedString);
  });

  it('should do the magic', () => {
    // when
    const convertedGrid = doMagic(grid);

    //then
    const expectedGrid = `*100
2210
1*10
1110`;

    expect(convertedGrid).toEqual(expectedGrid);
  });
});
