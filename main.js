import {createMap} from './map.js'
import {createLineChart} from './lineChart.js'
import * as d3 from "d3";


d3.json("data/slc.json").then(function(slcData){
  d3.json("data/denver.json").then(function(denverData){
    d3.json("data/la.json").then(function(laData){
      d3.json("data/minneapolis.json").then(function(minneapolisData){
        createMap(slcData);
        createLineChart(slcData, denverData, laData, minneapolisData);
      });
    });
  });
});
