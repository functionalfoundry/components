/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import {
  Borders,
  Colors,
  Corners,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  children: React.Children,
  kind: 'regular' | 'secondary' | 'hero',
  shade: 'light' | 'dark',
  disabled: boolean,
  label: string,
  ghost: boolean,
  round: boolean,
  theme: Object,
}

const defaultProps = {
  kind: 'regular',
  shade: 'dark',
  theme: {},
}

const Button = ({
  children,
  label,
  theme,
  disabled, // eslint-disable-line no-unused-vars
  kind, // eslint-disable-line no-unused-vars
  shade, // eslint-disable-line no-unused-vars
  round, // eslint-disable-line no-unused-vars
  ghost, // eslint-disable-line no-unused-vars
  ...props,
}: PropsT) => (
  <button
    {...mergeProps(theme.button, props)}
  >
    {children}
    {label}
  </button>
)

Button.defaultProps = defaultProps

const defaultTheme = ({
  kind,
  ghost,
  // round,
  shade,
}: PropsT) => ({
  button: {
    ...Fonts.base,
    ...Borders.light,
    ...Corners.round,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',
    display: 'inline-block',
    cursor: 'pointer',
    padding: `${Spacing.tiny}px ${Spacing.base}px`,
    textTransform: 'uppercase',
    ':focus': {
      outline: 'none',
    },
    ...getKindStyle(kind, shade, ghost),
    // ...getRoundStyle(round),
  },
})

const getKindStyle = (kind: string, shade: string, ghost: boolean) => {
  switch (`${shade}:${kind}${ghost ? ':ghost' : ''}`) {
    case 'dark:regular':
      return {
        color: Colors.grey200,
        backgroundColor: Colors.grey800,
        border: 0,
        ':hover': {
          backgroundColor: Colors.grey700,
          color: Colors.primary,
        },
      }
    case 'dark:regular:ghost':
      return {
        color: Colors.grey200,
        backgroundColor: 'rgba(0,0,0,0)',
        border: `1px solid ${Colors.primary}`,
        ':hover': {
          border: `1px solid ${Colors.primaryHover}`,
        },
      }
    default: {
      return {}
    }
  }
}

export default Theme('Button', defaultTheme)(Button)
