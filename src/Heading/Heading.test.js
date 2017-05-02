import React from 'react'
import renderer from 'react-test-renderer'
import Heading from '.'

test('Renders without props', () => {
  const heading = renderer.create(<Heading size="small" />).toJSON()
  expect(heading).toMatchSnapshot()
})
