var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');
var fs = require('fs');

var client = algoliasearch('AGBNR3G2XW', '40a99372e31284c63c0f37886e1a5ff9');
var index = client.initIndex('merged');
var helper = algoliasearchHelper(client, 'merged', {
  facets: ['food_type', 'stars_count'],
  disjunctiveFacets: ['payment_options'],
  // aroundLatLngViaIP: true
});

helper.on('result', function(content) {
  console.log(content);
  fs.writeFile('example-search.json', JSON.stringify(content), 'utf8', function(){
  console.log('example-search.json written');
});
})

helper.setQuery('lucca').search();


