import React from 'react'

const { func, bool, string, object } = React.PropTypes

const PaymentOptions = React.createClass({
  propTypes: {
    mobileMenu: bool,
    handlePaymentToggle: func,
    searchResults: object
  },

  handlePaymentToggle (cardType) {
    this.props.handlePaymentToggle(cardType)
  },

  render () {
    const paymentCounts = Object.keys(this.props.searchResults).length
    ? this.props.searchResults.disjunctiveFacets.length ? this.props.searchResults.disjunctiveFacets[0].data : {}
    : {}
    const discoverCounts = Math.max(paymentCounts['Discover'], paymentCounts['Carte Blanche'], paymentCounts['Diners Club']) || '0'
    return (
      <div className='payments-filter'>
        <h4>Payment Options</h4>
        <ul className='payment-options'>
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-ae'} cardText={window.innerWidth < 768 ? 'AMEX' : 'American Express'} cardName={'AMEX'} cardClass={'amex'} count={paymentCounts['AMEX'] || '0'} isChecked={this.props.activePayments.AMEX} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-discover'} cardText={'Discover'} cardName={'Discover'} cardClass={'discover'} count={discoverCounts} isChecked={this.props.activePayments.Discover} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-mc'} cardText={'MasterCard'} cardName={'MasterCard'} cardClass={'mastercard'} count={paymentCounts['MasterCard'] || '0'} isChecked={this.props.activePayments.MasterCard} />
          <PaymentOption onPaymentOptionClick={this.handlePaymentToggle} cardIcon={'cc-visa'} cardText={'Visa'} cardName={'Visa'} cardClass={'visa'} count={paymentCounts['Visa'] || '0'} isChecked={this.props.activePayments.Visa} />
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
        <span className='payment-text'>
          <input onChange={this._onClick} type='checkbox' checked={this.props.isChecked} />
          <span className={`card ${this.props.cardIcon}`} />&nbsp;
          <span className={`${this.props.cardClass}-card-name`}>{this.props.cardText}</span>
        </span>
        <span className='payment-count'>{this.props.count}</span>
      </li>
    )
  }
})

export default PaymentOptions
