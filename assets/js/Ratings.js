import React from 'react'

const { func, number, string } = React.PropTypes

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
          <Rating onRatingClick={this.handleRatingFilter} number={0} currentRatingFilter={this.props.currentRatingFilter} starsClass={'no-star'} />
          <Rating onRatingClick={this.handleRatingFilter} number={1} currentRatingFilter={this.props.currentRatingFilter} starsClass={'one-star'} />
          <Rating onRatingClick={this.handleRatingFilter} number={2} currentRatingFilter={this.props.currentRatingFilter} starsClass={'two-star'} />
          <Rating onRatingClick={this.handleRatingFilter} number={3} currentRatingFilter={this.props.currentRatingFilter} starsClass={'three-star'} />
          <Rating onRatingClick={this.handleRatingFilter} number={4} currentRatingFilter={this.props.currentRatingFilter} starsClass={'four-star'} />
          <Rating onRatingClick={this.handleRatingFilter} number={5} currentRatingFilter={this.props.currentRatingFilter} starsClass={'five-star'} />
        </ul>
      </div>
    )
  }
})

const Rating = React.createClass({
  propTypes: {
    onRatingClick: func,
    number: number,
    currentRatingFilter: number,
    starsClass: string
  },
  _onClick () {
    this.props.onRatingClick(this.props.number)
  },
  render () {
    const className = (this.props.currentRatingFilter === this.props.number ? 'active' : '') + ' stars ' + this.props.starsClass
    return (
      <li onClick={this._onClick} className={className} />
    )
  }
})

export default Ratings
