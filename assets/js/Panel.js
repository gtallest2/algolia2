import React from 'react'
import { client, index, helper } from './algolia'

import Search from './Search'
import Filters from './Filters'
import Results from './Results'

const Panel = React.createClass({
  getInitialState(){
    return {
      searchQuery: '',
      results: [],
      hitsPerPage: 3,
    }
  },
  componentDidMount(){
     helper.on('result', (content) => {
     this.updateResults(content);
    });
  },
  handleSearch(query){
    helper.setQuery(query).search();

    // let updateResults = this.updateResults;
    // let result;
    // index.search(query, function searchDone(err, content) {
    // result = content;
    this.updateQuery(query);
    // updateResults(result);
    // });
  },
  showMore(){
    let query = this.state.searchQuery;
    let hitsPerPage = this.state.hitsPerPage + 5;
    let updateResults = this.updateResults;
    let updateQuery = this.updateQuery;
    let updateHitsPerPage = this.updateHitsPerPage;
    let result;
    // index.search(query, {
    //   hitsPerPage: hitsPerPage
    // }, function searchDone(err, content) {
    // result = content;
    // updateResults(result);
    // });
    helper.setQuery(query).setQueryParameter('hitsPerPage', hitsPerPage).search();
    updateHitsPerPage(hitsPerPage);
    updateQuery(query);


  },
  updateResults(results){
    this.setState({
      results: results
    });
    console.log(this.state.results);
  },
  updateQuery(query) {
    this.setState({
      searchQuery: query
    });
  },
  updateHitsPerPage(hits) {
    this.setState({ hitsPerPage: hits });
  },
  foodFacetRefinement(type, value){
    helper.toggleFacetRefinement(type, value).search()
  },
  addPaymentDisjunctive(type, value){
    helper.addDisjunctiveFacetRefinement('payment_options', value).search()
    console.log(`add disj ${value}`)
  },
  removePaymentDisjunctive(type, value){
    helper.removeDisjunctiveFacetRefinement('payment_options', value).search()
    console.log(`remove disj ${value}`)
  },
  addRatingFilter(value) {
    console.log(`adding filter for ${value}`);
    const lowerBound = value;
    const upperBound = value + 1;
    helper.addNumericRefinement('stars_count', '<', upperBound).addNumericRefinement('stars_count', '>=', lowerBound).search()
  },
  removeRatingFilter(value) {
    console.log(`removing filter for ${value}`);
    const lowerBound = value;
    const upperBound = value + 1;
    helper.removeNumericRefinement('stars_count', '<', upperBound).removeNumericRefinement('stars_count', '>=', lowerBound).search()
  },
  render() {
    return (
      <div className="panel">
        <Search onSearch={this.handleSearch} />
        <div className="lower-area">
          <Filters searchResults={this.state.results} foodFacet={this.foodFacetRefinement} addPayment={this.addPaymentDisjunctive} removePayment={this.removePaymentDisjunctive} addRating={this.addRatingFilter} removeRating={this.removeRatingFilter} />
          <Results searchResults={this.state.results} onShowMore={this.showMore}/>
        </div>
      </div>
    )
  }
})


export default Panel
