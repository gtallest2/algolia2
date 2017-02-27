import React from 'react'
import { helper } from './algolia'
import smoothScroll from 'smoothscroll'

import Search from './Search'
import GeoSelector from './GeoSelector'
import Filters from './Filters'
import Results from './Results'

const Panel = React.createClass({
  getInitialState () {
    return {
      searchQuery: '',
      results: {},
      hitsPerPage: 3,
      location: 'start',
      mobileMenu: false,
      searchesMade: 0
    }
  },

  componentWillMount () {
    helper.search()
    helper.on('result', (content) => {
      this.updateResults(content)
      this.determineGeoLocation()
      console.log(content)
    })
  },

  componentDidMount () {

  },

  determineGeoLocation () {
    if (this.state.location === 'start') {
      if (this.state.results.aroundLatLng) {
        const coordinates = this.state.results.aroundLatLng
        this.setState({ location: coordinates })
      } else {
        this.setState({ location: '' })
      }
    }
  },

  handleSearch (query) {
    helper.setQuery(query).search()
    this.updateQuery(query)
  },

  showMore () {
    let query = this.state.searchQuery
    let hitsPerPage = this.state.hitsPerPage + 5
    let updateQuery = this.updateQuery
    let updateHitsPerPage = this.updateHitsPerPage
    helper.setQuery(query).setQueryParameter('hitsPerPage', hitsPerPage).search()
    updateHitsPerPage(hitsPerPage)
    updateQuery(query)
  },

  updateResults (results) {
    const searchesMade = this.state.searchesMade
    this.setState({
      results: results,
      searchesMade: searchesMade + 1
    })
  },

  updateQuery (query) {
    this.setState({
      searchQuery: query
    })
  },

  updateHitsPerPage (hits) {
    this.setState({ hitsPerPage: hits })
  },

  foodFacetRefinement (type, value) {
    helper.toggleFacetRefinement(type, value).search()
  },

  addPaymentDisjunctive (type, value) {
    if (value === 'Discover') {
      helper
        .addDisjunctiveFacetRefinement('payment_options', value)
        .addDisjunctiveFacetRefinement('payment_options', 'Carte Blanche')
        .addDisjunctiveFacetRefinement('payment_options', 'Diners Club')
        .search()
    } else {
      helper.addDisjunctiveFacetRefinement('payment_options', value).search()
    }
  },

  removePaymentDisjunctive (type, value) {
    if (value === 'Discover') {
      helper
        .removeDisjunctiveFacetRefinement('payment_options', value)
        .removeDisjunctiveFacetRefinement('payment_options', 'Carte Blanche')
        .removeDisjunctiveFacetRefinement('payment_options', 'Diners Club')
        .search()
    } else {
      helper.removeDisjunctiveFacetRefinement('payment_options', value).search()
    }
  },

  addRatingFilter (value) {
    const lowerBound = value
    const upperBound = value + 1
    helper
      .addNumericRefinement('stars_count', '<', upperBound)
      .addNumericRefinement('stars_count', '>=', lowerBound)
      .search()
  },

  removeRatingFilter (value) {
    const lowerBound = value
    const upperBound = value + 1
    helper
      .removeNumericRefinement('stars_count', '<', upperBound)
      .removeNumericRefinement('stars_count', '>=', lowerBound)
      .search()
  },

  combineAddAndRemove (add, remove) {
    const lowerBoundAdd = add
    const upperBoundAdd = add + 1
    const lowerBoundRemove = remove
    const upperBoundRemove = remove + 1
    helper
      .addNumericRefinement('stars_count', '<', upperBoundAdd)
      .addNumericRefinement('stars_count', '>=', lowerBoundAdd)
      .removeNumericRefinement('stars_count', '<', upperBoundRemove)
      .removeNumericRefinement('stars_count', '>=', lowerBoundRemove)
      .search()
  },

  addPriceDisjunctive (type, value) {
    helper.addDisjunctiveFacetRefinement('price', value).search()
  },

  removePriceDisjunctive (type, value) {
    helper.removeDisjunctiveFacetRefinement('price', value).search()
  },

  setLocation (coordinates) {
    this.setState({ location: coordinates })
    helper.setQueryParameter('aroundLatLng', coordinates).search()
  },

  handleSetLocation (coordinates) {
    this.setLocation(coordinates)
  },

  toggleMobile () {
    this.setState({ mobileMenu: !this.state.mobileMenu })
  },

  previousPage () {
    if (this.state.results.page > 0) {
      const prevPage = helper.previousPage().getPage()
      prevPage >= 0 && helper.setPage(prevPage).search()
    } else {

    }
  },

  nextPage () {
    if (this.state.results.page < this.state.results.nbPages - 1) {
      const nextPage = helper.nextPage().getPage()
      helper.setPage(nextPage).search()
      if (window.innerWidth < 768) {
        smoothScroll(0)
      }
    } else {

    }
  },

  closeMobileMenu (e) {
    (this.state.mobileMenu && this.toggleMobile())
  },

  clearSearch () {
    this.setState({ searchQuery: '' })
    helper.setQuery('').search()
  },

  updateResultsPerPage (value) {
    this.updateHitsPerPage(value)
    helper.setQueryParameter('hitsPerPage', value).search()
  },

  handleFoodTypeSearch (search) {
    // helper.searchForFacetValues('food_type', search.target.value)
    //   .then(res => {
    //     console.log(res)
    //   })
  },

  render () {
    return (
      <div className='panel'>
        <Search
          onSearch={this.handleSearch}
          toggleMobile={this.toggleMobile}
          clearSearch={this.clearSearch}
        />
        {this.state.location
                ? ''
                : <GeoSelector
                  handleSetLocation={this.handleSetLocation}
                  />}
        <div className='lower-area'>
          <Filters
            toggleMobile={this.toggleMobile}
            mobileMenu={this.state.mobileMenu}
            searchResults={this.state.results}
            foodFacet={this.foodFacetRefinement}
            addPayment={this.addPaymentDisjunctive}
            removePayment={this.removePaymentDisjunctive}
            addRating={this.addRatingFilter}
            removeRating={this.removeRatingFilter}
            combineAddAndRemove={this.combineAddAndRemove}
            addPrice={this.addPriceDisjunctive}
            removePrice={this.removePriceDisjunctive}
            blurMenu={this.closeMobileMenu}
            handleFoodTypeSearch={this.handleFoodTypeSearch}
            searchHelper={helper}
          />
          <Results
            searchResults={this.state.results}
            onShowMore={this.showMore}
            userLocation={this.state.location}
            prevPage={this.previousPage}
            nextPage={this.nextPage}
            mobileMenu={this.state.mobileMenu}
            hitsPerPage={this.state.hitsPerPage}
            updateResultsPerPage={this.updateResultsPerPage}
            searchesMade={this.state.searchesMade}
            searchQuery={this.state.searchQuery}
          />
        </div>
      </div>
    )
  }
})

export default Panel
