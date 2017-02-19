import React from 'react'


export const CuisinePlaceholder = () => (
    <ul className="cuisine">
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
      <li className="placeholder-foodtype">
        <span className="placeholder-food"></span>
        <span className="placeholder-number"></span>
      </li>
    </ul>
)

export const ResultsPlaceholder = () => {
  const date = new Date();
  const currentHour = date.getHours()
  let placeholder = ''
  if(currentHour >= 6 && currentHour < 11){
    placeholder = 'What\'s for breakfast? 🍴'
  } else if (currentHour >= 11 && currentHour < 17) {
    placeholder = 'What\'s for lunch? 🍴'
  } else if (currentHour >= 17 && currentHour < 24) {
    placeholder = 'Where are you eating tonight? 🍴'
  } else {
    placeholder = 'Time for a late night snack? 🍴'
  }
  return (
    <div className="results-placeholder">
      <h4>{placeholder}</h4>
      <span>Please enter your search!</span>
    </div>
  )
}


