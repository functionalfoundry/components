/* @flow */
import React from 'react'

type MyComponentPropsT = {
  another: string,
}

export const MyComponent = ({
  another,
}: MyComponentPropsT) => (
  <div>
    {another}
  </div>
)

export const AnotherMyComponent = () => (
  <div
    className='okay'
    another='great'
  >
    {'okay'}
  </div>
)
