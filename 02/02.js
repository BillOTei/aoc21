const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const commands = contents.split("\n");
  const getValue = (c) => parseInt(c.substr(-1), 10);

  const processCommand = (c, pos) => {
    const value = getValue(c);
    return c.indexOf("forward ") !== -1
      ? { ...pos, horizontal: pos.horizontal + value }
      : c.indexOf("up ") !== -1
      ? { ...pos, depth: pos.depth - value }
      : { ...pos, depth: pos.depth + value };
  };
  const processCommand2 = (c, pos) => {
    const value = getValue(c);

    return c.indexOf("forward ") !== -1
      ? {
          ...pos,
          horizontal: pos.horizontal + value,
          depth: pos.depth + pos.aim * value,
        }
      : c.indexOf("up ") !== -1
      ? { ...pos, aim: pos.aim - value }
      : { ...pos, aim: pos.aim + value };
  };

  const part1 = commands.reduce((acc, c) => processCommand(c, acc), {
    horizontal: 0,
    depth: 0,
  });

  const part2 = commands.reduce((acc, c) => processCommand2(c, acc), {
    horizontal: 0,
    depth: 0,
    aim: 0,
  });

  console.log(part1.horizontal * part1.depth, part2.horizontal * part2.depth);
});
