import React from 'react'
import renderer from 'react-test-renderer'
import Image from '.'

test('Renders without props', () => {
  const view = renderer
    .create(
      <Image
        src="https://pbs.twimg.com/profile_images/657199367556866048/EBEIl2ol.jpg"
        width={100}
        height={100}
      />
    )
    .toJSON()
  expect(view).toMatchSnapshot()
})
