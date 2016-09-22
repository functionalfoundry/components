import React from 'react'
import renderer from 'react-test-renderer'
import Align from '.'

test('Renders without props', () => {
  const align = renderer.create(
    <Align />
  ).toJSON()
  expect(align).toMatchSnapshot()
})
