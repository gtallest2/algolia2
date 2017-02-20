import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Ratings from '../Ratings'

test('Ratings snapshot test', () => {
  const component = shallow(<Ratings />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('Ratings adds class of active to correct list element', () => {
  const component = shallow(
    <Ratings currentRatingFilter={3} />
  )
  expect(component.find('.active').exists()).toEqual(true)
  expect(component.find('.three-star').hasClass('active')).toEqual(true)
})

// test('Ratings sends correct value onClick', () => {
//   const component = shallow(
//     <Ratings handleRatingFilter={value => value } />
//   )
//   component.find('.two-star').simulate('click')
//   console.log(component);
//   // expect(component.find('.one-star').simulate('click')).toEqual(1)
// })
