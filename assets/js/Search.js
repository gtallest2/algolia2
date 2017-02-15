import React from 'react'

const Search = React.createClass({
  getInitialState(){
    return {
      searchTerm: ''
    }
  },
  handleSearchTermChange(event){
    this.props.onSearch(event.target.value);
  },
  render() {
    return (
      <div className="search">
        <input type="text" onChange={this.handleSearchTermChange} placeholder="Search for Restaurants by Name, Cuisine, Location" />
      </div>
    )
  }
})


export default Search
