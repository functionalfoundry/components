import React from 'react'
import Theme from 'js-theme'

import { Colors, Spacing } from '@workflo/styles'

type Props = {
  theme: Object,
  width: number,
}

const Divider = ({
  width = 1, // eslint-disable-line
  theme,
}: Props) => <div {...theme.divider} />

const defaultTheme = ({ width }) => ({
  divider: {
    height: 0,
    borderBottomStyle: 'solid',
    borderBottomColor: Colors.grey300,
    borderBottomWidth: 0.5,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
  },
})

export default Theme('Divider', defaultTheme)(Divider)
