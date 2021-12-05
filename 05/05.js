const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const segments = contents.split("\n");
  const segmentsCount = segments.length;
  const parsePoint = (p, i) => ({
    [`x${i + 1}`]: parseInt(p.split(",")[0], 10),
    [`y${i + 1}`]: parseInt(p.split(",")[1], 10),
  });
  const parseSegment = (s) => {
    const points = s.split(" -> ");

    return [parsePoint(points[0], 0), parsePoint(points[1], 1)];
  };

  const points = new Map();
  for (let i = 0; i < segmentsCount; i++) {
    const segment = parseSegment(segments[i]);
    const [point1, point2] = segment;
    if (point1.x1 === point2.x2) {
      const [yMin, yMax] =
        point1.y1 > point2.y2 ? [point2.y2, point1.y1] : [point1.y1, point2.y2];
      for (let y = yMin; y <= yMax; y++) {
        const key = `${point1.x1},${y}`;
        points.set(key, points.has(key) ? points.get(key) + 1 : 1);
      }
    } else if (point1.y1 === point2.y2) {
      const [xMin, xMax] =
        point1.x1 > point2.x2 ? [point2.x2, point1.x1] : [point1.x1, point2.x2];
      for (let x = xMin; x <= xMax; x++) {
        const key = `${x},${point1.y1}`;
        points.set(key, points.has(key) ? points.get(key) + 1 : 1);
      }
    }
  }
  const part1 = [...points.values()].filter((x) => x > 1).length;

  console.log(part1);
});
