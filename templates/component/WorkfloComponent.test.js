import React from 'react'
import renderer from 'react-test-renderer'
import {{WorkfloComponent}} from '.'

test('Renders without props', () => {
  const {{WorkfloComponentCamel}} = renderer.create(
    <{{WorkfloComponent}} />
  ).toJSON()
  expect({{WorkfloComponentCamel}}).toMatchSnapshot()
})
