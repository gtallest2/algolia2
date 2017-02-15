import React from 'react'
import { client, index, addIndex } from './algolia'

import { sortedInfo, sortedList, combinedList } from './sort-array'


import Search from './Search'
import Filters from './Filters'
import Results from './Results'

const Panel = React.createClass({
  getInitialState(){
    return {
      results: {}
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
    console.log(combinedList);
    return (
      <div className="panel">
        <Search onSearch={this.handleSearch}/>
        <div className="lower-area">
          <Filters />
          <Results searchResults={[]}/>
        </div>
      </div>
    )
  }
})


export default Panel
