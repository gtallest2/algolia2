import React from 'react'

const { func, bool } = React.PropTypes

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
          <li className='payment-type'>
            <input onClick={this.handlePaymentToggle.bind(null, 'AMEX')} type='checkbox' />
            <span className='card cc-ae' />&nbsp;
            <span className='amex-card-name'>{this.props.mobileMenu ? 'AMEX' : 'American Express'}</span>
          </li>
          <li className='payment-type'>
            <input onClick={this.handlePaymentToggle.bind(null, 'Discover')} type='checkbox' />
            <span className='card cc-discover' />&nbsp;
            <span className='discover-card-name'>Discover</span>
          </li>
          <li className='payment-type'>
            <input onClick={this.handlePaymentToggle.bind(null, 'MasterCard')} type='checkbox' />
            <span className='card cc-mc' />&nbsp;
            <span className='mastercard-card-name'>MasterCard</span>
          </li>
          <li className='payment-type'>
            <input onClick={this.handlePaymentToggle.bind(null, 'Visa')} type='checkbox' />
            <span className='card cc-visa' />&nbsp;
            <span className='visa-card-name'>Visa</span>
          </li>
        </ul>
      </div>
    )
  }
})

export default PaymentOptions
