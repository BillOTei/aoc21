const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const instructions = contents.split("\n");

  const knownDigitLengths = [2, 3, 4, 7];
  const part1 = instructions.reduce((count, ins) => {
    const [_, outputValues] = ins.split(" | ");
    const outputLengths = outputValues.split(" ").map((o) => o.length);

    return (
      count +
      outputLengths.filter((o) => knownDigitLengths.indexOf(o) !== -1).length
    );
  }, 0);

  console.log(part1);
});
