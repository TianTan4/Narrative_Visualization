// 4. make bar chart
// 5. tooltip!

d3.queue()
  .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  .defer(d3.csv, "./data/all_data.csv", function(row) {
    return {
      continent: row.Continent,
      country: row.Country,
      countryCode: row["Country Code"],
      emissions: +row["Emissions"],
      emissionsPerCapita: +row["Emissions Per Capita"],
      region: row.Region,
      year: +row.Year
    }
  })
  .await(function(error, mapData, data) {
    if (error) throw error;

    var extremeYears = d3.extent(data, d => d.year);
    var currentYear = extremeYears[0];
    var currentDataType = d3.select('input[name="data-type"]:checked')
                            .attr("value");
    var geoData = topojson.feature(mapData, mapData.objects.countries).features;

    var width = +d3.select(".chart-container")
                   .node().offsetWidth;
    var height = 300;

    createMap(width, width * 4 / 5);
    createPie(width, height);
    createBar(width, height);
    drawMap(geoData, data, currentYear, currentDataType);
    drawPie(data, currentYear);
    drawBar(data, currentDataType, "");

    d3.select("#year")
        .property("min", currentYear)
        .property("max", extremeYears[1])
        .property("value", currentYear)
        .on("input", () => {
          currentYear = +d3.event.target.value;
          console.log("this is the first running process")
          console.log("current year is ",currentYear)
          drawMap(geoData, data, currentYear, currentDataType);
          drawPie(data, currentYear);
          highlightBars(currentYear);
        });

        // d3.select("#year-type")
        // .on("click", () => {
        //   currentYear = +d3.event.target.value;
      
        //    console.log("currentYear is ",typeof(currentYear))
        //   d3.select("#year")         
        //   .property("value",currentYear )
        //   drawMap(geoData, data, currentYear, currentDataType);
        //   drawPie(data, currentYear);
        //   highlightBars(currentYear);
        // })

       
        // d3.select('button[value="1990"]')
        // .on("click",()=>{
        //   d3.select("#text")
        //   .text("The overall decline was small, less than two-tenths of 1 percent. Basing its estimate on data from Oak Ridge National Laboratory and British Petroleum, Worldwatch calculated that global emissions in 1990 were 5.803 billion tons, down from 5.813 billion tons in 1989.") 
        // })
        // d3.select('button[value="1995"]')
        // .on("click",()=>{
        //   d3.select("#text")
        //   .text("In 1995, Asia’s gross domestic product became the largest in the world. Interestingly, though, Asia became the largest emitter of CO₂ one year before—in 1993—largely due to rapid economic growth in China. The chart above outlines this significant shift. In the past, the largest share of global emissions came from Europe and Northern America. ") 
        // })
        // d3.select('button[value="2000"]')
        // .on("click",()=>{
        //   d3.select("#text")
        //   .text("According to the Energy Department, the United States released 1,583 million metric tons of carbon from fossil fuel burning in 2000, or 47 million metric tons more than in 1999. The 3.1% growth rate was the biggest since a 3.6% increase in 1996") 
        // })
        // d3.select('button[value="2005"]')
        // .on("click",()=>{
        //   d3.select("#text")
        //   .text("While the United States kept its place as the top CO2 emitter until 2005, Asian countries also started to emerge, led by China. The graph above shows the development of the current top five CO₂-emitting countries since 1960, with the United Kingdom presented for comparison. The UK, once the world’s highest emitter, stabilized its total CO₂ emissions. Russia experienced a significant reduction in emissions with the dissolution of the Soviet Union. But the most obvious development was the rise of China’s emissions in the first part of the 21st century and its overtaking of the United States as the world’s largest emitter after 2005") 
        // })
        // d3.select('button[value="2010"]')
        // .on("click",()=>{
        //   d3.select("#text")
        //   .text("In 2010, China ranked as world’s largest emitter, followed by the United States, India, Russia, and Japan. Tellingly, while the United States was the world’s second-largest emitter in both years, its emissions in 2010 were 266 times greater than those in 1850. In 2011, the countries have changed, but the top 10 emitters still contributed 78 percent of global CO₂ emissions. The first graph above shows the top 10 emitters for CO₂ emissions (excluding land use change and forestry)") 
        // })

        d3.selectAll('button[name="year-type"]')
        .on("click", () => {
          currentYear = +d3.event.target.value;
           console.log("currentYear is ",currentYear)
           if(currentYear===1990){
            d3.select("#text")
            .text("Around 1990, the overall decline was small, less than two-tenths of 1 percent. Basing its estimate on data from Oak Ridge National Laboratory and British Petroleum, Worldwatch calculated that global emissions in 1990 were 5.803 billion tons, down from 5.813 billion tons in 1989.")          
          }
          if(currentYear===1995){
            d3.select("#text")
          .text("In 1995, Asia’s gross domestic product became the largest in the world. Interestingly, though, Asia became the largest emitter of CO₂ one year before—in 1993—largely due to rapid economic growth in China. The chart above outlines this significant shift. In the past, the largest share of global emissions came from Europe and Northern America. ") 
          }
          if(currentYear===2000){
               d3.select("#text")
           .text("In 2000, according to the Energy Department, the United States released 1,583 million metric tons of carbon from fossil fuel burning in 2000, or 47 million metric tons more than in 1999. The 3.1% growth rate was the biggest since a 3.6% increase in 1996") 
      }
          if(currentYear===2005){
            d3.select("#text")
          .text("While the United States kept its place as the top CO2 emitter until 2005, Asian countries also started to emerge, led by China. The graph above shows the development of the current top five CO₂-emitting countries since 1960, with the United Kingdom presented for comparison. The UK, once the world’s highest emitter, stabilized its total CO₂ emissions. Russia experienced a significant reduction in emissions with the dissolution of the Soviet Union. But the most obvious development was the rise of China’s emissions in the first part of the 21st century and its overtaking of the United States as the world’s largest emitter after 2005") 
          
          }
          if(currentYear===2010){
             d3.select("#text")
         .text("In 2010, China ranked as world’s largest emitter, followed by the United States, India, Russia, and Japan. Tellingly, while the United States was the world’s second-largest emitter in both years, its emissions in 2010 were 266 times greater than those in 1850. In 2011, the countries have changed, but the top 10 emitters still contributed 78 percent of global CO₂ emissions. The first graph above shows the top 10 emitters for CO₂ emissions (excluding land use change and forestry)") 

          }

          d3.select("#year")         
          .property("value",currentYear )
          drawMap(geoData, data, currentYear, currentDataType);
          drawPie(data, currentYear);
          highlightBars(currentYear);
        })


    d3.selectAll('input[name="data-type"]')
        .on("change", () => {
          var active = d3.select(".active").data()[0];
          var country = active ? active.properties.country : "";
          currentDataType = d3.event.target.value;
          drawMap(geoData, data, currentYear, currentDataType);
          drawBar(data, currentDataType, country);
        });

    d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);

    function updateTooltip() {
      var tooltip = d3.select(".tooltip");
      var tgt = d3.select(d3.event.target);
      var isCountry = tgt.classed("country");
      var isBar = tgt.classed("bar");
      var isArc = tgt.classed("arc");
      var dataType = d3.select("input:checked")
                       .property("value");
      var units = dataType === "emissions" ? "thousand metric tons" : "metric tons per capita";
      var data;
      var percentage = "";
      if (isCountry) data = tgt.data()[0].properties;
      if (isArc) {
        data = tgt.data()[0].data;
        percentage = `<p>Percentage of total: ${getPercentage(tgt.data()[0])}</p>`;
      }
      if (isBar) data = tgt.data()[0];
      tooltip
          .style("opacity", +(isCountry || isArc || isBar))
          .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
          .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
      if (data) {
        var dataValue = data[dataType] ?
          data[dataType].toLocaleString() + " " + units :
          "Data Not Available";
        tooltip 
            .html(`
              <p>Country: ${data.country}</p>
              <p>${formatDataType(dataType)}: ${dataValue}</p>
              <p>Year: ${data.year || d3.select("#year").property("value")}</p>
              ${percentage}
            `)
      }
    }
  });

function formatDataType(key) {
  return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
}

function getPercentage(d) {
  var angle = d.endAngle - d.startAngle;
  var fraction = 100 * angle / (Math.PI * 2);
  return fraction.toFixed(2) + "%";
}


















