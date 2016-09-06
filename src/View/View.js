/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'

type PropsT = {
  children?: React.Children,
  className: string,
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
      {...mergeProps(theme.view, props)}
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
    textAlign: 'inherit',
    textDecoration: 'none',
    listStyle: 'none',
    minHeight: 0,
    minWidth: 0,
    ...getFlex(props.inline || false), // TODO: Change to default?
  },
})

export default Theme('View', defaultTheme)(View)
