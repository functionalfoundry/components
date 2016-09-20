import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '.'

test('Default', () => {
  const icon = renderer.create(
    <Icon />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Tiny', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='tiny'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Small', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='small'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Medium', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='medium'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Large', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='large'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Huge', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='huge'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('Unknown size', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      size='unknown'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('With child SVG', () => {
  const icon = renderer.create(
    <Icon>
      <svg>
        <g />
      </svg>
    </Icon>
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('With fill color', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      fill='#cdcdcd'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('With stroke color', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      stroke='#cdcdcd'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})

test('With sprite already injected', () => {
  const icon = renderer.create(
    <Icon
      name='logo'
      stroke='#cdcdcd'
    />
  ).toJSON()
  expect(icon).toMatchSnapshot()
})
