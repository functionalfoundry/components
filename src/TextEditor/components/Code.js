/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Fonts } from '@workflo/styles'

type Props = {
  /** Attributes passed in by Slate.JS for block node containers */
  attributes: Object,
  /** js-theme object */
  theme: Object,
}

/**
 * Code block rendering
 */
const Code = ({ theme, ...props }: Props) => (
  <div {...theme.container} {...props.attributes}>
    <code {...theme.code}>{props.children}</code>
  </div>
)

const defaultCodeTheme = {
  container: {},
  code: {
    ...Fonts.code,
  },
}

export default Theme('Code', defaultCodeTheme)(Code)
