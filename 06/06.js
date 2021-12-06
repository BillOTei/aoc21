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

  let register = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fish.forEach((x) => (register[x] += 1));
  let daysCount = 0;
  while (daysCount !== 256) {
    const zeros = register[0];
    for (let i = 0; i < 9; i++) {
      const x = register[i];
      register[i] -= x;
      if (i !== 0) register[i - 1] += x;
    }
    register[6] += zeros;
    register[8] += zeros;
    daysCount++;
  }
  const part2 = register.reduce((a, b) => a + b, 0);

  console.log(part1(fish, 0, initialFishCount), part2);
});
