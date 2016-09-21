import React from 'react'
import renderer from 'react-test-renderer'
import Preview from '.'

test('Renders without props', () => {
  const preview = renderer.create(
    <Preview />
  ).toJSON()
  expect(preview).toMatchSnapshot()
})
