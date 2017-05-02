import React from 'react'
import renderer from 'react-test-renderer'
import TextInput from '.'

test('Renders without props', () => {
  const textInput = renderer.create(<TextInput />).toJSON()
  expect(textInput).toMatchSnapshot()
})
