// 2. Use the margin convention practice
import * as d3 from "d3";


export function createLineChart(slcData, denverData, laData, minneapolisData)
{
  var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 800 - margin.left - margin.right // Use the window's width
    , height = 800 - margin.top - margin.bottom; // Use the window's height

  var n = 12;

  let slcMonthly = [];
  let denverMonthly = [];
  let laMonthly = [];
  let minneapolisMonthly = [];

  //findAverages
  for(let j in slcData)
  {
    let currAverage = 0;
    let counter = 0;
    for(let i of slcData[j])
    {
      // console.log(i)
      if(!isNaN(+i["PM1.0 (ATM)"]))
      {
        currAverage += +i["PM1.0 (ATM)"];

        counter++;
      }
    }
    slcMonthly.push(currAverage/counter);
  }

  for(let j in minneapolisData)
  {
    let currAverage = 0;
    let counter = 0;
    for(let i of minneapolisData[j])
    {
      // console.log(i)
      if(!isNaN(+i["PM1.0 (ATM)"]))
      {
        currAverage += +i["PM1.0 (ATM)"];

        counter++;
      }
    }
    minneapolisMonthly.push(currAverage/counter);
  }

  for(let j in denverData)
  {
    let currAverage = 0;
    let counter = 0;
    for(let i of denverData[j])
    {
      // console.log(i)
      if(!isNaN(+i["PM1.0 (ATM)"]))
      {
        currAverage += +i["PM1.0 (ATM)"];

        counter++;
      }
    }
    denverMonthly.push(currAverage/counter);
  }

  for(let j in laData)
  {
    let currAverage = 0;
    let counter = 0;
    for(let i of laData[j])
    {
      // console.log(i)
      if(!isNaN(+i["PM1.0 (ATM)"]))
      {
        currAverage += +i["PM1.0 (ATM)"];

        counter++;
      }
    }
    laMonthly.push(currAverage/counter);
  }



  var xScale = d3.scaleLinear()
      .domain([0, n-1])
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .domain([d3.min(slcMonthly.concat(laMonthly, denverMonthly, minneapolisMonthly)), d3.max(slcMonthly.concat(laMonthly, denverMonthly, minneapolisMonthly))])
      .range([height, 0]);

  var line = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); })

  var svg = d3.select("#lineChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));


  addLine(svg, line, xScale, yScale, margin, width, height, slcMonthly, 'slcClass')
  addLine(svg, line, xScale, yScale, margin, width, height, denverMonthly, 'denverClass')
  addLine(svg, line, xScale, yScale, margin, width, height, laMonthly, 'laClass')
  addLine(svg, line, xScale, yScale, margin, width, height, minneapolisMonthly, 'minneapolisClass')

}

function addLine(svg, line, xScale, yScale, margin, width, height, dataset, className)
{

  svg.append("path")
      .datum(dataset)
      .attr("class", className)
      .attr("d", line);

  svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle")
      .attr("class", "dot" + className)
      .attr("cx", function(d, i) { return xScale(i) })
      .attr("cy", function(d) { return yScale(d) })
      .attr("r", 5)
        .on("mouseover", function(a, b, c) {
          console.log(a)
          this.attr('class', 'focus')
      })
}
