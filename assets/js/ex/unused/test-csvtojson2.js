var csv = require('../../resources/dataset/test_restaurant.csv');

function csvJSON(csv) {
  var lines = csv.split("\n");

  var output = [];

  var header = lines[0].split(';');

  // for(var i = 1; i < lines.length; i++){
  //   var obj = {};
  //   // var currentline = lines[i].split(';');
  //   console.log(currentline);

  //   // for(var j = 0; j < header.length; j++){
  //   //   obj[header[j]] = currentline[j];
  //   // }

  //   output.push(obj);
  // }

  return JSON.stringify(output);
}

console.log(csvJSON(csv));
