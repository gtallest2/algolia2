import React from 'react'

const { func } = React.PropTypes

const Search = React.createClass({
  propTypes: {
    onSearch: func,
    toggleMobile: func,
    clearSearch: func
  },

  getInitialState () {
    return {
      searchTerm: ''
    }
  },

  handleSearchTermChange (event) {
    this.props.onSearch(event.target.value)
    this.setState({ searchTerm: event.target.value })
  },

  openMobileMenu () {
    this.props.toggleMobile()
  },

  clearSearchQuery () {
    this.props.clearSearch()
    this.refs.searchInput.value = ''
    this.setState({ searchTerm: '' })
  },

  render () {
    return (
      <div className='search'>
        <div onClick={this.openMobileMenu} className='mobile-menu'><span className='filter-button'>Filter</span></div>
        <input ref='searchInput' type='text' onChange={this.handleSearchTermChange} placeholder='Search for Restaurants by Name, Cuisine, Location' />
        <div onClick={this.clearSearchQuery} className={(!this.state.searchTerm && 'invisible') + ' search-clear'}>X</div>
      </div>
    )
  }
})

export default Search
