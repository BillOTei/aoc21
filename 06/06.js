const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const fish = contents.split(",").map((x) => parseInt(x, 10));
  const initialFishCount = fish.length;

  const part1 = (list, day, len) => {
    if (day === 80) return len;
    else {
      let newCount = 0;
      const newList = list.map((x) => {
        if (x === 0) newCount += 1;

        return x === 0 ? 6 : x - 1;
      });

      return part1(
        [...newList, ...new Array(newCount).fill(8)],
        day + 1,
        len + newCount
      );
    }
  };

  console.log(part1(fish, 0, initialFishCount));
});
