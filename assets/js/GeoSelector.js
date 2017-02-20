import React from 'react'

const { func, string } = React.PropTypes

const GeoSelector = React.createClass({
  propTypes: {
    handleSetLocation: func
  },

  componentWillEnter (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  },

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  },

  handleSetLocation (coordinates) {
    this.props.handleSetLocation(coordinates)
  },
  render () {
    return (
      <div className='geo-selector' ref={c => this.container = c}>
        <span className='geo-header'>Please select your closest city:</span>
        <ul className='geo-list'>
          <GeoLocation coord={'37.7576948,-122.4726194'} cityName={'San Francisco'} onLocationClick={this.handleSetLocation} />
          <GeoLocation coord={'40.705565,-74.118086'} cityName={'New York'} onLocationClick={this.handleSetLocation} />
          <GeoLocation coord={'48.8588377,2.2775176'} cityName={'Paris'} onLocationClick={this.handleSetLocation} />
        </ul>
      </div>
    )
  }
})

const GeoLocation = React.createClass({
  propTypes: {
    coord: string,
    cityName: string,
    onLocationClick: func
  },
  _onClick () {
    this.props.onLocationClick(this.props.coord)
  },
  render () {
    return (
      <li onClick={this._onClick} className='geo-location'>{this.props.cityName}</li>
    )
  }
})

export default GeoSelector
