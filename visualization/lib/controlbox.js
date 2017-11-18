var cadillac = [17, 8, "4-Wheel Drive", 2016, "Sport Utility Vehicle", "Automatic", 6.2, "Midgrade Gasoline", "2016 Cadillac Escalade"];
var lambo = [13, 12, "Rear-Wheel Drive", 2016, "Two Seater", "Automatic", 6.5, "Premium Gasoline","2016 Lamborghini Aventador"];
var camry = [26, 4, "Front-Wheel Drive", 2011, "Midsize Car", "Manual", 2.5, "Regular Gasoline", "2011 Toyota Camry"];
var explorer = [15, 6, "4-Wheel Drive", 1997, "Standard Sport Utility Vehicle", "Automatic", 4.0, "Regular Gasoline","1997 Ford Explorer"];
var volkswagen = [35, 4, "Front-Wheel Drive", 2005, "Compact Car", "Manual", 1.9, "Diesel","2005 Volkswagen Golf"];
var samplecars = [cadillac, lambo, camry, explorer, volkswagen];

function setSample(carIndex){
  var car = samplecars[carIndex];
  document.getElementById("combined").value = car[0];
  document.getElementById("cylinders").value = car[1];
  document.getElementById("drive").value = car[2];
  document.getElementById("year").value = car[3];
  document.getElementById("vclass").value = car[4];
  document.getElementById("transmissiontype").value = car[5];
  document.getElementById("displ").value = car[6];
  document.getElementById("fueltype").value = car[7];
  setMPG();
  setCylinders();
  setDrive();
  setYear();
  setVClass();
  setTransmission();
  setDisplacement();
  setFuel();
  setTrees();
  // document.getElementById("current").innerHTML = "<h3>" + samplecars[carIndex][8] + "</h3>";
}


function setMPG () {
  var mpg = d3.select("#combined").property("value");
  d3.select("#boxmpg").html(mpg);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setCylinders () {
  var cyls = d3.select("#cylinders").property("value");
  d3.select("#boxcyls").html(cyls);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setDrive () {
  var drive = d3.select("#drive").property("value");
  d3.select("#boxdrive").html(drive);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setYear () {
  var year = d3.select("#year").property("value");
  d3.select("#boxyear").html(year);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setVClass () {
  var vclass = d3.select("#vclass").property("value");
  d3.select("#boxvclass").html(vclass);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setTransmission () {
  var trany = d3.select("#transmissiontype").property("value");
  d3.select("#boxtransmission").html(trany);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setDisplacement () {
  var displ = d3.select("#displ").property("value");
  d3.select("#boxdispl").html(displ);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

function setFuel () {
  var fueltype = d3.select("#fueltype").property("value");
  d3.select("#boxfueltype").html(fueltype);
  // document.getElementById("current").innerHTML = "<h3>" + "Custom Built" + "</h3>";
}

var rows = [];

function setTrees() {
  var table = d3.select("#trees");
  table.selectAll('tr').data(rows).remove();
  var nTrees = numTrees();
  var full = Math.floor(nTrees);
  var extra = nTrees - full;
  rows = [];
  for (var i = 0; i <= full; i += 10) {
    rows.push(i);
  }
  var tr = table.selectAll('tr')
    .data(rows).enter()
    .append('tr');
  for (var i = 0; i < 10; i++) {
    tr.append('td')
      .attr('id', 'treeTD')
      .html( function(d) {
      if (d + i < full)
        return '<img id="tree" src="../assets/A_Simple_Green_Tree.svg" alt="Tree" style="transform: scale(' + 1.5 + ', ' + 1.5 + ');">';
      else if (d + i < nTrees) {
        return '<img id="tree" style="transform: scale(' + Math.sqrt(extra)*1.5 + ', ' + Math.sqrt(extra)*1.5 + ');" src="../assets/A_Simple_Green_Tree.svg" alt="Tree">';
      }
      else {
        return "";
      }
    });
  }
  // d3.select("#treesnum").html(numTrees().toPrecision(2));
  updateTreeLegend();
}

function updateTreeLegend(){
  d3.select("#treeLegend").select("svg").remove();
  var treeLeg = d3.select("#treeLegend")
        .append("svg").attr("width", 300)
        .attr("height", 50);

        treeLeg.append("circle")
        .attr("r", 5).attr("cx", 5)
        .attr("cy", 5).style("fill", "black")
        .style("opacity", "1");
        treeLeg.append("text")
        .attr("transform", "translate(" + 15 + "," + 9 + ")")
        .attr("text-anchor", "start")
        .style("color", "#C0C0C0")
        .style("font-size", "8pt")
        .text("Your vehicle");

        treeLeg.append("circle")
        .attr("r", 5).attr("cx", 5)
        .attr("cy", 25).style("fill", "#004d00")
        .style("opacity", "1");
        treeLeg.append("text")
        .attr("transform", "translate(" + 15 + "," + 25 + ")")
        .attr("text-anchor", "start")
        .style("color", "#C0C0C0")
        .style("font-size", "8pt")
        .text("Trees required to offset your vehicle's emissions: " + numTrees().toPrecision(3));

}
