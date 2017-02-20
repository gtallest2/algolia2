import React from 'react'
import { helper } from './algolia'

import Search from './Search'
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
    // helper.search()
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
        console.log(this.state.results.aroundLatLng)
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
    console.log(`add disj ${value}`)
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
    console.log(`remove disj ${value}`)
  },

  addRatingFilter (value) {
    console.log(`adding filter for ${value}`)
    const lowerBound = value
    const upperBound = value + 1
    helper
      .addNumericRefinement('stars_count', '<', upperBound)
      .addNumericRefinement('stars_count', '>=', lowerBound)
      .search()
  },

  removeRatingFilter (value) {
    console.log(`removing filter for ${value}`)
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

  setLocation (coordinates) {
    this.setState({ location: coordinates })
    helper.setQueryParameter('aroundLatLng', coordinates).search()
  },

  handleSetLocation (coordinates) {
    this.setLocation(coordinates)
  },

  toggleMobile () {
    console.log('toggling mobile menu!')
    this.setState({ mobileMenu: !this.state.mobileMenu })
  },

  previousPage () {
    if (this.state.results.page > 0) {
      const prevPage = helper.previousPage().getPage()
      console.log(prevPage)
      prevPage >= 0 && helper.setPage(prevPage).search()
    } else {
      console.log('Page at 0')
    }
  },

  nextPage () {
    if (this.state.results.page < this.state.results.nbPages - 1) {
      const nextPage = helper.nextPage().getPage()
      console.log(nextPage)
      helper.setPage(nextPage).search()
    } else {
      console.log('Max page reached')
    }
  },

  closeMobileMenu (e) {
    // console.log('close?')
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

  render () {
    const geo = (
      <div className='geo-selector'>
        <span className='geo-header'>Please select your closest city:</span>
        <ul className='geo-list'>
          <li onClick={this.handleSetLocation.bind(null, '37.7576948,-122.4726194')} className='geo-location'>San Francisco</li>
          <li onClick={this.handleSetLocation.bind(null, '40.705565,-74.118086')} className='geo-location'>New York</li>
          <li onClick={this.handleSetLocation.bind(null, '48.8588377,2.2775176')} className='geo-location'>Paris</li>
        </ul>
      </div>
    )
    return (
      <div className='panel'>
        <Search
          onSearch={this.handleSearch}
          toggleMobile={this.toggleMobile}
          clearSearch={this.clearSearch}
        />
        <div>{this.state.location ? '' : geo}</div>
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
            blurMenu={this.closeMobileMenu}
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
