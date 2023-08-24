import * as d3 from 'd3';

import data from "./data";
import { drawPoints, initialize, width, height } from "./visualization";

const svg = initialize();

drawPoints(svg);

svg.on("click", function (event) {
  // Get mouse positions relative to the SVG container
  const [x, y] = d3.pointer(event);
  const scaledX = (x - width / 2) / 20;
  const scaledY = -(y - height / 2) / 20;

  data.push({ x: scaledX, y: scaledY });
  drawPoints(svg);
});
