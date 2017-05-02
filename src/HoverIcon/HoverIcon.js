/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import Icon from '../Icon'

type PropsT = {
  name: string,
  hoverName: string,
}

export default class HoverIcon extends React.Component {
  props: PropsT

  constructor() {
    super()
    this.state = {
      isHovering: false,
    }
  }

  handleMouseEnter = () => this.setState({ isHovering: true })
  handleMouseLeave = () => this.setState({ isHovering: false })

  render() {
    const { theme, name, hoverName, ...restProps } = this.props
    const { isHovering } = this.state

    return (
      <Icon
        name={isHovering ? hoverName : name}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        theme={theme}
        {...restProps}
      />
    )
  }
}
