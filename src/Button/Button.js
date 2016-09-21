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
import Icon from '../Icon'

// TODO: Figure out vertical alignment problem 😡
// TODO: Figure out horizontal padding problem

type PropsT = {
  children: React.Children,
  kind: 'regular' | 'secondary' | 'hero',
  shade: 'light' | 'dark',
  disabled: boolean,
  icon?: string,
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
  icon,
  theme,
  disabled, // eslint-disable-line no-unused-vars
  kind, // eslint-disable-line no-unused-vars
  shade, // eslint-disable-line no-unused-vars
  round, // eslint-disable-line no-unused-vars
  ghost, // eslint-disable-line no-unused-vars
  ...props,
}: PropsT) => (
  <div
    {...mergeProps(theme.button, props)}
  >
    {children}
    {label}
    {icon &&
      <Icon
        name={icon}
        size='small'
        theme={iconTheme}
      />}
  </div>
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
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    height: '40px', // HACK. Could not get text vertically centered
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    border: 0,
    padding: `${Spacing.tiny}px ${Spacing.base}px`,
    transition: 'background .2s',
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
        border: `1px solid ${Colors.grey700}`,
        ':hover': {
          border: `1px solid ${Colors.primary}`,
          color: Colors.primary,
        },
      }
    case 'dark:secondary':
      return {
        color: Colors.primary,
        backgroundColor: Colors.grey900,
        ':hover': {
          backgroundColor: Colors.grey800,
          color: 'white',
        },
      }
    case 'dark:secondary:ghost':
      return {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        border: '1px solid rgba(0,0,0,0)',
        ':hover': {
          border: `1px solid ${Colors.primary}`,
        },
      }
    case 'dark:hero':
      return {
        color: Colors.grey900,
        backgroundColor: Colors.primary,
        ':hover': {
          backgroundColor: Colors.primary600,
        },
      }
    case 'dark:hero:ghost':
      return {
        color: Colors.grey200,
        backgroundColor: 'rgba(0,0,0,0)',
        border: `1px solid ${Colors.primary}`,
        ':hover': {
          border: `1px solid ${Colors.primary700}`,
        },
      }
    default: {
      return {}
    }
  }
}

const iconTheme = {
  icon: {
    marginLeft: Spacing.tiny + 2, // tiny + micro
    display: 'flex',
    flex: '1 1',
    marginRight: -1 * Spacing.tiny, // Hack?
    marginTop: -4.2, // Hack!
  },
}

export default Theme('Button', defaultTheme)(Button)
