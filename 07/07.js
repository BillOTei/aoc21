const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const crabs = contents
    .split(",")
    .map((x) => parseInt(x, 10))
    .sort(function (a, b) {
      return a - b;
    });
  const findMedian = (sorted) => {
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  };
  const median = findMedian(crabs)
  const part1 = crabs.reduce((acc, c) => acc + Math.abs(c - median), 0);

  console.log(part1);
});
