import React from 'react'
import onClickOutside from 'react-onclickoutside'

import FoodTypes from './FoodTypes'
import Ratings from './Ratings'
import PaymentOptions from './PaymentOptions'
import PriceRanges from './PriceRanges'

const { bool, object, func } = React.PropTypes

const Filters = onClickOutside(React.createClass({
  propTypes: {
    toggleMobile: func,
    mobileMenu: bool,
    searchResults: object,
    foodFacet: func,
    addPayment: func,
    removePayment: func,
    addRating: func,
    removeRating: func,
    blurMenu: func,
    combineAddAndRemove: func,
    addPrice: func,
    removePrice: func,
    handleFoodTypeSearch: func
  },

  getInitialState () {
    return {
      currentRatingFilter: 10,
      currentFoodType: '',
      payments: {
        AMEX: false,
        Discover: false,
        MasterCard: false,
        Visa: false
      },
      currentPriceRanges: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }
  },

  handleFoodTypeClick (facetValue) {
    this.state.currentFoodType === ''
      ? this.setState({ currentFoodType: facetValue })
      : this.setState({ currentFoodType: '' })
    this.props.foodFacet('food_type', facetValue)
  },

  handleRatingFilter (value) {
    if (this.state.currentRatingFilter === 10) {
      this.props.addRating(value)
      this.setState({ currentRatingFilter: value })
    } else {
      if (this.state.currentRatingFilter === value) {
        this.props.removeRating(value)
        this.setState({ currentRatingFilter: 10 })
      } else {
        this.props.combineAddAndRemove(value, this.state.currentRatingFilter)
        this.setState({ currentRatingFilter: value })
      }
    }
  },

  addPaymentDisjunctive (value) {
    const paymentState = Object.assign(this.state.payments, { [value]: true })
    this.setState({ payments: paymentState })
    this.props.addPayment('payment_options', value)
  },

  removePaymentDisjunctive (value) {
    const paymentState = Object.assign(this.state.payments, { [value]: false })
    this.setState({ payments: paymentState })
    this.props.removePayment('payment_options', value)
  },

  handlePaymentToggle (value) {
    this.state.payments[value] ? this.removePaymentDisjunctive(value) : this.addPaymentDisjunctive(value)
  },

  addPriceDisjunctive (value) {
    const priceState = Object.assign(this.state.currentPriceRanges, { [value]: true })
    this.setState({ currentPriceRanges: priceState })
    this.props.addPrice('price', value)
  },

  removePriceDisjunctive (value) {
    const priceState = Object.assign(this.state.currentPriceRanges, { [value]: false })
    this.setState({ currentPriceRanges: priceState })
    this.props.removePrice('price', value)
  },

  handlePriceToggle (value) {
    this.state.currentPriceRanges[value] ? this.removePriceDisjunctive(value) : this.addPriceDisjunctive(value)
  },

  closeMenu () {
    this.props.toggleMobile()
  },

  handleClickOutside () {
    this.props.blurMenu()
  },

  handleFoodTypeSearch (value) {

  },

  render () {
    return (
      <div style={this.props.mobileMenu ? { transform: 'translateX(0)' } : {}} className='filters' >
        <div className='mobile-header'>
          <div className='mobile-menu-title'>Sort by:</div>
          <div onClick={this.closeMenu} className='mobile-menu-close'>x</div>
        </div>
        <FoodTypes
          searchResults={this.props.searchResults}
          currentFoodType={this.state.currentFoodType}
          handleFoodTypeClick={this.handleFoodTypeClick}
          handleFoodTypeSearch={this.handleFoodTypeSearch}
          searchHelper={this.props.searchHelper}
         />
        <Ratings
          currentRatingFilter={this.state.currentRatingFilter}
          handleRatingFilter={this.handleRatingFilter}
        />
        <PaymentOptions
          mobileMenu={this.props.mobileMenu}
          handlePaymentToggle={this.handlePaymentToggle}
        />
        <PriceRanges
          handlePriceToggle={this.handlePriceToggle}
        />
      </div>
    )
  }
}))

export default Filters
