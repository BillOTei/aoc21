const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const numbers = contents.split("\n");

  const part1 = numbers
    .reduce(
      (acc, n) => {
        n.split("").forEach((b, i) => {
          acc[i][parseInt(b, 10)] = acc[i][parseInt(b, 10)] + 1;
        });

        return acc;
      },
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ]
    )
    .reduce(
      (acc, bArr) =>
        bArr[0] > bArr[1]
          ? [acc[0] + "1", acc[1] + "0"]
          : [acc[0] + "0", acc[1] + "1"],
      ["", ""]
    );
  const r1 = parseInt(part1[0], 2) * parseInt(part1[1], 2);

  console.log(r1);
});
