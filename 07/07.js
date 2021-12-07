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
  const median = findMedian(crabs);
  const part1 = crabs.reduce((acc, c) => acc + Math.abs(c - median), 0);

  const factorial = (num) => {
    if (num < 0) return -1;
    else if (num === 0) return 1;
    else {
      return num + factorial(num - 1);
    }
  };
  const part2 = (() => {
    const mean = Math.round(crabs.reduce((sum, n) => sum + n) / crabs.length);
    const tries = [mean - 1, mean, mean + 1];
    const calcDistance = (n) => (n * (n + 1)) / 2;
    const totals = tries.map((t) => {
      return crabs.reduce((sum, n) => sum + calcDistance(Math.abs(n - t)), 0);
    });
    return Math.min(...totals);
  })();

  console.log(part1, part2);
});
