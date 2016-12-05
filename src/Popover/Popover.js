import React from 'react'
import Theme from 'js-theme'
import AlignedPointer from '../AlignedPointer'

type PropsT = {
  children: React.Children,
  theme: Object,
  onOpen: Function,
  onClose: Function,
}

const Popover = ({
  children,
  theme,
  onOpen,
  onClose,
  ...props
}: PropsT) => (
  <AlignedPointer
    {...props}
    {...theme.popover}
    targetTriggers={['Click inside']}
    portalTriggers={['Click outside']}
    onOpen={onOpen}
    onClose={onClose}
  >
    {children}
  </AlignedPointer>
)

const defaultTheme = {
  popover: {},
}

export default Theme('Popover', defaultTheme)(Popover)
