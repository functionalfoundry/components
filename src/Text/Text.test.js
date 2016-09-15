import React from 'react'
import renderer from 'react-test-renderer'
import Text from '.'

test('Renders with text', () => {
  const text = renderer.create(
    <Text>{'Hello'}</Text>
  ).toJSON()
  expect(text).toMatchSnapshot()
})
