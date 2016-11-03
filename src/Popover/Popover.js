import React from 'react'
import Theme from 'js-theme'
import AlignedPointer from '../AlignedPointer'

type PropsT = {
  children: React.Children,
  theme: Object,
}

const Popover = ({
  children,
  theme,
  ...props
}: PropsT) => (
  <AlignedPointer
    {...props}
    {...theme.popover}
    targetTriggers={['Click inside']}
    portalTriggers={['Click outside']}
  >
    {children}
  </AlignedPointer>
)

const defaultTheme = {
  popover: {},
}

export default Theme('Popover', defaultTheme)(Popover)
