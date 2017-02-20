import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import PaymentOptions from '../PaymentOptions'

test('PaymentOptions snapshot test', () => {
  const component = shallow(<PaymentOptions />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})


test('PaymentOptions displays "AMEX" instead of "American Express" on mobile', () => {
  const component = shallow(<PaymentOptions mobileMenu={true} />)
  expect(component.find('.amex-card-name').text()).toEqual('AMEX');
})
