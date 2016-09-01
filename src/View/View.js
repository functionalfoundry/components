/* @flow */
import React from 'react'
import Theme from 'js-theme'

type PropsT = {
  children?: React.Children,
  inline?: boolean,
  testId?: string,
  theme: Object,
}

const defaultProps = {
  theme: {},
}

const View = ({
  children,
  inline,
  testId,
  theme,
  ...props,
}: PropsT) => {
  const Component = inline ? 'span' : 'div'
  return (
    <Component
      {...props}
      {...theme.view}
      data-test-id={testId}
    >
      {children}
    </Component>
  )
}

View.defaultProps = defaultProps

const getFlex = (inline: boolean) => {
  if (inline) {
    return {}
  }
  return {
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
    flexBasis: 'auto',
    flexDirection: 'column',
  }
}

const defaultTheme = (props: PropsT) => ({
  view: {
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    position: 'relative',
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecoration: 'none',
    listStyle: 'none',
    minHeight: 0,
    minWidth: 0,
    ...getFlex(props.inline),
  },
})

export default Theme('View', defaultTheme)(View)
