import React from 'react'
import { shallow } from 'enzyme'
import renderStars from '../stars-helper'

test('renderStars renders the correct HTML', () => {
  const html = shallow(renderStars(5));
  expect(html.html()).toEqual('<span class="stars five-star"></span>')
})
