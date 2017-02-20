import React from 'react'

const { func, number } = React.PropTypes

const Ratings = React.createClass({
  propTypes: {
    currentRatingFilter: number,
    handleRatingFilter: func
  },
  handleRatingFilter (value) {
    this.props.handleRatingFilter(value)
  },
  render () {
    return (
      <div className='ratings-filter'>
        <h4>Rating</h4>
        <ul className='ratings'>
          <li onClick={this.handleRatingFilter.bind(null, 0)} className={this.props.currentRatingFilter === 0 ? 'active stars no-star' : 'stars no-star'} />
          <li onClick={this.handleRatingFilter.bind(null, 1)} className={this.props.currentRatingFilter === 1 ? 'active stars one-star' : 'stars one-star'} />
          <li onClick={this.handleRatingFilter.bind(null, 2)} className={this.props.currentRatingFilter === 2 ? 'active stars two-star' : 'stars two-star'} />
          <li onClick={this.handleRatingFilter.bind(null, 3)} className={this.props.currentRatingFilter === 3 ? 'active stars three-star' : 'stars three-star'} />
          <li onClick={this.handleRatingFilter.bind(null, 4)} className={this.props.currentRatingFilter === 4 ? 'active stars four-star' : 'stars four-star'} />
          <li onClick={this.handleRatingFilter.bind(null, 5)} className={this.props.currentRatingFilter === 5 ? 'active stars five-star' : 'stars five-star'} />
        </ul>
      </div>
    )
  }
})

export default Ratings
