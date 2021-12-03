const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const numbers = contents.split("\n");
  const bitsCount = (numbers) =>
    numbers.reduce(
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
    );

  const part1 = bitsCount(numbers).reduce(
    (acc, bArr) =>
      bArr[0] > bArr[1]
        ? [acc[0] + "1", acc[1] + "0"]
        : [acc[0] + "0", acc[1] + "1"],
    ["", ""]
  );
  const r1 = parseInt(part1[0], 2) * parseInt(part1[1], 2);

  const oxygenList = (list, bitConsidered) => {
    const values = bitsCount(list)[bitConsidered];

    return list.filter((n) => {
      return values[1] >= values[0]
        ? n.charAt(bitConsidered) === "1"
        : n.charAt(bitConsidered) === "0";
    });
  };
  const cO2List = (list, bitConsidered) => {
    const values = bitsCount(list)[bitConsidered];

    return list.filter((n) => {
      return values[1] >= values[0]
        ? n.charAt(bitConsidered) === "0"
        : n.charAt(bitConsidered) === "1";
    });
  };
  const reduceListOxygen = (list, bitConsidered) => {
    if (list.length === 1) return list[0];
    else
      return reduceListOxygen(
        oxygenList(list, bitConsidered),
        bitConsidered + 1
      );
  };
  // This could easily be avoided by filling 2 lists at the same time but performance remains good this way
  const reduceListCO2 = (list, bitConsidered) => {
    if (list.length === 1) return list[0];
    else return reduceListCO2(cO2List(list, bitConsidered), bitConsidered + 1);
  };
  const r2 =
    parseInt(reduceListOxygen(numbers, 0), 2) *
    parseInt(reduceListCO2(numbers, 0), 2);

  console.log(r1, r2);
});
