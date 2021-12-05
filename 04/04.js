const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const data = contents.split(/\n\s*\n/);
  const [numbers, ...grids] = data;
  const gridsCount = grids.length;
  const numbersList = numbers.split(",");
  const numbersCount = numbersList.length;
  const parseGrid = (g) => {
    const lines = g
      .split("\n")
      .map((l) => l.split(/\s+/).filter((v) => v !== ""));
    let [row] = lines;
    const columns = row.map((value, column) => lines.map((row) => row[column]));

    return [
      ...lines.map((l) => new Map(l.map((v) => [v, false]))),
      ...columns.map((c) => new Map(c.map((v) => [v, false]))),
    ];
  };
  let gridMaps = grids.map((g) => parseGrid(g));

  let winningGridIdx;
  let winningNb;
  play: for (let i = 0; i < numbersCount; i++) {
    const nb = numbersList[i];
    for (let j = 0; j < gridsCount; j++) {
      let g = gridMaps[j];
      gridMaps[j] = g.map((m) => {
        if (m.has(nb)) {
          m.set(nb, true);
          if ([...m.values()].filter((v) => v).length === m.size) {
            winningGridIdx = j;
            winningNb = nb;
          }
        }

        return m;
      });
      if (winningNb) {
        break play;
      }
    }
  }
  const part1 =
    gridMaps[winningGridIdx].slice(0, 5).reduce((acc, m) => {
      const unmarkedNbs = [...m.entries()]
        .filter((nb) => !nb[1])
        .map((nb) => parseInt(nb[0]));

      return acc + unmarkedNbs.reduce((a, b) => a + b, 0);
    }, 0) * parseInt(winningNb);

  console.log(part1);
});
