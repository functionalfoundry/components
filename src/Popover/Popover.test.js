import React from 'react'
import renderer from 'react-test-renderer'
import Popover from '.'

test('Renders without props', () => {
  const popover = renderer.create(<Popover />).toJSON()
  expect(popover).toMatchSnapshot()
})
