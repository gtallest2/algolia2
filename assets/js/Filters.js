import React from 'react'

const Filters = React.createClass({
  render() {
    return (
      <div className="filters">
        <h4>Cuisine/Food Type</h4>
        <ul className="cuisine">
          <li>
            <span className="food-type">Italian</span>
            <span className="food-type-amount">70</span>
          </li>
          <li>
            <span className="food-type">American</span>
            <span className="food-type-amount">47</span>
          </li>
          <li>
            <span className="food-type">Californian</span>
            <span className="food-type-amount">42</span>
          </li>
        </ul>
        <h4>Rating</h4>
        <ul className="ratings">
          <li className="no-star">
          </li>
          <li className="one-star">
          </li>
          <li className="two-star">
          </li>
          <li className="three-star">
          </li>
          <li className="four-star">
          </li>
          <li className="five-star">
          </li>
        </ul>
        <h4>Payment Options</h4>
        <ul className="payment-options">
          <li className="payment-type">
            <input type="checkbox"/>
            American Express
            <span className="card cc-ae"></span>
          </li>
          <li className="payment-type">
            <input type="checkbox"/>
            Visa
            <span className="card cc-visa"></span>
          </li>
          <li className="payment-type">
           <input type="checkbox"/>
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
            <input type="checkbox"/>
            MasterCard
            <span className="card cc-mc"></span>
          </li>

        </ul>
      </div>
    )
  }
})


export default Filters
