import React from 'react'
import renderer from 'react-test-renderer'
import Pointer from '.'

test('Renders without props', () => {
  const pointer = renderer.create(<Pointer />).toJSON()
  expect(pointer).toMatchSnapshot()
})
