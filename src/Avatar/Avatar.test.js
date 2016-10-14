import React from 'react'
import renderer from 'react-test-renderer'
import Avatar from '.'

test('Renders without props', () => {
  const avatar = renderer.create(
    <Avatar />
  ).toJSON()
  expect(avatar).toMatchSnapshot()
})
