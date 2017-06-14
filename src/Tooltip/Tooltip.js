import React from 'react'
import Theme from 'js-theme'
import AlignedPointer from '../AlignedPointer'

type PropsT = {
  children: React.Children,
  targetRef: any,
  theme: Object,
}

const Tooltip = ({ children, targetRef, theme, ...props }: PropsT) => (
  <AlignedPointer
    {...props}
    {...theme.tooltip}
    closeTriggers={['Mouse leave']}
    openTriggers={['Mouse enter']}
    targetRef={targetRef}
  >
    {children}
  </AlignedPointer>
)

const defaultTheme = {
  tooltip: {},
}

const ThemedTooltip = Theme('Tooltip', defaultTheme)(Tooltip)
export default ThemedTooltip
