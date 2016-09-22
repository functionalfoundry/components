import React from 'react'
import renderer from 'react-test-renderer'
import Portal from '.'

test('Renders without props', () => {
  const portal = renderer.create(
    <Portal />
  ).toJSON()
  expect(portal).toMatchSnapshot()
})
