const data = require("./data");
const { drawPoints, initialize, width, height } = require("./visualization");

const svg = initialize();

drawPoints(svg);

svg.on("click", function () {
  // Get mouse positions relative to the SVG container
  const [x, y] = d3.mouse(this);
  const scaledX = (x - width / 2) / 20;
  const scaledY = -(y - height / 2) / 20;

  data.push({ x: scaledX, y: scaledY });
  drawPoints(svg);
});
