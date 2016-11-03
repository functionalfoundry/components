import React from 'react'
import Theme from 'js-theme'
import AlignedPointer from '../AlignedPointer'

type PropsT = {
  children: React.Children,
  theme: Object,
}

const Tooltip = ({
  children,
  theme,
  ...props
}: PropsT) => (
  <AlignedPointer
    {...props}
    {...theme.tooltip}
    targetTriggers={['Hover']}
    portalTriggers={['Mouse leave']}
  >
    {children}
  </AlignedPointer>
)

const defaultTheme = {
  tooltip: {},
}

export default Theme('Tooltip', defaultTheme)(Tooltip)
