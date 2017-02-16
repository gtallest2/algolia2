const csvFilePath = 'resources/dataset/test_restaurant.csv'
const csv = require('csvtojson')
const converter = csv({ delimiter:";", toArrayString:true });
var fs = require('fs')


function saveJSON(stream, callback) {
  var output = [];
  stream
    .fromFile(csvFilePath)
   .on('json', (jsonObj) => {

  })
   .on('end_parsed', (jsonArrObj) => {
    output = JSON.stringify(jsonArrObj);
    callback(output);
     // fs.writeFile('myjsonfile.json', json, 'utf8', function(){ console.log('written');});
  })
   .on('done', (error) => {
    // console.log(error);
  })
}
var save = 'hi';
saveJSON(converter, function(data) {
  save = data;
  console.log(save);
});

console.log(save);
