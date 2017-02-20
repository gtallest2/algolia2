// Convert .csv to .json

const csvFilePath = 'resources/dataset/restaurants_info.csv'
const csv = require('csvtojson')
const converter = csv({ delimiter:";", toArrayString:true });
var fs = require('fs')

converter
  .fromFile(csvFilePath)
  .on('end_parsed', (jsonArrObj) => {
    const output = JSON.stringify(jsonArrObj);
    fs.writeFile('resources/dataset/converted_csv.json', output, 'utf8', function(){ console.log('.csv file converted to .json. Saved to resources/dataset/converted_csv.json');});
   })
  .on('done', (error) => {
  // console.log(error);
  })
