import React from 'react'
import { client, index } from './algolia'

import Search from './Search'
import Filters from './Filters'
import Results from './Results'

const Panel = React.createClass({
  getInitialState(){
    return {
      results: []
    }
  },
  handleSearch(query){
    // console.log(query);
    let update = this.updateState;
    let result;
    index.search(query, function searchDone(err, content) {
    result = content;
    update(result);
    // updateState(result);
     // console.log(result);
     // console.log(err, content);
    });
  },
  updateState(state){
    // console.log(state);
    this.setState({ results: state });
  },
  render() {
    // console.log(sortedList);
    // console.log(sortedInfo);
    return (
      <div className="panel">
        <Search onSearch={this.handleSearch}/>
        <div className="lower-area">
          <Filters />
          <Results searchResults={this.state.results}/>
        </div>
      </div>
    )
  }
})


export default Panel
