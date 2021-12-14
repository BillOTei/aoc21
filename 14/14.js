const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const [rawTemplate, rawRules] = contents.split("\n\n");
  const rules = new Map(rawRules.split("\n").map((r) => r.split(" -> ")));
  const template = rawTemplate.split("");
  let elementsMap = new Map();
  template.forEach((e) => elementsMap.set(e, (elementsMap.get(e) || 0) + 1));
  const insert = (polymer, step, goal) => {
    if (step === goal) return polymer;
    else
      return insert(
        polymer.reduce((acc, e, i) => {
          if (polymer[i + 1] && rules.has(e + polymer[i + 1])) {
            const newE = rules.get(e + polymer[i + 1]);
            elementsMap.set(newE, (elementsMap.get(newE) || 0) + 1);

            return [...acc, e, newE];
          } else return [...acc, e];
        }, []),
        step + 1,
        goal
      );
  };
  const _ = insert(template, 0, 10);
  const sortedElements = [...elementsMap].sort((a, b) => a[1] - b[1]);
  const part1 = sortedElements[sortedElements.length - 1][1] - sortedElements[0][1]

  console.log(part1);
});
