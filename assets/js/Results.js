import React from 'react'

import Result from './Result'

const Results = React.createClass({
  render() {
    // console.log(this.props.searchResults);
    return (
      <div className="results">
        <h4>___ results found <span>in ____ seconds</span></h4>
        {this.props.searchResults.map(result => {
          return (
            <Result key={result.objectID} {...result} />
          )
        })}
        <button className="show-more" value="Show More">Show More</button>
      </div>
    )
  }
})


export default Results
