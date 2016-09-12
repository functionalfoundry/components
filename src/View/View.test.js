import React from 'react'
import View from '.'

test('View renders', () => {
  expect(<View />).toMatchSnapshot()
})

test('View renders theme', () => {
  expect(
    <View
      theme={{ view: {} }}
    />
  ).toMatchSnapshot()
})

test('View renders inline state', () => {
  expect(
    <View
      inline
    />
  ).toMatchSnapshot()
})
