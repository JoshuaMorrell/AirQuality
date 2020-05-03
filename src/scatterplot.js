import * as d3 from "d3";

export function createScatterplot(data, date, latitude, longitude, pmLevel)
{
  d3.select("#scatterplot").selectAll('*').remove();

  // set the dimensions and margins of the graph
  console.log(d3.select("#scatterplot").node().clientWidth)
  var margin = {top: 10, right: 30, bottom: 30, left: 60};
  let width = d3.select("#scatterplot").node().clientWidth - margin.left - margin.right;
  let height = d3.select("#scatterplot").node().clientHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#scatterplot")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  let listOfElevation = [];
  let listOfPm = [];
  for(let i of data[date])
  {
    if(i[pmLevel] !== null && i.elevation !== undefined)
    {
      listOfElevation.push(i.elevation);
      listOfPm.push(i[pmLevel]);
    }
  }

  console.log(listOfElevation);
  console.log(listOfPm);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([d3.min(listOfElevation), d3.max(listOfElevation)])
    .range([ 0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(listOfPm)])
    .range([ height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(d3.range(0, listOfPm.length))
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(listOfElevation[d]); } )
      .attr("cy", function (d) { return y(listOfPm[d]); } )
      .attr("r", 3)
      .style("fill", "#69b3a2")
}
