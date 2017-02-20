// This component will render if the user's location
// is not obtained from aroundLatLngViaIP.
// The user can manually select a city they are
// closest to from a few options

import React from 'react'

const { func, string } = React.PropTypes

const GeoSelector = React.createClass({
  propTypes: {
    handleSetLocation: func
  },

  handleSetLocation (coordinates) {
    this.props.handleSetLocation(coordinates)
  },

  render () {
    return (
      <div className='geo-selector'>
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
