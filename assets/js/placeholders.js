import React from 'react'

export const CuisinePlaceholder = () => (
  <ul className='cuisine'>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
    <li className='placeholder-foodtype'>
      <span className='placeholder-food' />
      <span className='placeholder-number' />
    </li>
  </ul>
)

export const ResultsPlaceholder = () => {
  const date = new Date()
  const currentHour = date.getHours()
  let placeholder = ''
  let emoji = ''
  if (currentHour >= 6 && currentHour < 11) {
    placeholder = 'What\'s for breakfast? 🍴'
    emoji = '🍩'
  } else if (currentHour >= 11 && currentHour < 17) {
    placeholder = 'What\'s for lunch? 🍴'
    emoji = '🍔'
  } else if (currentHour >= 17 && currentHour < 24) {
    placeholder = 'Where are you eating tonight? 🍴'
    emoji = '🍱'
  } else {
    placeholder = 'Time for a late night snack? 🍴'
    emoji = '🍟'
  }
  return (
    <div className='results-placeholder'>
      <h4>{placeholder}</h4>
      <span>Please enter your search!</span>
      <div className='emoji'>{emoji}</div>
    </div>
  )
}
