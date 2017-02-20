import React from 'react'
import haversine from 'haversine'
import DOMPurify from 'dompurify'

import renderStars from './stars-helper'

const { number, array, object, string } = React.PropTypes

const Result = React.createClass({
  propTypes: {
    stars_count: number,
    payment_options: array,
    _highlightResult: object,
    userLocation: string,
    price_range: string,
    price: number,
    _geoloc: object,
    reserve_url: string,
    mobile_reserve_url: string,
    image_url: string,
    reviews_count: number
  },
  renderStarsClass () {
    const stars = parseFloat(this.props.stars_count)
    return renderStars(stars)
  },

  renderDistance (userGeo, resultGeo) {
    const user = userGeo.split(',')
    const userLat = parseFloat(user[0])
    const userLon = parseFloat(user[1])
    const userLocation = {
      latitude: userLat,
      longitude: userLon
    }
    const resultLocation = {
      latitude: resultGeo.lat,
      longitude: resultGeo.lng
    }

    return (
      <span>About {parseInt(haversine(userLocation, resultLocation))} miles away</span>
    )
  },

  renderTyDollarSigns (num) {
    const signs = new Array(num + 1).join('$')
    return (
      <span>
        {signs}
      </span>
    )
  },

  renderPaymentOptions () {
    const amex = <span className='card cc-ae' />
    const discover = (<span className='card cc-discover' />)
    const masterCard = (<span className='card cc-mc' />)
    const visa = (<span className='card cc-visa' />)

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

  render () {
    const highlightedFood = `${this.props._highlightResult.food_type.value} | `
    const highlightedArea = `${this.props._highlightResult.area.value} | `
    const highlightedCity = `${this.props._highlightResult.city.value} |&nbsp;`
    const reserveUrl = window.innerWidth < 768 ? this.props.mobile_reserve_url : this.props.reserve_url

    return (
      <div className='result'>
        <div className='result-image-link'>
          <a href={reserveUrl}><img className='result-image' src={this.props.image_url} alt='Result Image' /></a>
        </div>
        <div className='result-text'>
          <a href={reserveUrl}><h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.props._highlightResult.name.value) }} /></a>
          <span>
            <span className='rating-number'>{this.props.stars_count}</span>
            {this.renderStarsClass()}
            <span className='review-count'>({this.props.reviews_count} reviews)</span>
          </span>
          <span className='result-third-line'>
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedFood) }} className='result-foodtype' />
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedArea) }} className='result-area' />
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedCity) }} className='result-city' />
            <span className='result-price-range'>{this.props.price_range}</span>
            <span className='result-price'>{this.renderTyDollarSigns(this.props.price)}</span>
          </span>
          <span className='result-fourth-line'>
            <span className='result-distance'>{!this.props.userLocation ? '' : this.renderDistance(this.props.userLocation, this.props._geoloc)} | </span>
            <span className='result-payment-options'>{this.renderPaymentOptions()}</span>
          </span>

        </div>
      </div>
    )
  }
})

export default Result
