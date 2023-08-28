import { Axis, BaseType, NumberValue, ScaleLinear, Selection } from "d3";
import { axisBottom, axisLeft, line, scaleLinear, select } from "d3";
import { Point } from "../../types";

import data from "./data";

// Set up dimensions
const width: number = 800;
const height: number = 800;
const radius: number = 3;

let xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>;

function initialize() {
  // Create SVG container
  const svg: Selection<BaseType, unknown, HTMLElement, any> = select(
    "#xy-graph",
  )
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
  const yAxis: Axis<NumberValue> = axisLeft(yScale);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
  return svg;
}

// Create circles based on data
function drawPoints(svg) {
  const circles: Selection<
    SVGCircleElement,
    { x: number; y: number },
    SVGSVGElement,
    any
  > = svg.selectAll("circle").data(data);

  // Handle the enter selection - for new data points
  circles
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", radius);

  // Handle the update selection - for existing data points
  circles
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", radius);

  // Handle the exit selection - for data points that no longer exist
  circles.exit().remove();
}

function drawLine(svg, route) {
  const svgLine = line<Point>()
    .x((d) => d.x * 20 + width / 2)
    .y((d) => -d.y * 20 + height / 2);

  // Remove previous lines
  svg.selectAll(".path").remove();
  svg.selectAll(".label").remove();

  // Draw new lines based on the given route
  svg
    .append("path")
    .datum(route.map((idx) => data[idx]))
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("class", "path")
    .attr("d", svgLine);

  // Add labels
  if (route.length > 3) {
    for (let i = 0; i < route.length - 1; i++) {
      const start = data[route[i]];
      const end = data[route[i + 1]];
      const midX = ((start.x + end.x) / 2) * 20 + width / 2;
      const midY = ((-start.y - end.y) / 2) * 20 + height / 2;

      svg
        .append("text")
        .attr("x", midX)
        .attr("y", midY)
        .attr("class", "label")
        .attr("dy", "-0.3em") // This slightly offsets the text upward for better visibility
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text(i + 1); // this is the sequence number
    }
  }
}

export { drawLine, drawPoints, initialize, width, height };
