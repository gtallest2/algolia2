import React from 'react'

const { func, number } = React.PropTypes

const PriceRanges = React.createClass({
  propTypes: {
    handlePriceToggle: func
  },

  handlePriceToggle (range) {
    this.props.handlePriceToggle(range)
  },

  render () {
    return (
      <div className='price-filter'>
        <h4>Price Ranges</h4>
        <ul className='price-ranges'>
          <Price onPriceRangeClick={this.handlePriceToggle} price={2} />
          <Price onPriceRangeClick={this.handlePriceToggle} price={3} />
          <Price onPriceRangeClick={this.handlePriceToggle} price={4} />
        </ul>
      </div>
    )
  }
})

const Price = React.createClass({
  propTypes: {
    onPriceRangeClick: func,
    price: number
  },

  _onClick () {
    this.props.onPriceRangeClick(this.props.price)
  },

  renderTyDollarSigns (num) {
    const signs = new Array(num + 1).join('$')
    return (
      <span>
        {signs}
      </span>
    )
  },

  render () {
    return (
      <li className='price'>
        <input onClick={this._onClick} type='checkbox' />
        <span className='price-symbols'>{this.renderTyDollarSigns(this.props.price)}</span>
      </li>
    )
  }
})

export default PriceRanges
