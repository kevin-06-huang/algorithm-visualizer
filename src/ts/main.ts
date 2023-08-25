import * as d3 from "d3";

import data from "./data";
import { drawLine, drawPoints, initialize, width, height } from "./visualization";
import { distance, heldKarp, backtrack } from "./algorithms";

const svg = initialize();

drawPoints(svg);

svg.on("click", function (event) {
  // Get mouse positions relative to the SVG container
  const [x, y]: [number, number] = d3.pointer(event);
  const scaledX: number = (x - width / 2) / 20;
  const scaledY: number = -(y - height / 2) / 20;

  data.push({ x: scaledX, y: scaledY });

  const dists: number[][] = Array.from({ length: data.length }, (_, i) =>
    Array.from({ length: data.length }, (_, j) => distance(data[i], data[j])),
  );

  const [minDistance, dp] = heldKarp(dists);
  const route: number[] = backtrack(dists, dp);
  // console.log("Minimum Distance:", minDistance);
  // console.log("Route:", route.map(idx => data[idx]));

  drawPoints(svg);
  drawLine(svg, route);
});
