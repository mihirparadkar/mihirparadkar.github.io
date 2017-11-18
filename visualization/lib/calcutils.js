/*
Ideal gas law formulation to get volume of CO2
*/
function grams2m3 (grams) {
  // molar mass of CO2 is 40g/mol
  var moles = grams/40;

  //At stp conditions, a mole of ideal gas takes up 22.4 L
  var liters = moles * 22.4;

  //We need meters cubed for the threejs unit system so divide liters by 1000
  var m3 = liters/1000;
  return m3;
}

//Simple cube root function
function cbrt (num) {
  return Math.pow(num,1/3);
}

function m3toRadius (m3) {
  return cbrt(3*m3/(4*Math.PI));
}

function dot (arr1,arr2) {
  if (arr1.length !== arr2.length) {
    console.log("array lengths not the same size");
    return;
  } else {
    var sum = 0;
    for (var i = 0; i < arr1.length; i++) {
      sum += arr1[i]*arr2[i];
    }
    return sum;
  }
}

//Implementation of the cubic regression model I fit in R to the dataset
//Coefficients are taken from an R output, code available on request
function cubic_model (mpg,cyls,drive,year,vclass,transtype,displ,fueltype) {

  var intercept = 2.67986442716455e+06;


  var drivecoeffs = {
    "2-Wheel Drive": 1.026,
    "4-Wheel Drive": -1.143,
    "Front-Wheel Drive": 2.813,
    "Part-time 4-Wheel Drive": -6.652,
    "Rear-Wheel Drive": -1.282
  };


  var fueltypecoeffs = {
    "Diesel": 0,
    "Regular Gasoline": -5.284e1,
    "Midgrade Gasoline": -4.827e1,
    "Premium Gasoline": -5.382e1
  };


  var transmissioncoeffs = {
    "Automatic": -4.922,
    "Manual": -3.4
  };


  var vclasscoeffs = {
    "Cargo Van": 0,
    "Compact Car": 10.305281,
    "Large Car": 10.124113,
    "Midsize Car": 11.347355,
    "Midsize-Large Station Wagon": 8.543,
    "Midsize Station Wagon": 8.788,
    "MiniCompact Car": 1.140e1,
    "Minivan": 6.79,
    "Passenger Van": 1.771,
    "Small Pickup Truck": 3.556,
    "Small Sport Utility Vehicle": 8.691,
    "Small Station Wagon": 1.026e1,
    "Special Purpose Vehicle": 3.326,
    "Sport Utility Vehicle": 3.348,
    "Standard Pickup Truck": 1.555,
    "Standard Sport Utility Vehicle": 4.473,
    "SubCompact Car": 1.119e1,
    "Two Seater": 14.080443,
    "Van": 3.042
  };

  var mpgcoeffs = [-1.048021e+02, 2.765369e+00, -2.580640e-02];
  var cylcoeffs = [-1.616963e+00, 1.175681e-01, 3.127129e-03];
  var displcoeffs = [2.551929e+01, -7.067862e+00, 6.464952e-01];
  //Extra precision for the year coefficients because cubing a year makes it really big
  var yearcoeffs = [-4.01551047404126e+03, 2.00680574536187e+00, -3.34298693027885e-04];
  var combined = [mpg, mpg*mpg, mpg*mpg*mpg];
  var cylinders = [cyls, cyls*cyls, cyls*cyls*cyls];
  var displacement = [displ, displ*displ, displ*displ*displ];
  var modelyear = [year, year*year, year*year*year];
  // (mpg,cyls,drive,year,vclass,transtype,displ,fueltype)
  var co2pred = intercept;
  co2pred += dot(mpgcoeffs,combined) + dot(cylinders,cylcoeffs) + dot(displacement,displcoeffs) + dot(modelyear,yearcoeffs);
  co2pred += drivecoeffs[drive] + vclasscoeffs[vclass] + transmissioncoeffs[transtype] + fueltypecoeffs[fueltype];

  return co2pred;

}

function predictCO2(model) {
  var mpg = 1*d3.select("#combined").property("value");
  var cyls = 1*d3.select("#cylinders").property("value");
  var year = 1*d3.select("#year").property("value");
  var displ = 1*d3.select("#displ").property("value");
  var drive = d3.select("#drive").property("value");
  var vclass = d3.select("#vclass").property("value");
  var transtype = d3.select("#transmissiontype").property("value");
  var fueltype = d3.select("#fueltype").property("value");
  return model(mpg,cyls,drive,year,vclass,transtype,displ,fueltype);
}

var AVG_MILES_PER_DAY = 35;
var AVG_MPH = 60;
var CO2_ABSORPTION_PER_YEAR_LBS = 910;//48;

//return number of trees needed to offset given co2 output / minute
/*function numTrees(){
  var grams_co2_per_Mile = predictCO2(cubic_model);
  var miles_per_day = AVG_MILES_PER_DAY;
  var lb_co2_per_day = grams_co2_per_Mile * miles_per_day / 1000 * 2.2;
  var lb_co2_absorption_per_day = CO2_ABSORPTION_PER_YEAR_LBS / 365;
  var treesNeeded = lb_co2_per_day / lb_co2_absorption_per_day;

  return treesNeeded;
}*/

function numTrees(){
  var gco2pmile = predictCO2(cubic_model);
  var miles_per_day = 35;
  var lbs_per_day = gco2pmile/454 * miles_per_day;
  var lb_co2_absorption_per_day = CO2_ABSORPTION_PER_YEAR_LBS / 365;
  var treesNeeded = lbs_per_day / lb_co2_absorption_per_day;

  return treesNeeded;
}
