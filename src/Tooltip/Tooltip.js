import React from 'react'
import Theme from 'js-theme'
import AlignedPointer from '../AlignedPointer'

type PropsT = {
  children: React.Children,
  theme: Object,
}

const Tooltip = ({ children, theme, ...props }: PropsT) => (
  <AlignedPointer
    {...props}
    {...theme.tooltip}
    openTriggers={['Mouse enter']}
    closeTriggers={['Mouse leave']}
  >
    {children}
  </AlignedPointer>
)

const defaultTheme = {
  tooltip: {},
}

const ThemedTooltip = Theme('Tooltip', defaultTheme)(Tooltip)
export default ThemedTooltip
