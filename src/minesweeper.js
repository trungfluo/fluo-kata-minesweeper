// @flow

export function convertStringToMatrix(grid: string): Array<Array<string>> {
  return grid.split('\n').map(line => line.split(''));
}

export function getUpperLine(
  matrix: Array<Array<string>>,
  rowIndex: number
): Array<string> {
  const upperRow = rowIndex !== 0 ? matrix[rowIndex - 1] : [];

  return upperRow;
}

export function getLowerLine(
  matrix: Array<Array<string>>,
  rowIndex: number
): Array<string> {
  const lowerRow = rowIndex !== matrix.length - 1 ? matrix[rowIndex + 1] : [];

  return lowerRow;
}

type F1 = (index: number) => Array<string>;
export function getLowerCases(
  matrix: Array<Array<string>>,
  rowIndex: number
): F1 {
  const line = getLowerLine(matrix, rowIndex);

  return (columnIndex: number) =>
    [
      ...getPreviousCase(line, columnIndex),
      line[columnIndex],
      ...getNextCase(line, columnIndex),
    ].filter(item => item);
}

export function getUpperCases(
  matrix: Array<Array<string>>,
  rowIndex: number
): F1 {
  const line = getUpperLine(matrix, rowIndex);

  return (columnIndex: number) =>
    [
      ...getPreviousCase(line, columnIndex),
      line[columnIndex],
      ...getNextCase(line, columnIndex),
    ].filter(item => item);
}

export function getPreviousCase(
  line: Array<string>,
  index: number
): Array<string> {
  return index === 0 ? [] : [line[index - 1]];
}

export function getNextCase(line: Array<string>, index: number): Array<string> {
  return index === line.length - 1 ? [] : [line[index + 1]];
}

export function getAdjacentMinesCount(
  matrix: Array<Array<string>>,
  rowIndex: number,
  columnIndex: number
): string {
  const upperRow = getUpperCases(matrix, rowIndex)(columnIndex);
  const lowerRow = getLowerCases(matrix, rowIndex)(columnIndex);
  const currentLine = matrix[rowIndex];
  const previousCase = getPreviousCase(currentLine, columnIndex);
  const nextCase = getNextCase(currentLine, columnIndex);

  const adjacentCases = [
    ...upperRow,
    ...previousCase,
    ...nextCase,
    ...lowerRow,
  ];

  const currentCase = matrix[rowIndex][columnIndex];

  return currentCase === '*'
    ? '*'
    : adjacentCases
        .reduce((acc, currentCase) => {
          return (acc += currentCase === '*' ? 1 : 0);
        }, 0)
        .toString();
}

export function convertMatrixToString(matrix: Array<Array<string>>): string {
  return matrix.map(line => line.join('')).join('\n');
}

export default function doMagic(grid: string): string {
  const matrix = convertStringToMatrix(grid);
  const convertedMatrix = matrix.map((line, rowIndex) =>
    line.map((currentCase, columnIndex) =>
      getAdjacentMinesCount(matrix, rowIndex, columnIndex)
    )
  );

  return convertMatrixToString(convertedMatrix);
}
