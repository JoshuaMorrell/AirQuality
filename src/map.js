import * as d3 from "d3";

export function createMap(data, date, latitude, longitude, pmLevel){

  d3.select("#map").selectAll('*').remove();

  //Create the overlay that we will draw on
  let overlay = new google.maps.OverlayView();

  //The second parameter we want to use is the zoom and center(lat and lng) options for the map
  let options = {
      center: {lat: latitude, lng: longitude}, // Missoula, MT
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.TERRAIN
      // mapTypeId: 'terrain' //This is optional and changes the type of google map shown.
  };
  //Create a new google map object
  let map = new google.maps.Map(d3.select("#map").node(), options);

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function () {

      let layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
          .attr("class", "sensors");

      overlay.onRemove = function () {
          d3.select('.sensors').remove();
      };

      overlay.draw = function () {

        let listOfLat = [];
        let listOfLon = [];
        let listOfLabels = [];
        let listOfRealLabels = [];



        let listOfPm = [];
        for(let i of data[date])
        {
          if(i[pmLevel] !== null && i.elevation !== undefined)
          {
            listOfLat.push(i.lat);
            listOfLon.push(i.lon);
            listOfLabels.push(i.id);
            listOfRealLabels.push(i.label);

            listOfPm.push(i[pmLevel]);
          }
        }

        let projection = this.getProjection(),
            padding = 20;

        let circleScale = d3.scaleLinear()
            .domain([d3.min(listOfPm),
                d3.max(listOfPm)])
            .range([5, 12]).clamp(true);

        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        let marker = layer.selectAll('svg')
            .data(d3.range(0, listOfPm.length));

        let markerEnter = marker.enter().append("svg");

        // add the circle
        markerEnter.append("circle");

        marker.exit().remove();

        marker = marker.merge(markerEnter);

        marker
            .each(transform)
            .attr("class", "marker");


        // style the circle
        marker.select("circle")
            .attr("r", d => circleScale(listOfPm[d]))
            .attr("cx", padding)
            .attr("cy", padding)
            .attr("id", d => {
              return 'a'+ listOfLabels[d];
            })
            .style('opacity', .4)
            .attr('fill', d => {
                return 'red';
            })
            .on('mouseover', (d, i) => {
              console.log("here")
              d3.select("#mapTooltip").transition().duration(200).style("opacity", .9);
              d3.select("#mapTooltip").html("<h5>Label: " +listOfRealLabels[d] + "<h5>Latitude: " + listOfLat[d].toFixed(2) + "</h5><h5>Longitude: "  + listOfLon[d] +  "</h5><h5>PM: "  + listOfPm[d] +  "</h5>")
                .style("left", (d3.event.pageX + 14) + "px")
                .style("top", (d3.event.pageY) + "px");

              d3.selectAll('.hoverScatter').classed('hoverScatter', false)
              d3.select('#a' + listOfLabels[d]+'scat').classed('hoverScatter', true);
            })
            .on('mouseout', () => {
              d3.selectAll('.hoverScatter').classed('hoverScatter', false)
              d3.select("#mapTooltip").transition().duration(200).style("opacity", 0);
            })
            .on('click', d => console.log(d));

        //transforms the markers to the right
        // lat / lng using the projection from google maps
        function transform(d) {
            let latLon = new google.maps.LatLng(listOfLat[d], listOfLon[d]);

            latLon = projection.fromLatLngToDivPixel(latLon);

            return d3.select(this)
                .style("left", (latLon.x - padding) + "px")
                .style("top", (latLon.y - padding) + "px");
        }
    };

    // Bind our overlay to the map…

  };

  overlay.setMap(map);
}
