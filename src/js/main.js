// Sample data
const data = [
  { x: 10, y: 10 },
  { x: -10, y: 10 },
  { x: 10, y: -10 },
  { x: -10, y: -10 },
  // ...
];

// Set up dimensions
const width = 800;
const height = 800;

// Create SVG container
const svg = d3.select("#xy-graph")
  .attr("width", width)
  .attr("height", height);

// Create scales
const xScale = d3.scaleLinear()
  .domain([-20, 20])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([-20, 20])
  .range([height, 0]);

const xAxisGroup = svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height/2})`);

const yAxisGroup = svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", `translate(${width/2}, 0)`);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

// Create circles based on data
svg.selectAll("circle")
 .data(data)
 .enter()
 .append("circle")
 .attr("cx", d => xScale(d.x))
 .attr("cy", d => yScale(d.y))
 .attr("r", 5);
