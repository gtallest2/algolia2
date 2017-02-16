import React from 'react'

const Filters = React.createClass({
  getInitialState() {
    return {
      currentFilter:0,
      payments: {
        AMEX: false,
        Discover: false,
        MasterCard: false,
        Visa: false
      }
    }
  },
  handleFoodTypeClick(facetValue){
    this.props.foodFacet('food_type', facetValue)
    console.log(this);
  },
  renderFoodTypes(){
    const foodTypes = this.props.searchResults.getFacetValues('food_type')
    return foodTypes.map((type, i) => {
      return (
        <li key={i} onClick={this.handleFoodTypeClick.bind(null, type.name)}>
          <span className="food-type">{type.name}</span>
          <span className="food-type">{type.count}</span>
        </li>
      )
    }, this)

  },
  addPaymentDisjunctive(value) {
    const paymentState = Object.assign(this.state.payments, { [value]: true })
    this.setState({ payments: paymentState })
    this.props.addPayment('payment_options', value)
  },
  removePaymentDisjunctive(value) {
    const paymentState = Object.assign(this.state.payments, { [value]: false })
    this.setState({ payments: paymentState })
    this.props.removePayment('payment_options', value)
  },
  handlePaymentToggle(value){
    this.state.payments[value] ? this.removePaymentDisjunctive(value) : this.addPaymentDisjunctive(value)
  },
  addRatingFilter(value){
    this.props.addRating(value)
  },
  removeRatingFilter(value){
    this.props.removeRating(value)
  },
  handleRatingFilter(value){
    if(this.state.currentFilter === '') {
      this.addRatingFilter(value)
      this.setState({ currentFilter:value })
    } else {
        if(this.state.currentFilter === value) {
        this.removeRatingFilter(value)
        this.setState({ currentFilter: '' })
       } else {
        this.addRatingFilter(value)
        this.removeRatingFilter(this.state.currentFilter)
        this.setState({ currentFilter: value })
       }
    }

  },
  render() {
    return (
      <div className="filters">
        <h4>Cuisine/Food Type</h4>
        <ul className="cuisine">
          {this.props.searchResults.length === 0 ? '' : this.renderFoodTypes()}
        </ul>
        <h4>Rating</h4>
        <ul className="ratings">
          <li onClick={this.handleRatingFilter.bind(null, 0)} className="stars no-star"></li>
          <li onClick={this.handleRatingFilter.bind(null, 1)} className="stars one-star"></li>
          <li onClick={this.handleRatingFilter.bind(null, 2)} className="stars two-star"></li>
          <li onClick={this.handleRatingFilter.bind(null, 3)} className="stars three-star"></li>
          <li onClick={this.handleRatingFilter.bind(null, 4)} className="stars four-star"></li>
          <li onClick={this.handleRatingFilter.bind(null, 5)} className="stars five-star"></li>
        </ul>
        <h4>Payment Options</h4>
        <ul className="payment-options">
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'AMEX')} type="checkbox"/>
            American Express
            <span className="card cc-ae"></span>
          </li>
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'Visa')} type="checkbox"/>
            Visa
            <span className="card cc-visa"></span>
          </li>
          <li className="payment-type">
           <input onClick={this.handlePaymentToggle.bind(null, 'Discover')} type="checkbox"/>
           Discover
           <span className="card cc-discover"></span>
            <ul className="nested-payment">
              <li className="payment-type">
                <input type="checkbox"/>
                Diners Club
              </li>
              <li className="payment-type">
                <input type="checkbox"/>
                Carte Blanche
              </li>
            </ul>
          </li>
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'MasterCard')} type="checkbox"/>
            MasterCard
            <span className="card cc-mc"></span>
          </li>

        </ul>
      </div>
    )
  }
})


export default Filters
