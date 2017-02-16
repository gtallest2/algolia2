var algoliasearch = require('algoliasearch');
var json1 = require('../../resources/dataset/restaurants_info.json');
var json2 = require('../../resources/dataset/restaurants_list.json');

// var sortedInfo = json1.sort((a, b) => parseInt(a.objectID) > parseInt(b.objectID) ? 1 : -1);
// var sortedList = json2.sort((a, b) => a.objectID > b.objectID ? 1 : -1);

// for(var j = 0; j < sortedInfo.length; j++) {
//   if(parseInt(sortedInfo[j].objectID) === sortedList[j].objectID) {
//     sortedInfo[j] = Object.assign(sortedInfo[j], sortedList[j]);
//   }
// }

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


var client = algoliasearch('AGBNR3G2XW', '40a99372e31284c63c0f37886e1a5ff9');
var index = client.initIndex('merged');

index.addObjects(combinedList, function(err, content) {
  if(err) {
    console.error(err);
  }
});

index.setSettings({
  'hitsPerPage': 3,
  'attributesForFaceting': ['food_type', 'stars_count', 'payment_options'],
  'maxValuesPerFacet': 10
  }, function(err) {
      if (!err) {
        console.log('success');
      }
    });
