import React from 'react'

const Result = React.createClass({
  componentDidMount(){

  },
  render() {
    return(
      <div className="result">
        <a href={this.props.reserve_url}><img className="result-image" src={this.props.image_url} alt="Result Image"/></a>
          <div className="result-text">
          <a href={this.props.reserve_url}><h4>{this.props.name}</h4></a>
          <span><span className="rating-number">{this.props.stars_count}</span><span className="result-rating"></span>({this.props.review_count} reviews)</span>
          <span>{this.props.food_type} | {this.props.area} | {this.props.price_range}</span>
        </div>
      </div>
    )
  }
})

export default Result
