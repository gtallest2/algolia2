import React from 'react'
import { client, index } from './algolia'
import preload from '../../resources/dataset/test_restaurants.json'
// import data from '../../resources/dataset/test_restaurant.csv'

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
    // console.log(data);
    return (
      <div className="panel">
        <Search onSearch={this.handleSearch}/>
        <div className="lower-area">
          <Filters />
          <Results searchResults={preload}/>
        </div>
      </div>
    )
  }
})


export default Panel
