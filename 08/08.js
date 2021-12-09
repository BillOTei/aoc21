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

  const permutations = (str) => {
    if (str.length === 1) return str;
    let permut = [];
    for (let i = 0; i < str.length; i++) {
      const s = str[0];
      const _new = permutations(str.slice(1, str.length));
      for (let j = 0; j < _new.length; j++) permut.push(s + _new[j]);
      str = str.substr(1, str.length - 1) + s;
    }
    return permut;
  };
  const getDigitMap = (s, i) =>
    new Map([...permutations(s).map((s) => [s, i])]);
  const getMap = (l) => {
    const one = l.find((s) => s.length === 2);
    const four = l.find((s) => s.length === 4);
    const seven = l.find((s) => s.length === 3);
    const eight = l.find((s) => s.length === 7);
    const three = l.find(
      (s) =>
        s.length === 5 &&
        s.indexOf(one.split("")[0]) !== -1 &&
        s.indexOf(one.split("")[1]) !== -1
    );
    const six = l.find(
      (s) =>
        s.length === 6 &&
        (s.indexOf(one.split("")[0]) === -1 ||
          s.indexOf(one.split("")[1]) === -1)
    );
    const nine = l.find(
      (s) =>
        s.length === 6 &&
        s !== six &&
        s.indexOf(four.split("")[0]) !== -1 &&
        s.indexOf(four.split("")[1]) !== -1 &&
        s.indexOf(four.split("")[2]) !== -1 &&
        s.indexOf(four.split("")[3]) !== -1
    );
    const zero = l.find((s) => s.length === 6 && s !== six && s !== nine);
    const five = l.find(
      (s) =>
        s.length === 5 &&
        s !== three &&
        nine.indexOf(s.split("")[0]) !== -1 &&
        nine.indexOf(s.split("")[1]) !== -1 &&
        nine.indexOf(s.split("")[2]) !== -1 &&
        nine.indexOf(s.split("")[3]) !== -1 &&
        nine.indexOf(s.split("")[4]) !== -1
    );
    const two = l.find((s) => s.length === 5 && s !== five && s !== three);

    return [
      getDigitMap(zero, "0"),
      new Map(),
      getDigitMap(two, "2"),
      getDigitMap(three, "3"),
      new Map(),
      getDigitMap(five, "5"),
      getDigitMap(six, "6"),
      new Map(),
      new Map(),
      getDigitMap(nine, "9"),
    ];
  };
  const wordToDigit = (w, m) => {
    switch (w.length) {
      case 2:
        return "1";
      case 3:
        return "7";
      case 4:
        return "4";
      case 5:
        return m[2].get(w) || m[3].get(w) || m[5].get(w);
      case 6:
        return m[0].get(w) || m[6].get(w) || m[9].get(w);
      case 7:
        return "8";
    }
  };
  const part2 = instructions.reduce((count, ins) => {
    const [inputValues, outputValues] = ins.split(" | ");
    const m = getMap(inputValues.split(" "));

    return (
      count +
      parseInt(
        outputValues.split(" ").reduce((acc, w) => acc + wordToDigit(w, m), ""),
        10
      )
    );
  }, 0);

  console.log(part1, part2);
});
