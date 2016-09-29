import React from 'react'
import renderer from 'react-test-renderer'
import PortalTrigger from '.'

test('Renders without props', () => {
  const portalTrigger = renderer.create(
    <PortalTrigger />
  ).toJSON()
  expect(portalTrigger).toMatchSnapshot()
})
