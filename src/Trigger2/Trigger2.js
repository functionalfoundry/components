/* @flow */
import React from 'react'
import View from '../View'

type OpenEventT = 'click' | 'mousein'
type CloseEventT = 'clickin' | 'clickout' | 'mouseout' | 'escape'

type PropsT = {
  children: React.Children,
  theme: Object,
  openOn: Array<OpenEventT>,
  closeOn: Array<CloseEventT>,
}

type StateT = {
  isOpen: boolean,
}

const defaultProps = {
  theme: {},
}

class Trigger2 extends React.Component {
  props: PropsT
  state: StateT
  static defaultProps = defaultProps
  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const {
      children,
      ...props,
    } = this.props
    return (
      <View
        {...props}
      >
        {children}
      </View>
    )
  }
}

export default Trigger2
