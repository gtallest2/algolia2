import React from 'react'
import { index } from './algolia'

import Result from './Result'

const Results = React.createClass({
  getInitialState(){
    return {
      resultsPerPage: this.props.hitsPerPage
    }
  },
  renderResults() {
    return this.props.searchResults.hits.map((result, i) => {
          return (
            <Result key={i} {...result} userLocation={this.props.userLocation} />
          )
        })
  },
  millisecondsMatter(){
    return (
      <div className="search-stats">
          <span className="search-stats-text">
            <span className="results-count">
              {this.props.searchResults.nbHits} results found
              </span>
              <span className="results-speed">
                &nbsp; in {this.props.searchResults.processingTimeMS / 1000} seconds
              </span>
          </span>
      </div>
    )
  },
  handleShowMore() {
    this.props.onShowMore();
  },
  renderResultsRange(){
    const { hitsPerPage, nbHits: totalHits, nbPages: totalPages, page } = this.props.searchResults
    const lowerBound = (page * hitsPerPage) + 1
    const upperBound = ((page + 1) * hitsPerPage)

    return (
      <div className="results-range">
        <span>Showing results {lowerBound} - {upperBound > totalHits ? totalHits : upperBound}</span>
      </div>
    )
  },
  renderPagination() {
    const { page, nbPages: pageTotal } = this.props.searchResults
    return (
      <div className="pagination">
        <button disabled={page <= 0} onClick={this.props.prevPage} className="prev-page">Prev</button>
        <span className="page-number">Page {page + 1} / {pageTotal}</span>
        <button disabled={(page >= pageTotal - 1)} onClick={this.props.nextPage} className="next-page">Next</button>
      </div>
    )
  },
  renderResultsPerPage() {
    return (
      <div className="results-per-page">
        <span>Results per page:</span>
        <select ref="resultsPerPage" onChange={this.updateResultsPerPage} name="results-per-page" value={this.state.resultsPerPage} >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
    </div>
    )
  },
  updateResultsPerPage(e){
    this.setState({ resultsPerPage: e.target.value })
    this.props.updateResultsPerPage(parseInt(e.target.value))
  },
  render() {
    const searchIsEmpty = this.props.searchResults.length === 0 || this.props.searchResults.nbHits === 5000
    return (
      <div className="results">
          {searchIsEmpty ? (<h4>Where are you eating tonight? 🍴</h4>) : this.millisecondsMatter()}
        {searchIsEmpty ? '' : this.renderResults()}
        {/*<button onClick={this.handleShowMore} className="show-more" value="Show More">
          Show More
        </button>*/}
        <div className="navigate-results">
        {(!searchIsEmpty) && this.renderResultsRange()}
        {(!searchIsEmpty) && this.renderPagination()}
        {(!searchIsEmpty) && this.renderResultsPerPage()}
        </div>
      </div>
    )
  }
})


export default Results
