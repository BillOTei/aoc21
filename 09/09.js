const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const map = contents
    .split("\n")
    .map((l) => l.split("").map((h) => parseInt(h, 10)));

  const getCell = (matrix, y, x) => {
    const NO_VALUE = undefined;
    let value, hasValue;

    try {
      hasValue = matrix[y][x] !== undefined;
      value = hasValue ? matrix[y][x] : NO_VALUE;
    } catch (e) {
      value = NO_VALUE;
    }

    return value;
  };

  const surroundings = (matrix, y, x) => {
    // Directions are clockwise
    return {
      up: getCell(matrix, y - 1, x),
      upRight: getCell(matrix, y - 1, x + 1),
      right: getCell(matrix, y, x + 1),
      downRight: getCell(matrix, y + 1, x + 1),
      down: getCell(matrix, y + 1, x),
      downLeft: getCell(matrix, y + 1, x - 1),
      left: getCell(matrix, y, x - 1),
      upLeft: getCell(matrix, y - 1, x - 1),
    };
  };
  const isLow = (m, x, y) => {
    const max = 10;
    const height = m[y][x];
    const surroundingPoints = surroundings(m, y, x);

    return (
      height <
        (surroundingPoints.down !== undefined ? surroundingPoints.down : max) &&
      height <
        (surroundingPoints.left !== undefined ? surroundingPoints.left : max) &&
      height <
        (surroundingPoints.up !== undefined ? surroundingPoints.up : max) &&
      height <
        (surroundingPoints.right !== undefined ? surroundingPoints.right : max)
    );
  };

  const part1 = map.reduce((acc, l, y) => {
    const lowest = l.filter((h, x) => isLow(map, x, y));

    return acc + lowest.reduce((lAcc, h) => lAcc + h + 1, 0);
  }, 0);

  console.log(part1);
});
