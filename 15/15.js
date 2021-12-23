const fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, contents) {
  const map = contents
    .split("\n")
    .map((l, y) => l.split("").map((p, x) => [x, y, parseInt(p, 10)]));
  const maxY = map.length - 1;
  const maxX = map[0].length - 1;
  const end = map[maxY][maxX];
  const start = map[0][0];
  const getCell = (matrix, y, x) => {
    const NO_VALUE = undefined;
    let value, hasValue;

    try {
      hasValue = matrix[y][x] !== undefined;
      value = hasValue ? matrix[y][x] : NO_VALUE;
    } catch (e) {
      value = NO_VALUE;
    }

    return value;
  };
  const surroundings = (matrix, y, x) => {
    // Directions are clockwise
    return {
      up: getCell(matrix, y - 1, x),
      upRight: getCell(matrix, y - 1, x + 1),
      right: getCell(matrix, y, x + 1),
      downRight: getCell(matrix, y + 1, x + 1),
      down: getCell(matrix, y + 1, x),
      downLeft: getCell(matrix, y + 1, x - 1),
      left: getCell(matrix, y, x - 1),
      upLeft: getCell(matrix, y - 1, x - 1),
    };
  };
  const shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
    let shortest = null;

    // for each node in the distances object
    for (let node in distances) {
      // if no node has been assigned to shortest yet
      // or if the current node's distance is smaller than the current shortest
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];

      // and if the current node is in the unvisited set
      if (currentIsShortest && !visited.includes(node)) {
        // update shortest to be the current node
        shortest = node;
      }
    }
    return shortest ? shortest.split(",").map(Number) : shortest;
  };
  const findShortestPath = (graph, startNode, endNode) => {
    // track distances from the start node using a hash object
    let distances = {};
    distances[endNode] = "Infinity";
    distances[graph[0][1]] = graph[0][1][2];
    distances[graph[1][0]] = graph[1][0][2];

    // track paths using a hash object
    let parents = { [endNode]: null };
    parents[graph[0][1]] = startNode.join(",");
    parents[graph[1][0]] = startNode.join(",");

    // collect visited nodes
    let visited = [];

    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node:
    while (node) {
      // find its distance from the start node & its child nodes
      let distance = distances[node];
      const { up, down, left, right } = surroundings(graph, node[1], node[0]);
      let children = [up, down, left, right].filter((c) => c !== undefined);
      for (let childIdx in children) {
        // make sure each child node is not the start node
        const child = children[childIdx];
        if (String(child) !== String(startNode)) {
          const newDistance = distance + child[2];
          if (!distances[child] || distances[child] > newDistance) {
            // save the distance to the object
            distances[child] = newDistance;
            // record the path
            parents[child] = node.join(",");
          }
        }
      }
      visited.push(node.join(","));
      // move to the nearest neighbor node
      node = shortestDistanceNode(distances, visited);
    }
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();

    return shortestPath;
  };
  const shortestWithoutStart = findShortestPath(map, start, end).slice(1);

  const part1 = shortestWithoutStart.reduce(
    (acc, p) => (Array.isArray(p) ? acc + p[2] : acc + Number(p.split(",")[2])),
    0
  );

  console.log(part1);
});
