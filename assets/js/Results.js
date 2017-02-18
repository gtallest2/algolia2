import React from 'react'
import { index } from './algolia'

import Result from './Result'

const Results = React.createClass({

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
  renderPagination() {
    const { page, nbPages: pageTotal } = this.props.searchResults
    return (
      <div className="pagination">
        <button disabled={page <= 0} onClick={this.props.prevPage} className="prev-page">Prev</button>
        <span className="page-number">{page + 1} / {pageTotal}</span>
        <button disabled={(page >= pageTotal - 1)} onClick={this.props.nextPage} className="next-page">Next</button>
      </div>
    )
  },
  render() {
    return (
      <div className="results">
          {this.props.searchResults.length === 0 || this.props.searchResults.nbHits === 5000 ? (<h4>Where are you eating tonight? 🍴</h4>) : this.millisecondsMatter()}
        {this.props.searchResults.length === 0 || this.props.searchResults.nbHits === 5000 ? '' : this.renderResults()}
        {/*<button onClick={this.handleShowMore} className="show-more" value="Show More">
          Show More
        </button>*/}
        {(this.props.searchResults.length !== 0 && this.props.searchResults.nbHits !== 5000) && this.renderPagination()}

      </div>
    )
  }
})


export default Results
