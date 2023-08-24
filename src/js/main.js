// Sample data
const data = [{ x: 0, y: 0 }];

// Set up dimensions
const width = 800;
const height = 800;

// Create SVG container
const svg = d3.select("#xy-graph").attr("width", width).attr("height", height);

// Create scales
const xScale = d3.scaleLinear().domain([-20, 20]).range([0, width]);

const yScale = d3.scaleLinear().domain([-20, 20]).range([height, 0]);

const xAxisGroup = svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height / 2})`);

const yAxisGroup = svg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", `translate(${width / 2}, 0)`);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

// Create circles based on data
function drawPoints() {
  const circles = svg.selectAll("circle").data(data);

  // Handle the enter selection - for new data points
  circles
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 5);

  // Handle the update selection - for existing data points
  circles
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 5);

  // Handle the exit selection - for data points that no longer exist
  circles.exit().remove();
}

drawPoints();

svg.on("click", function () {
  // Get mouse positions relative to the SVG container
  const [x, y] = d3.mouse(this);
  const scaledX = (x - 400) / 20;
  const scaledY = -(y - 400) / 20;

  data.push({ x: scaledX, y: scaledY });
  drawPoints();
});
