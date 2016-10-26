import React from 'react'
import renderer from 'react-test-renderer'
import CellMeasurer from '.'

test('Renders without props', () => {
  const cellMeasurer = renderer.create(
    <CellMeasurer />
  ).toJSON()
  expect(cellMeasurer).toMatchSnapshot()
})
