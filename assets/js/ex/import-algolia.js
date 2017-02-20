// Merge .json files then import to Algolia Database

var algoliasearch = require('algoliasearch');
var json1 = require('../../resources/dataset/restaurants_info.json');
var json2 = require('../../resources/dataset/restaurants_list.json');
var fs = require('fs');

// Sorting approach
// First sort arrays so that orders match (ascending ObjectIDs)
// Then loop through and merge
// Time complexity: Two sorts, one loop, O(2nlogn + n) => O(nlogn)
// Space complexity: O(n)
// var sortedInfo = json1.sort((a, b) => parseInt(a.objectID) > parseInt(b.objectID) ? 1 : -1);
// var sortedList = json2.sort((a, b) => a.objectID > b.objectID ? 1 : -1);

// for(var j = 0; j < sortedInfo.length; j++) {
//   if(parseInt(sortedInfo[j].objectID) === sortedList[j].objectID) {
//     sortedInfo[j] = Object.assign(sortedInfo[j], sortedList[j]);
//   }
// }

// Loop once through first array, storing values in a new helper array (hash)
// Then loop through second array, checking helper array indices for corresponding
// ObjectIDs and combine merge objects.
// Time complexity: Two iterations of n length, O(2n) => O(n)
// Space complexity: O(m) where m = value of largest ObjectID

var helperArray = [];
var combinedList = [...json2];

for(var i = 0; i < json1.length; i++){
  helperArray[json1[i].objectID] = json1[i];
}

for(var j = 0; j < json2.length; j++){
  if(!helperArray[json2.objectID]){
    combinedList[j] = Object.assign(combinedList[j], helperArray[json2[j].objectID])
    combinedList[j].stars_count = parseFloat(combinedList[j].stars_count)
  }
}

fs.writeFile('combined-list.json', JSON.stringify(combinedList), 'utf8', function(){
  console.log('combined .json written');
});

// Add records to index, then set settings

var client = algoliasearch('AGBNR3G2XW', '40a99372e31284c63c0f37886e1a5ff9');
var index = client.initIndex('merged');

// index.addObjects(combinedList, function(err, content) {
//   if(err) {
//     console.error(err);
//   }
// });

index.setSettings({
  'hitsPerPage': 3,
  'attributesForFaceting': ['food_type', 'stars_count', 'payment_options'],
  'maxValuesPerFacet': 7
  }, function(err) {
      if (!err) {
        console.log('success');
      }
    });
