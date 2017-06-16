import React from 'react'
import Theme from 'js-theme'

import { Colors, Spacing } from '@workflo/styles'

type Props = {
  theme: Object,
  width: number,
}

const Divider = ({
  width, // eslint-disable-line
  theme,
}: Props) => <div {...theme.divider} />

Divider.defaultProps = {
  width: 0.5,
}

const defaultTheme = ({ width }) => ({
  divider: {
    height: 0,
    borderBottomStyle: 'solid',
    borderBottomColor: Colors.grey200,
    borderBottomWidth: width,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
  },
})

export default Theme('Divider', defaultTheme)(Divider)
