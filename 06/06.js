const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const fish = contents.split(",").map((x) => parseInt(x, 10));
  const initialFishCount = fish.length;

  const live = (list, day, len) => {
    if (day === 80) return len;
    else {
      let newCount = 0;
      const newList = list.map((x) => {
        if (x === 0) newCount += 1;

        return x === 0 ? 6 : x - 1;
      });

      return live(
        [...newList, ...new Array(newCount).fill(8)],
        day + 1,
        len + newCount
      );
    }
  };

  console.log(live(fish, 0, initialFishCount));
});
