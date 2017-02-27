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
    const priceCounts = Object.keys(this.props.searchResults).length
      ? this.props.searchResults.disjunctiveFacets.length ? this.props.searchResults.disjunctiveFacets[1].data : {}
      : {}
    return (
      <div className='price-filter'>
        <h4>Price Ranges</h4>
        <ul className='price-ranges'>
          <Price onPriceRangeClick={this.handlePriceToggle} price={2} count={priceCounts[2] || '0' } isChecked={this.props.activePrices[2]} />
          <Price onPriceRangeClick={this.handlePriceToggle} price={3} count={ priceCounts[3] || '0' } isChecked={this.props.activePrices[3]} />
          <Price onPriceRangeClick={this.handlePriceToggle} price={4} count={priceCounts[4] || '0' } isChecked={this.props.activePrices[4]} />
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

  renderDollarSigns (num) {
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
        <span className='price-text'>
          <input onClick={this._onClick} type='checkbox' checked={this.props.isChecked} />
          <span className='price-symbols'>{this.renderDollarSigns(this.props.price)}</span>
        </span>
        <span className='price-count'>{this.props.count}</span>
      </li>
    )
  }
})

export default PriceRanges
