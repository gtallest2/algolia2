import React from 'react'

function renderStars (starsAmount) {
  if (starsAmount === 5) {
    return (
      <span className='stars five-star' />
    )
  }
  if (starsAmount >= 4.5) {
    return (
      <span className='stars four-half-star' />
    )
  }
  if (starsAmount >= 4) {
    return (
      <span className='stars four-star' />
    )
  }

  if (starsAmount >= 3.5) {
    return (
      <span className='stars three-half-star' />
    )
  }
  if (starsAmount >= 3) {
    return (
      <span className='stars three-star' />
    )
  }

  if (starsAmount >= 2.5) {
    return (
      <span className='stars two-half-star' />
    )
  }
  if (starsAmount >= 2) {
    return (
      <span className='stars two-star' />
    )
  }

  if (starsAmount >= 1.5) {
    return (
      <span className='stars one-half-star' />
    )
  }

  if (starsAmount >= 1) {
    return (
      <span className='stars one-star' />
    )
  }

  if (starsAmount >= 0.5) {
    return (
      <span className='stars half-star' />
    )
  }

  if (starsAmount <= 0) {
    return (
      <span className='stars no-star' />
    )
  }
}

export default renderStars
