import React from 'react'
import renderer from 'react-test-renderer'
import Button from '.'

test('Renders without props', () => {
  const button = renderer.create(
    <Button />
  ).toJSON()
  expect(button).toMatchSnapshot()
})

test('Renders regular ghost on dark', () => {
  const button = renderer.create(
    <Button
      shade='dark'
      ghost
    />
  ).toJSON()
  expect(button).toMatchSnapshot()
})

test('Renders unknown button kinds', () => {
  const button = renderer.create(
    <Button
      kind='unknown'
    />
  ).toJSON()
  expect(button).toMatchSnapshot()
})
