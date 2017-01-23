/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import LazyRenderBox from './LazyRenderBox'

type PropsT = {
  onMouseEnter: Function,
  onMouseLeave: Function,
  children: React.Children,
  theme: Object,
  visible: boolean,
}

const PopupInner = ({
  children,
  theme,
  onMouseEnter,
  onMouseLeave,
  visible,
  ...props,
}: PropsT) => (
  <div
    {...mergeProps(props, theme.popupInner)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <LazyRenderBox
      {...theme.content}
      visible={visible}
    >
      {children}
    </LazyRenderBox>
  </div>
)

const defaultTheme = ({
  visible,
}: PropsT) => ({
  popupInner: {
    ...getHiddenStyle(visible),
  },
  content: {
  },
})

const getHiddenStyle = (visible: boolean) => {
  if (visible) {
    return {}
  }
  return {
    display: 'none',
  }
}

const ThemedPopupInner = Theme('PopupInner', defaultTheme)(PopupInner)
export default ThemedPopupInner
