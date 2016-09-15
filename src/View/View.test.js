import React from 'react'
import renderer from 'react-test-renderer'
import View from '.'

test('Renders without props', () => {
  const view = renderer.create(
    <View />
  ).toJSON()
  expect(view).toMatchSnapshot()
})

test('Renders theme', () => {
  const view = renderer.create(
    <View
      theme={{ view: {} }}
    />
  ).toJSON()
  expect(view).toMatchSnapshot()
})

test('Renders inline variant', () => {
  const view = renderer.create(
    <View
      inline
    />
  ).toJSON()
  expect(view).toMatchSnapshot()
})
