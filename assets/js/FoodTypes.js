import React from 'react'

import { CuisinePlaceholder } from './placeholders'

const { func, object, string } = React.PropTypes

const FoodTypes = React.createClass({
  propTypes: {
    searchResults: object,
    currentFoodType: string,
    handleFoodTypeClick: func
  },

  renderFoodTypes () {
    if (!Object.keys(this.props.searchResults).length) { return }
    const foodTypes = this.props.searchResults.getFacetValues('food_type')
    return foodTypes.map((type, i) => {
      return (
        <FoodType key={i} onFoodTypeClick={this.handleFoodTypeClick} currentFoodType={this.props.currentFoodType} name={type.name} count={type.count} />
      )
    }, this)
  },

  handleFoodTypeClick (type) {
    this.props.handleFoodTypeClick(type)
  },

  render () {
    const foodTypes = (
      <ul className='cuisine'>
        {this.renderFoodTypes()}
      </ul>
     )
    return (
      <div className='foodtypes-filter'>
        <h4>Cuisine/Food Type</h4>
        {!Object.keys(this.props.searchResults).length /* || !this.props.searchResults.facets.length */ ? CuisinePlaceholder() : foodTypes}
      </div>
    )
  }
})

const FoodType = React.createClass({
  propTypes: {
    onFoodTypeClick: func,
    name: string,
    count: string,
    currentFoodType: string
  },
  _onClick () {
    this.props.onFoodTypeClick(this.props.name)
  },
  render () {
    return (
      <li onClick={this._onClick} className={this.props.currentFoodType === this.props.name ? 'active' : ''} >
        <span className='food-type'>{this.props.name}</span>
        <span className='food-type-amount'>{this.props.count}</span>
      </li>
    )
  }
})

export default FoodTypes
