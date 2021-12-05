const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const allSegments = contents.split("\n");
  const segmentsCount = allSegments.length;
  const parsePoint = (p, i) => ({
    [`x${i + 1}`]: parseInt(p.split(",")[0], 10),
    [`y${i + 1}`]: parseInt(p.split(",")[1], 10),
  });
  const parseSegment = (s) => {
    const points = s.split(" -> ");

    return [parsePoint(points[0], 0), parsePoint(points[1], 1)];
  };
  const drawDiagonal = (start, end) => {
    const xInc = start.x1 > end.x2 ? -1 : 1;
    const yInc = start.y1 > end.y2 ? -1 : 1;
    const yMin =
      yInc === 1 ? Math.min(start.y1, end.y2) : Math.max(start.y1, end.y2);
    const yMax =
      yInc === 1 ? Math.max(start.y1, end.y2) : Math.min(start.y1, end.y2);
    let results = [];
    let x = start.x1;
    if (yInc === 1) {
      for (let y = yMin; y <= yMax; y += yInc) {
        results.push({ x, y });
        x += xInc;
      }
    } else {
      for (let y = yMin; y >= yMax; y += yInc) {
        results.push({ x, y });
        x += xInc;
      }
    }

    return results;
  };

  const countOverlappingPoints = (segments, part) => {
    const points = new Map();
    for (let i = 0; i < segmentsCount; i++) {
      const segment = parseSegment(segments[i]);
      const [point1, point2] = segment;
      if (point1.x1 === point2.x2) {
        const [yMin, yMax] =
          point1.y1 > point2.y2
            ? [point2.y2, point1.y1]
            : [point1.y1, point2.y2];
        for (let y = yMin; y <= yMax; y++) {
          const key = `${point1.x1},${y}`;
          points.set(key, points.has(key) ? points.get(key) + 1 : 1);
        }
      } else if (point1.y1 === point2.y2) {
        const [xMin, xMax] =
          point1.x1 > point2.x2
            ? [point2.x2, point1.x1]
            : [point1.x1, point2.x2];
        for (let x = xMin; x <= xMax; x++) {
          const key = `${x},${point1.y1}`;
          points.set(key, points.has(key) ? points.get(key) + 1 : 1);
        }
      } else if (part === 2) {
        const diagonalPoints = drawDiagonal(point1, point2);
        diagonalPoints.forEach((p) => {
          const key = `${p.x},${p.y}`;
          points.set(key, points.has(key) ? points.get(key) + 1 : 1);
        });
      }
    }

    return [...points.values()].filter((x) => x > 1).length;
  };

  console.log(
    countOverlappingPoints(allSegments, 1),
    countOverlappingPoints(allSegments, 2)
  );
});
