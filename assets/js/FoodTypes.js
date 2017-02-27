import React from 'react'

import { CuisinePlaceholder } from './placeholders'

const { func, object, string } = React.PropTypes

const FoodTypes = React.createClass({
  propTypes: {
    searchResults: object,
    currentFoodType: string,
    handleFoodTypeClick: func
  },

  getInitialState () {
    return {
      foodTypeQuery: '',
      foodTypeQueries: []
    }
  },

  componentWillMount () {
    // console.log("set to 1000");
    // this.props.searchHelper.setQueryParameter('maxValuesPerFacet', 1000).searchOnce()
    //   .then(res => {
    //     const foodTypeQueries = res.content.getFacetValues('food_type')
    //     this.setState({
    //       foodTypeQueries: foodTypeQueries
    //     })
    //   })
  },

  componentDidMount () {
    // this.props.searchHelper.setQueryParameter('maxValuesPerFacet', 7).searchOnce()
    // console.log("set back to 7");
  },

  renderFoodTypes () {
    if (!Object.keys(this.props.searchResults).length) { return }
    let foodTypes;
    if(this.state.foodTypeQueries.length && !this.props.currentFoodType) {
      foodTypes = this.state.foodTypeQueries.slice(0, 7)
      console.log(foodTypes)
    } else {
      foodTypes = this.props.searchResults.getFacetValues('food_type')
    }

      return foodTypes.map((type, i) => {
        return (
          <FoodType key={i} onFoodTypeClick={this.handleFoodTypeClick} currentFoodType={this.props.currentFoodType} name={type.value || type.name} count={type.count} highlighted={type.highlighted} />
        )
      }, this)
    // const foodTypes = this.props.searchResults.getFacetValues('food_type').filter(value => value.name.toLowerCase().includes(this.state.foodTypeQuery))
    // console.log(foodTypes)
    // return foodTypes.map((type, i) => {
    //   console.log(i)
    //   return (
    //     <FoodType key={i} onFoodTypeClick={this.handleFoodTypeClick} currentFoodType={this.props.currentFoodType} name={type.name} count={type.count} />
    //   )
    // }, this)
  },

  foodTypeSearchHelper (res) {

  },

  handleFoodTypeClick (type) {
    this.props.handleFoodTypeClick(type)
    if (Object.keys(this.props.searchResults._state.facetsRefinements).length) {
      this.refs.foodTypeSearch.value = ''
      const event = new Event('change')
      this.refs.foodTypeSearch.dispatchEvent(event)
      this.setState({
        foodTypeQuery: '',
        foodTypeQueries: []
      })
    } else {
      this.refs.foodTypeSearch.value = type
      this.setState({
        foodTypeQuery: type
      })
    }
  },

  handleFoodTypeSearch (search) {
    // this.props.handleFoodTypeSearch(search)
    this.props.searchHelper.searchForFacetValues('food_type', search.target.value)
      .then(res => {
        console.log(res.facetHits)
        this.setState({
          foodTypeQueries: res.facetHits
        })
      })
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
        <input className="foodtype-search" ref="foodTypeSearch" type="text" placeholder="Search for Food Type" onChange={this.handleFoodTypeSearch} />
        {!Object.keys(this.props.searchResults).length ? CuisinePlaceholder() : foodTypes}
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
        <span className='food-type' dangerouslySetInnerHTML={{ __html: this.props.highlighted || this.props.name }} />
        <span className='food-type-amount'>{this.props.count}</span>
      </li>
    )
  }
})

export default FoodTypes
