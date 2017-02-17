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
  openMobileMenu(){
    this.props.toggleMobile();
  },
  render() {
    return (
      <div className="search">
      <div onClick={this.openMobileMenu} className="mobile-menu"><span className="menu-bars">|||</span></div>
        <input type="text" onChange={this.handleSearchTermChange} placeholder="Search for Restaurants by Name, Cuisine, Location" />
      </div>
    )
  }
})


export default Search
