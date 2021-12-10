const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const chunks = contents.split("\n").map((l) => l.split(""));
  const scores = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137],
  ]);

  const isBalanced = (l) => {
    const brackets = "[]{}()<>";
    let stack = [];

    for (let bracket of l) {
      let bracketsIndex = brackets.indexOf(bracket);

      if (bracketsIndex === -1) {
        continue;
      }

      if (bracketsIndex % 2 === 0) {
        stack.push(bracketsIndex + 1);
      } else {
        if (stack.pop() !== bracketsIndex) {
          return bracket;
        }
      }
    }
    return false;
  };
  const part1 = chunks
    .map(isBalanced)
    .reduce((acc, v) => (!v ? acc : acc + scores.get(v)), 0);

  console.log(part1);
});
