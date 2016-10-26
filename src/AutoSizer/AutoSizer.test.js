import React from 'react'
import renderer from 'react-test-renderer'
import AutoSizer from '.'

test('Renders without props', () => {
  const autoSizer = renderer.create(
    <AutoSizer />
  ).toJSON()
  expect(autoSizer).toMatchSnapshot()
})
