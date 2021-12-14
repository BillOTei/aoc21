const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const [rawDots, rawFold] = contents.split("\n\n");
  const dots = rawDots.split("\n").map((d) => d.split(",").map(Number));
  const folds = rawFold.split("\n").map((f) => {
    const [d, pos] = f.split("=");

    return [d.substr(-1), parseInt(pos, 10)];
  });
  const foldsCount = folds.length;
  const fold = (dots, [direction, position]) => {
    let fold = new Set();
    if (direction === "x") {
      dots.forEach(([x, y]) => {
        if (x < position) {
          fold.add([x, y].join(","));
        } else if (x > position) {
          const newX = position - (x - position);
          fold.add([newX, y].join(","));
        }
      });
    } else {
      dots.forEach(([x, y]) => {
        if (y < position) {
          fold.add([x, y].join(","));
        } else if (y > position) {
          const newY = position - (y - position);
          fold.add([x, newY].join(","));
        }
      });
    }

    return [...fold].map((d) => d.split(",").map(Number));
  };

  const part1 = fold(dots, folds[0]).length;

  const foldAll = (dots, foldNb) => {
    if (foldNb === foldsCount) {
      return dots;
    } else {
      return foldAll(fold(dots, folds[foldNb]), foldNb + 1);
    }
  };
  const part2 = foldAll(dots, 0);
  const maxX = part2.sort((a, b) => b[0] - a[0])[0][0] + 1;
  const maxY = part2.sort((a, b) => b[1] - a[1])[0][1] + 1;
  const val = ".";
  const arr = new Array(maxY);
  for (let i = 0; i < maxY; i++) {
    arr[i] = new Array(maxX).fill(val);
  }
  part2.forEach(([x, y]) => (arr[y][x] = "#"));

  console.log(part1, part2)
});
