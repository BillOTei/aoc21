const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const commands = contents.split("\n");
  const processCommand = (c, pos) => {
    const value = parseInt(c.substr(-1), 10);

    return c.indexOf("forward ") !== -1
      ? { ...pos, horizontal: pos.horizontal + value }
      : c.indexOf("up ") !== -1
      ? { ...pos, depth: pos.depth - value }
      : { ...pos, depth: pos.depth + value };
  };

  const part1 = commands.reduce((acc, c) => processCommand(c, acc), {
    horizontal: 0,
    depth: 0,
  });

  console.log(part1.horizontal * part1.depth);
});
