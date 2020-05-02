import {createMap} from './map.js'
import {createLineChart} from './lineChart.js'

d3.json("slc.json").then(function(slcData){
  d3.json("denver.json").then(function(denverData){
    d3.json("la.json").then(function(laData){
      d3.json("minneapolis.json").then(function(minneapolisData){
        createMap(slcData);
        createLineChart(slcData, denverData, laData, minneapolisData);
      });
    });
  });
});
