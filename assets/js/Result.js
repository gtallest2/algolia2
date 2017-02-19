import React from 'react'
import haversine from 'haversine'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const Result = React.createClass({
  renderName() {
    return (
      <span>
        this.props._highlightResult.name.value
      </span>
    )
  },
  renderStarsClass() {
    const stars = parseFloat(this.props.stars_count)
    if(stars === 5) {
      return (
        <span className="stars five-star">
        </span>
      )
    }
    if(stars >= 4.5) {
      return (
        <span className="stars four-half-star">
        </span>
      )
    }
    if(stars >= 4) {
      return (
        <span className="stars four-star">
        </span>
      )
    }

    if(stars >= 3.5) {
      return (
        <span className="stars three-half-star">
        </span>
      )
    }
    if(stars >= 3) {
      return (
        <span className="stars three-star">
        </span>
      )
    }

    if(stars >= 2.5) {
      return (
        <span className="stars two-half-star">
        </span>
      )
    }
    if(stars >= 2) {
      return (
        <span className="stars two-star">
        </span>
      )
    }

    if(stars >= 1.5) {
      return (
        <span className="stars one-half-star">
        </span>
      )
    }
    if(stars >= 1) {
      return (
        <span className="stars one-star">
        </span>
      )
    }
    if(stars >= 0.5) {
      return (
        <span className="stars half-star">
        </span>
      )
    }
    if(stars <= 0) {
      return (
        <span className="stars no-star">
        </span>
      )
    }
  },
  renderDistance(userGeo, resultGeo){
    const user = userGeo.split(',')
    const userLat = parseFloat(user[0])
    const userLon = parseFloat(user[1])
    const start = {
      latitude: userLat,
      longitude: userLon
    }

    const end = {
      latitude: resultGeo.lat,
      longitude: resultGeo.lng
    }

    return (
      <span>About {parseInt(haversine(start, end))} miles away</span>
    )
  },
  renderTyDollarSign(num){
    const signs = new Array(num).fill('$').join('')
    return (
      <span>
        {signs}
      </span>
    )
  },
  renderPaymentOptions(){
    const amex = <span className="card cc-ae"></span>
    const discover = (<span className="card cc-discover"></span>)
    const masterCard = (<span className="card cc-mc"></span>)
    const visa = (<span className="card cc-visa"></span>)

    const paymentOptions = this.props.payment_options

    return (
      <span>
        {paymentOptions.includes('AMEX') && amex}
        {paymentOptions.includes('Discover') && discover}
        {paymentOptions.includes('MasterCard') && masterCard}
        {paymentOptions.includes('Visa') && visa}
      </span>
    )
  },
  render() {
    const highlightedFoodAndArea = `${this.props._highlightResult.food_type.value} | ${this.props._highlightResult.area.value} | ${this.props.price_range}`
    const highlightedFood = `${this.props._highlightResult.food_type.value} | `
    const highlightedArea = `${this.props._highlightResult.area.value} | `
    const highlightedCity = `${this.props._highlightResult.city.value} |&nbsp;`
    return(
      <div className="result">
        <div className="result-image-link">
          <a href={this.props.reserve_url}><img className="result-image" src={this.props.image_url} alt="Result Image"/></a>
        </div>
          <div className="result-text">
          <a href={this.props.reserve_url}><h4 dangerouslySetInnerHTML={{ __html: this.props._highlightResult.name.value }}></h4></a>
          <span>
            <span className="rating-number">{this.props.stars_count}</span>
            {this.renderStarsClass()}
            <span className="review-count">({this.props.reviews_count} reviews)</span>
          </span>
          <span className="result-third-line">
            <span dangerouslySetInnerHTML={{ __html: highlightedFood }} className="result-foodtype"></span>
            <span dangerouslySetInnerHTML={{ __html: highlightedArea }} className="result-area"></span>
            <span dangerouslySetInnerHTML={{ __html: highlightedCity }} className="result-city"></span>
            <span className="result-price-range">{this.props.price_range}</span>
            <span className="result-price">{this.renderTyDollarSign(this.props.price)}</span>
          </span>
          <span className="result-fourth-line">
            <span className="result-distance">{!this.props.userLocation ? '' : this.renderDistance(this.props.userLocation, this.props._geoloc)} | </span>
            <span className="result-payment-options">{this.renderPaymentOptions()}</span>
          </span>

        </div>
      </div>
    )
  }
})

export default Result
