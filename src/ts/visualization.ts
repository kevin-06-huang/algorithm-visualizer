import { Axis, BaseType, NumberValue, ScaleLinear, Selection } from 'd3';
import { axisBottom, axisLeft, scaleLinear, select } from 'd3';

import data from "./data";

// Set up dimensions
const width: number = 800;
const height: number = 800;

let xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>;

function initialize() {
  // Create SVG container
  const svg: Selection<BaseType, unknown, HTMLElement, any> = 
    select("#xy-graph")
    .attr("width", width)
    .attr("height", height);

  // Create scales
  xScale = scaleLinear().domain([-20, 20]).range([0, width]);

  yScale = scaleLinear().domain([-20, 20]).range([height, 0]);

  const xAxisGroup = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height / 2})`);

  const yAxisGroup = svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${width / 2}, 0)`);

  const xAxis: Axis<NumberValue> = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
  return svg;
}

// Create circles based on data
function drawPoints(svg) {
  const circles: Selection<SVGCircleElement, { x: number, y: number }, SVGSVGElement, any> = svg.selectAll("circle").data(data);

  // Handle the enter selection - for new data points
  circles
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 3);

  // Handle the update selection - for existing data points
  circles
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 3);

  // Handle the exit selection - for data points that no longer exist
  circles.exit().remove();
}

export { drawPoints, initialize, width, height };
