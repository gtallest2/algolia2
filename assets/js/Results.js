import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import SmoothScroll from 'smoothscroll'

import Result from './Result'

import { ResultsPlaceholder } from './placeholders'

const { func, bool, string, number, object } = React.PropTypes

const Results = React.createClass({
  propTypes: {
    searchResults: object,
    onShowMore: func,
    userLocation: string,
    prevPage: func,
    nextPage: func,
    mobileMenu: bool,
    hitsPerPage: number,
    updateResultsPerPage: func,
    searchesMade: number,
    searchQuery: string
  },

  getInitialState () {
    return {
      resultsPerPage: this.props.hitsPerPage
    }
  },

  renderResults () {
    if (!Object.keys(this.props.searchResults).length) { return }
    return this.props.searchResults.hits.map((result, i) => {
      return (
        <Result
          key={i}
          index={i}
          pageNum={this.props.searchResults.page}
          hitsPerPage={this.props.hitsPerPage}
          userLocation={this.props.userLocation}
          mobileMenu={this.state.mobileMenu}
          {...result}
        />
      )
    })
  },

  millisecondsMatter () {
    return (
      <div className='search-stats'>
        <span className='search-stats-text'>
          <span className='results-count'>
            {this.props.searchResults.nbHits} results found
          </span>
          <span className='results-speed'>
            &nbsp; in {this.props.searchResults.processingTimeMS / 1000} seconds
          </span>
        </span>
      </div>
    )
  },

  handleShowMore () {
    this.props.onShowMore()
  },

  renderResultsRange () {
    const { hitsPerPage, nbHits: totalHits, page } = this.props.searchResults
    const lowerBound = (page * hitsPerPage) + 1
    const upperBound = ((page + 1) * hitsPerPage)

    return (
      <div className='results-range'>
        <span>Showing results {lowerBound} - {upperBound > totalHits ? totalHits : upperBound}</span>
      </div>
    )
  },

  renderPagination () {
    const { page, nbPages: pageTotal } = this.props.searchResults
    return (
      <div className='pagination'>
        <button disabled={page <= 0} onClick={this.prevPage} className='prev-page'>Prev</button>
        <span className='page-number'>Page {page + 1} / {pageTotal}</span>
        <button disabled={(page >= pageTotal - 1)} onClick={this.nextPage} className='next-page'>Next</button>
      </div>
    )
  },

  prevPage () {
    this.props.prevPage()
    SmoothScroll(this.refs.resultsCtg.base.scrollHeight, null, null, this.refs.resultsCtg.base)
  },

  nextPage () {
    this.props.nextPage()
    // this.refs.resultsCtg.base.scrollTop = 0
    SmoothScroll(0, null, null, this.refs.resultsCtg.base)
  },

  renderResultsPerPage () {
    return (
      <div className='results-per-page'>
        <span>Results per page:</span>
        <select ref='resultsPerPage' onChange={this.updateResultsPerPage} name='results-per-page' value={this.state.resultsPerPage} >
          <option value='3'>3</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </div>
    )
  },

  updateResultsPerPage (e) {
    this.setState({ resultsPerPage: e.target.value })
    this.props.updateResultsPerPage(parseInt(e.target.value))
  },

  renderResultsNavigationTop () {
    return (
      <div className='navigate-results-top'>
        {this.renderResultsRange()}
        {this.renderResultsPerPage()}
      </div>
    )
  },

  render () {
    let facetsRefinements = false
    let disjunctiveRefinements = false
    let numericRefinements = false

    if (Object.keys(this.props.searchResults).length !== 0) {
      facetsRefinements = Object.keys(this.props.searchResults._state.facetsRefinements).length
      disjunctiveRefinements = Object.keys(this.props.searchResults._state.disjunctiveFacetsRefinements).length
      numericRefinements = Object.keys(this.props.searchResults._state.numericRefinements).length
    }

    const searchIsEmpty = this.props.searchesMade < 1 || (!this.props.searchQuery && !facetsRefinements && !disjunctiveRefinements && !numericRefinements)
    /* console.log('search is empty: ' + searchIsEmpty);
    console.log('searches made: ' + this.props.searchesMade);
    console.log(Object.keys(this.props.searchResults).length, facetsRefinements, disjunctiveRefinements, numericRefinements); */
    return (
      <div className='results'>
        {searchIsEmpty ? ResultsPlaceholder() : this.millisecondsMatter()}
        <CSSTransitionGroup
          className='results-ctg'
          ref='resultsCtg'
          component='div'
          transitionName='results-ctg'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
         >
          {searchIsEmpty ? '' : this.renderResults()}
        </CSSTransitionGroup>
        {/* <button onClick={this.handleShowMore} className='show-more' value='Show More'>
          Show More
        </button> */}
        <div className='navigate-results'>
          {(!searchIsEmpty && !!this.props.searchResults.nbHits) && this.renderResultsNavigationTop()}
          {(!searchIsEmpty && !!this.props.searchResults.nbHits) && this.renderPagination()}
        </div>
      </div>
    )
  }
})

export default Results
