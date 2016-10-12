/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import View from '../View'
import Align from '../Align'
import Pointer from '../Pointer'
import Portal from '../Portal'

type PropsT = {
  theme: Object,
  opened: boolean,
}

const defaultProps = {
  opened: true,
  theme: {},
}

class AlignedPointer extends React.Component {
  props: PropsT

  componentDidMount() {
    // console.log('this portal: ', this._portal)
    console.log('the portal: ', this._portal)
    console.log('this portal: ', ReactDOM.findDOMNode(this._portal))
  }

  getPortal = () => this._portal

  render() {
    const {
      opened,
      theme,
      ...props,
    }: PropsT = this.props
    return (
      <View
        {...mergeProps(theme.alignedPointer, props)}
      >
        { this._portal &&
          <Align
            align={{
              points: ['tl', 'cr'],
              offset: [0, 0],
              overflow: {
                adjustX: true,
                adjustY: true,
              },
            }}
            onAlign={(param) => console.log('ON ALIGN', param)}
            target={this._portal}
          >
            <button>
              {'Target'}
            </button>
          </Align>
        }
        <Portal
          isOpened={opened}
          theme={{
            portal: {
              color: 'white',
            },
          }}
        >
          <Pointer
            pointerVertical='Center'
            pointerHorizontal='Left'
            ref={(portal) => this._portal = ReactDOM.findDOMNode(portal)}
          >
            Portal thing exists
          </Pointer>
        </Portal>
      </View>
    )
  }
}

AlignedPointer.defaultProps = defaultProps

const defaultTheme = {
  alignedPointer: {
  },
}

export default Theme('AlignedPointer', defaultTheme)(AlignedPointer)
