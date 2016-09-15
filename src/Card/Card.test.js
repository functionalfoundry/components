import React from 'react'
import renderer from 'react-test-renderer'
import Card from '.'

test('Renders without props', () => {
  const card = renderer.create(
    <Card />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders children', () => {
  const card = renderer.create(
    <Card>
      <div>{'Child'}</div>
    </Card>
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders tiny size', () => {
  const card = renderer.create(
    <Card
      size='tiny'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders small size', () => {
  const card = renderer.create(
    <Card
      size='small'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders base size', () => {
  const card = renderer.create(
    <Card
      size='base'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders large size', () => {
  const card = renderer.create(
    <Card
      size='large'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders huge size', () => {
  const card = renderer.create(
    <Card
      size='huge'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders unknown size', () => {
  const card = renderer.create(
    <Card
      size='unknown'
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})

test('Renders floating', () => {
  const card = renderer.create(
    <Card
      floating
    />
  ).toJSON()
  expect(card).toMatchSnapshot()
})
