import React from 'react'

const Result = React.createClass({
  componentDidMount(){

  },
  render() {
    return(
      <div className="result">
        <img className="result-image" src={this.props.image_url} alt="Result Image"/>
          <div className="result-text">
          <h4>{this.props.name}</h4>
          <span><span className="rating-number">4.1</span><span className="result-rating"></span>(____ reviews)</span>
          <span>Food Type | Location | Price Range</span>
        </div>
      </div>
    )
  }
})

export default Result
