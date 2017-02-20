import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Panel from '../Panel'

test('Panel snapshot test', () => {
  const component = shallow(<Panel />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
