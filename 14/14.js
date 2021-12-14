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
  insert(template, 0, 10);
  const sortedElements = [...elementsMap].sort((a, b) => a[1] - b[1]);
  const part1 =
    sortedElements[sortedElements.length - 1][1] - sortedElements[0][1];

  // let elementsMap2 = new Map();
  // let pairsMap = new Map();
  // template.forEach((e, i) => {
  //   elementsMap2.set(e, (elementsMap2.get(e) || 0) + 1);
  //   template[i + 1] &&
  //     pairsMap.set(
  //       e + template[i + 1],
  //       (pairsMap.get(e + template[i + 1]) || 0) + 1
  //     );
  // });
  //
  // const insert = (pairs, step, goal) => {
  //   if (step === goal) return pairs;
  //   else
  //     return insert(
  //       new Map(
  //         [...pairs].reduce((acc, [pair, count]) => {
  //           const newElem = rules.get(pair);
  //           const currentPair = [pair, 0];
  //           elementsMap2.set(newElem, (elementsMap2.get(newElem) || 0) + count);
  //           const newPair1 = [pair[0] + newElem, count];
  //           const newPair2 = [newElem + pair[1], count];
  //
  //           return [...acc, currentPair, newPair1, newPair2];
  //         }, [])
  //       ),
  //       step + 1,
  //       goal
  //     );
  // };
  // insert(pairsMap, 0, 10);
  // const sortedElements = [...elementsMap2].sort((a, b) => a[1] - b[1]);
  // const part2 =
  //   sortedElements[sortedElements.length - 1][1] - sortedElements[0][1];
  console.log(part1);
});
