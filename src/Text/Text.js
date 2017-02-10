/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Fonts,
} from '@workflo/styles'
import applyLayout from '../View/modules/applyLayout'
import applyNativeMethods from '../View/modules/applyNativeMethods'
import createDOMElement from '../View/modules/createDOMElement'

type AccessibilityRoleT = 'heading' | 'link'

type PropsT = {
  children?: React.Children,
  size: string,
  theme: Object,
  accessibilityRole: AccessibilityRoleT,
  onLayout: Function,
  onPress: Function, // TODO: Decide how to normalize onPress & onClick
  onClick: Function, // Needed for Trigger
  selectable: bool,
  singleLine: bool,
  element: string,
}

const defaultProps = {
  accessible: true,
  selectable: true,
  size: 'base',
  onPress: () => {},
  theme: {},
  element: 'span',
}

const Text = ({
  element,
  singleLine, // eslint-disable-line
  onLayout, // eslint-disable-line
  onClick,
  onPress,
  selectable, // eslint-disable-line
  theme,
  ...props
}: PropsT) => createDOMElement(element, {
  ...props,
  ...theme.text,
  onClick: onClick || onPress,
})

Text.defaultProps = defaultProps

const defaultTheme = ({
  singleLine,
  selectable,
  size,
}: PropsT) => ({
  text: {
    flex: '0 1 auto',
    color: 'inherit',
    display: 'inline',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    wordWrap: 'break-word',
    ...getFont(size),
    ...getSelectable(selectable),
    ...getLinesStyle(singleLine),
  },
})

const getFont = (size: string) => (
  Fonts[size.toLowerCase()] || { font: 'inherit' }
)

const getSelectable = (selectable: boolean) => {
  if (selectable) {
    return {}
  }
  return {
    userSelect: 'none',
  }
}

const getLinesStyle = (singleLine: bool) => {
  if (singleLine) {
    return {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  }
  return {}
}

const ThemedText = Theme('Text', defaultTheme)(applyLayout(applyNativeMethods(Text)))
export default ThemedText
