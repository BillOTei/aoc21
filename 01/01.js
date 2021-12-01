const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const depths = contents.split("\n");
  const totalDepths = depths.length;
  const numberify = s => parseInt(s, 10);
  const sumDepths = i => numberify(depths[i - 1]) + numberify(depths[i]) + numberify(depths[i + 1]);

  const part1 = depths.reduce((acc, depth, i) => {
    if (i === 0) return acc;

    const d = numberify(depth);
    const prevD = numberify(depths[i - 1]);

    return d > prevD ? acc + 1 : acc;
  }, 0);

  let part2 = 0;
  let prevSum = sumDepths(1);
  for (let i = 2; i < totalDepths - 1; i++) {
    const sum = sumDepths(i);
    if (sum > prevSum) part2 += 1
    prevSum = sum;
  }

  console.log(part1, part2);
});
