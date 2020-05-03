// 2. Use the margin convention practice
import * as d3 from "d3";
import {updateAll, recreateMap} from '../src/main.js'

export function createLineChart(slcData, denverData, laData, minneapolisData, pmLevel)
{

  d3.select("#lineChart").selectAll('*').remove();

  let margin = {top: 50, right: 50, bottom: 50, left: 50};
  let width = d3.select("#lineChart").node().clientWidth - margin.left - margin.right; // Use the window's width
  let height = d3.select("#lineChart").node().clientHeight - margin.top - margin.bottom; // Use the window's height

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
      if(!isNaN(+i[pmLevel]))
      {
        currAverage += +i[pmLevel];

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
      if(!isNaN(+i[pmLevel]))
      {
        currAverage += +i[pmLevel];

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
      if(!isNaN(+i[pmLevel]))
      {
        currAverage += +i[pmLevel];

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
      if(!isNaN(+i[pmLevel]))
      {
        currAverage += +i[pmLevel];

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


  addLine(svg, line, xScale, yScale, margin, width, height, slcMonthly, slcData,  'slcClass', 40.7618, -111.891)
  addLine(svg, line, xScale, yScale, margin, width, height, denverMonthly, denverData,  'denverClass', 39.7392, -104.99)
  addLine(svg, line, xScale, yScale, margin, width, height, laMonthly, laData,  'laClass', 34.05, -118.24)
  addLine(svg, line, xScale, yScale, margin, width, height, minneapolisMonthly, minneapolisData, 'minneapolisClass', 44.978, -93.265)

}

function addLine(svg, line, xScale, yScale, margin, width, height, dataset, dataToPass, className, lat, lng)
{

  svg.append("path")
      .datum(dataset)
      .attr("class", className)
      .attr("d", line);

  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
      .classed("dot" + className, true)
      .attr("cx", function(d, i) { return xScale(i) })
      .attr("cy", function(d) { return yScale(d) })
      .attr("r", 5)
        .on("click", function(data, i) {
          console.log(i);
          let monthString = '';
          switch(i){
            case 0:
              monthString = '2019-01-01';
              break;
            case 1:
              monthString = '2019-02-01';
              break;
            case 2:
              monthString = '2019-03-01';
              break;
            case 3:
              monthString = '2019-04-01';
              break;
            case 4:
              monthString = '2019-05-01';
              break;
            case 5:
              monthString = '2019-06-01';
              break;
            case 6:
              monthString = '2019-07-01';
              break;
            case 7:
              monthString = '2019-08-01';
              break;
            case 8:
              monthString = '2019-09-01';
              break;
            case 9:
              monthString = '2019-10-01';
              break;
            case 10:
              monthString = '2019-11-01';
              break;
            case 11:
              monthString = '2019-12-01';
              break;
          };

          d3.select('.selectedDot').classed('selectedDot', false)

          d3.select(this).classed('selectedDot', true)
          updateAll(dataToPass, monthString, lat, lng);
          recreateMap();
      })
      .on('mouseover', (d, i) =>
      {
        let monthString = '';
        switch(i){
          case 0:
            monthString = '2019-01-01';
            break;
          case 1:
            monthString = '2019-02-01';
            break;
          case 2:
            monthString = '2019-03-01';
            break;
          case 3:
            monthString = '2019-04-01';
            break;
          case 4:
            monthString = '2019-05-01';
            break;
          case 5:
            monthString = '2019-06-01';
            break;
          case 6:
            monthString = '2019-07-01';
            break;
          case 7:
            monthString = '2019-08-01';
            break;
          case 8:
            monthString = '2019-09-01';
            break;
          case 9:
            monthString = '2019-10-01';
            break;
          case 10:
            monthString = '2019-11-01';
            break;
          case 11:
            monthString = '2019-12-01';
            break;
        };

        let cityString = "";

        switch(className)
        {
          case 'slcClass':
            cityString = "Salt Lake City";
            break;
          case 'denverClass':
            cityString = "Denver";
            break;
          case 'laClass':
            cityString = "Los Angeles";
            break;
          case 'minneapolisClass':
            cityString = "Minneapolis";
            break;
        }

        d3.select("#mapTooltip").transition().duration(200).style("opacity", .9);
        d3.select("#mapTooltip").html("<h5>City: " + cityString + "<h5>Date: " + monthString + "</h5><h5>Monthly Average PM: "  + d.toFixed(2) +  "</h5>")
          .style("left", (d3.event.pageX + 14) + "px")
          .style("top", (d3.event.pageY) + "px");
      })
      .on('mouseout', () => {
        d3.select("#mapTooltip").transition().duration(200).style("opacity", 0);
      })
}
