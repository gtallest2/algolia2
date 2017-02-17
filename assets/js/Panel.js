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
      location: 'start',
      mobileMenu:false,
    }
  },
  componentWillMount() {
    helper.search()
    helper.on('result', (content) => {
     this.updateResults(content);
     this.geo()
    });

  },
  componentDidMount(){

  },
  geo(prevProps, prevState){
    if(this.state.location === 'start'){
      if(this.state.results.aroundLatLng){
        const coordinates = this.state.results.aroundLatLng
        console.log(this.state.results.aroundLatLng)
        this.setState({ location: coordinates })
      } else {
        this.setState({ location: '' })
      }

    }

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
    // console.log(this.state.results);
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
  setLocation(coordinates){
    this.setState({ location: coordinates })
    helper.setQueryParameter('aroundLatLng', coordinates).search()
  },
  handleSetLocation(coordinates){
    this.setLocation(coordinates)
  },
  toggleMobile(){
    console.log('toggling mobile menu!');
    this.setState({ mobileMenu: !this.state.mobileMenu })
  },
  render() {
    const geo = (
      <div className="geo-selector">
        <span className="geo-header">Please select your closest city:</span>
        <ul className="geo-list">
          <li onClick={this.handleSetLocation.bind(null,'37.7576948,-122.4726194')} className="geo-location">San Francisco</li>
          <li onClick={this.handleSetLocation.bind(null,'40.705565,-74.118086')} className="geo-location">New York</li>
          <li onClick={this.handleSetLocation.bind(null,'48.8588377,2.2775176')} className="geo-location">Paris</li>
        </ul>
      </div>
    )
    return (
      <div className="panel">
        <Search onSearch={this.handleSearch} toggleMobile={this.toggleMobile} />
        <div>{this.state.location ? '' : geo}</div>
        <div className="lower-area">
          <Filters toggleMobile={this.toggleMobile} mobileMenu={this.state.mobileMenu} searchResults={this.state.results} foodFacet={this.foodFacetRefinement} addPayment={this.addPaymentDisjunctive} removePayment={this.removePaymentDisjunctive} addRating={this.addRatingFilter} removeRating={this.removeRatingFilter} />
          <Results searchResults={this.state.results} onShowMore={this.showMore} userLocation={this.state.location} />
        </div>
      </div>
    )
  }
})


export default Panel
