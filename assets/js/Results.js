import React from 'react'
import { index } from './algolia'

import Result from './Result'

const Results = React.createClass({
  renderResults() {
    return this.props.searchResults.hits.map((result, i) => {
          return (
            <Result key={i} {...result} />
          )
        })
  },
  millisecondsMatter(){
    return (
      <div>
      {this.props.searchResults.nbHits} results found <span> in {this.props.searchResults.processingTimeMS / 1000} seconds </span>
      </div>
    )
  },
  expandSearch(){
    index.setSettings({'hitsPerPage': 7}), function(err) {
      if (!err) {
        console.log('success');
      }
    }
  },
  render() {
    console.log('searchResults');
    console.log(this.props.searchResults);
    return (
      <div className="results">
        <h4>{this.props.searchResults.length === 0 || this.props.searchResults.nbHits === 5000 ? 'Please enter search.' : this.millisecondsMatter()}</h4>
        {this.props.searchResults.length === 0 || this.props.searchResults.nbHits === 5000 ? '' : this.renderResults()}
        <button onClick={this.expandSearch} className="show-more" value="Show More">Show More</button>
      </div>
    )
  }
})


export default Results
