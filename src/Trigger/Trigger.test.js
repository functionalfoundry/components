import React from 'react'
import renderer from 'react-test-renderer'
import Trigger from '.'

test('Renders without props', () => {
  const trigger = renderer.create(<Trigger />).toJSON()
  expect(trigger).toMatchSnapshot()
})
