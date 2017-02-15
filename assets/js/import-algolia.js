var algoliasearch = require('algoliasearch');
var json1 = require('../../resources/dataset/restaurants_info.json');
var json2 = require('../../resources/dataset/restaurants_list.json');

var sortedInfo = json1.sort((a, b) => parseInt(a.objectID) > parseInt(b.objectID) ? 1 : -1);
var sortedList = json2.sort((a, b) => a.objectID > b.objectID ? 1 : -1);

for(var i = 0; i < sortedInfo.length; i++) {
  if(parseInt(sortedInfo[i].objectID) === sortedList[i].objectID) {
    sortedInfo[i] = Object.assign(sortedInfo[i], sortedList[i]);
  }
}

var combinedList = sortedInfo;


var client = algoliasearch('AGBNR3G2XW', '40a99372e31284c63c0f37886e1a5ff9');
var index = client.initIndex('merged');

index.addObjects(combinedList, function(err, content) {
  if(err) {
    console.error(err);
  }
});
