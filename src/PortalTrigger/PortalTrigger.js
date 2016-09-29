/* @flow */
import React from 'react'
import Portal, { EventT } from '../Portal'
import Trigger from '../Trigger'

type PropsT = {
  // The target component
  children: React.Children,
  portal: React.Element,
  closeOn: Array<EventT>,
  openOn: Array<EventT>,
  onClose: Function,
  onOpen: Function,
}

type StateT = {
  isOpen: boolean,
}

const defaultProps = {
  theme: {},
}

class PortalTrigger extends React.Component {
  props: PropsT
  state: StateT
  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  render() {
    const {
      children,
      closeOn,
      openOn,
      portal,
      ...props,
    } = this.props
    const {
      isOpen,
    } = this.state
    return (
      <div>
        <Trigger
          triggerOn={openOn}
          onTrigger={this.handleOpen}
        >
          {children}
        </Trigger>
        <Portal
          isOpened={isOpen}
          theme={{
            portal: {
              color: 'white',
              position: 'absolute',
              top: 0,
              right: 0,
            },
          }}
        >
          <Trigger
            triggerOn={closeOn}
            onTrigger={this.handleClose}
          >
            {portal}
          </Trigger>
        </Portal>
      </div>
    )
  }
}

export default PortalTrigger
