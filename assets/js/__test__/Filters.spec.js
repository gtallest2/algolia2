import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Filters from '../Filters'
import FoodTypes from '../FoodTypes'
import Ratings from '../Ratings'
import PaymentOptions from '../PaymentOptions'

import exampleSearch from '../../../example-search'

test('Filters snapshot test', () => {
  const component = shallow(<Filters />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})


// test('Filters renders correct components', () => {
//   const component = shallow(
//     <Filters searchResults={exampleSearch}/>
//   )
//   console.log(component.html());
// })
