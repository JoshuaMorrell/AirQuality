import {createMap} from '../src/map.js'
import {createLineChart} from '../src/lineChart.js'
import {createScatterplot} from '../src/scatterplot.js'

import * as d3 from "d3";

let currData = undefined;
let currDate = "2019-01-01";
let currLat = 40.7618;
let currLong = -111.891;
let currPm = 'PM2.5 (ATM)';

let slcData = undefined;
let denverData = undefined;
let laData = undefined;
let minneapolisData = undefined;

export function updateAll(newData, newDate, newLat, newLong)
{
  currData = newData;
  currDate = newDate;
  currLat = newLat;
  currLong = newLong;
}

export function recreateMap()
{
  createMap(currData, currDate, currLat, currLong, currPm);
  createScatterplot(currData, currDate, currLat, currLong, currPm);
}


d3.json("../data/slc.json").then(function(slcD){
  d3.json("../data/denver.json").then(function(denverD){
    d3.json("../data/la.json").then(function(laD){
      d3.json("../data/minneapolis.json").then(function(minneapolisD){

        //This was code to get elevatuon. DO NOT UNCOMMENT, I will lose money to google!!!

        // let latLngList = [];
        //
        // for(let i in laD)
        // {
        //   for(let j of laD[i])
        //   {
        //     if(!(latLngList.some(d => d.lat === j.lat) && latLngList.some(d => d.lng === j.lon)))
        //     {
        //       latLngList.push({lat: +j.lat, lng: +j.lon})
        //     }
        //   }
        // }
        //
        // let returnedList = [];
        //
        //
        // let elevator = new google.maps.ElevationService;
        //
        // elevator.getElevationForLocations({
        //   'locations': latLngList.slice(300, 596)
        // }, function(results, status, error_message) {
        //
        //   for(let i in laD)
        //   {
        //     for(let j of laD[i])
        //     {
        //       for(let k of results)
        //       {
        //
        //         if(j.lat.toFixed(3) == k.location.lat().toFixed(3) && j.lon.toFixed(3) == k.location.lng().toFixed(3))
        //         {
        //           j['elevation'] = k.elevation
        //         }
        //       }
        //     }
        //   }
        // });

        slcData = slcD;
        laData = laD;
        denverData = denverD;
        minneapolisData = minneapolisD;

        currData = slcData;

        createMap(slcData, '2019-01-01', 40.7618, -111.891, currPm);
        createScatterplot(slcData, '2019-01-01', 40.7618, -111.891, currPm);

        createLineChart(slcData, denverData, laData, minneapolisData, currPm);
      });
    });
  });
});

d3.select("#pdLevel").on('change',()=>{
  let val = (document.getElementById('pdLevel')).value;
  currPm = val;
  recreateMap();
  createLineChart(slcData, denverData, laData, minneapolisData, currPm);

})
