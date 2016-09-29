import React from 'react'
import renderer from 'react-test-renderer'
import AlignedPointer from '.'

test('Renders without props', () => {
  const alignedPointer = renderer.create(
    <AlignedPointer />
  ).toJSON()
  expect(alignedPointer).toMatchSnapshot()
})
