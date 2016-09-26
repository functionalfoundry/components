import React from 'react'
import renderer from 'react-test-renderer'
import Trigger2 from '.'

test('Renders without props', () => {
  const trigger2 = renderer.create(
    <Trigger2 />
  ).toJSON()
  expect(trigger2).toMatchSnapshot()
})
