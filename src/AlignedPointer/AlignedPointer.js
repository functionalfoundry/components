/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import Align from '../Align'
import Pointer from '../Pointer'

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

  render() {
    const {
      opened,
      theme,
      ...props,
    }: PropsT = this.props
    return (
      <View
        {...theme.alignedPointer}
      >
        <Align
          align={{
            points: ['tr', 'br'],
            offset: [0, 10],
            overflow: {
              adjustX: true,
              adjustY: true,
            },
            useCssTransform: true,
            useCssRight: false,
            useCssBottom: false,
          }}
          portal={
            <Pointer
              pointerVertical='Top'
              pointerHorizontal='Left'
              targetVertical='Bottom'
            >
              Portal thing exists
            </Pointer>
          }
          // target={this.getNode}
        >
          <div>Some content</div>
        </Align>
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
