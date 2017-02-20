import React from 'react'

const { func, bool, string } = React.PropTypes

const PaymentOptions = React.createClass({
  propTypes: {
    mobileMenu: bool,
    handlePaymentToggle: func
  },

  handlePaymentToggle (cardType) {
    this.props.handlePaymentToggle(cardType)
  },

  render () {
    return (
      <div className='payments-filter'>
        <h4>Payment Options</h4>
        <ul className='payment-options'>
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-ae'} cardText={window.innerWidth < 768 ? 'AMEX' : 'American Express'} cardName={'AMEX'} cardClass={'amex'} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-discover'} cardText={'Discover'} cardName={'Discover'} cardClass={'discover'} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-mc'} cardText={'MasterCard'} cardName={'MasterCard'} cardClass={'mastercard'} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-visa'} cardText={'Visa'} cardName={'Visa'} cardClass={'visa'} />
        </ul>
      </div>
    )
  }
})

const PaymentOption = React.createClass({
  propTypes: {
    onPaymentOptionClick: func,
    cardName: string,
    cardIcon: string,
    cardClass: string,
    cardText: string
  },
  _onClick () {
    this.props.onPaymentOptionClick(this.props.cardName)
  },
  render () {
    return (
      <li className='payment-type'>
        <input onClick={this._onClick} type='checkbox' />
        <span className={`card ${this.props.cardIcon}`} />&nbsp;
        <span className={`${this.props.cardClass}-card-name`}>{this.props.cardText}</span>
      </li>
    )
  }
})

export default PaymentOptions
