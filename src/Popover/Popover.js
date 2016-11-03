import React from 'react'
import AlignedPointer from '../AlignedPointer'

const Popover = ({
  children,
  ...props
}) => (
  <AlignedPointer
    {...props}
    targetTriggers={['Click inside']}
    portalTriggers={['Click outside']}
  >
    {children}
  </AlignedPointer>
)

export default Popover
