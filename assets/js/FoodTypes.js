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
        <li key={i} onClick={this.handleFoodTypeClick.bind(null, type.name)} className={this.props.currentFoodType === type.name ? 'active' : ''} >
          <span className='food-type'>{type.name}</span>
          <span className='food-type-amount'>{type.count}</span>
        </li>
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

export default FoodTypes
