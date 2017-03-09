/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import {
  Spacing,
} from '@workflo/styles'
import TweenMax from 'gsap'

type SizeT = 'small' | 'base' | 'large'

type Props = {
  renderer: Function,
  onClickItem: Function,
  size: SizeT,
  flush: boolean,
  data: Array<any>,
  theme: Object,
}

class Grid extends React.Component {

  componentDidMount(callback) {
    const gridChild = this.gridContain.childNodes;

    TweenMax.set(gridChild, {
      transformOrigin: "50% 50%"
    });

    TweenMax.staggerFromTo(gridChild, 0.8, {
      scale: 0.9,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      onComplete: callback,
      ease: Power2.easeOut
    }, 0.1);
  }

  componentWillUnmount(callback) {
    const gridChild = this.gridContain.childNodes;

    TweenMax.set(gridChild, {
      transformOrigin: "50% 50%"
    });

    TweenMax.staggerTo(gridChild, 0.8, {
      scale: 0.9,
      opacity: 0,
      onComplete: callback,
      ease: Power2.easeIn
    }, 0.1);
  }

  props: Props

  render() {
    const {
      theme,
      size = 'base',
      flush = false,
      data = [],
      renderer,
      onClickItem = () => {},
      ...props,
    } = this.props
    const Item = renderer
    return (
      <div
        {...props}
        ref={c => this.gridContain = c}
        {...theme.grid}
      >
        {data.map((datum, index) => (
          <View
            {...theme.item}
            key={`data-${index}`}
            ref={index}
            onClick={() => onClickItem(datum)}
          >
            {/* Hack because className and style don't get merged */}
            <Item
              {...datum}
            />
          </View>
        ))}
        {([...Array(10).keys()]).map((placeholder, index) => (
          <View
            {...theme.item}
            key={`blank-${index}`}
          />
        ))}
      </div>
    )

  }
}

// const Grid = ({
//   theme,
//   size = 'base',
//   flush = false,
//   data = [],
//   renderer,
//   onClickItem = () => {},
//   ...props,
// }: Props) => {
//   const Item = renderer

//   return (
//     <View
//       {...props}
//       {...theme.grid}
//     >
//       {data.map((datum, index) => (
//         <View
//           {...theme.item}
//           key={index}
//           onClick={() => onClickItem(datum)}
//         >
//           {/* Hack because className and style don't get merged */}
//           <Item
//             {...datum}
//           />
//         </View>
//       ))}
//       {([...Array(10).keys()]).map((placeholder, index) => (
//         <View
//           {...theme.item}
//           key={index}
//         />
//       ))}
//     </View>
//   )
// }

const defaultTheme = ({
  size,
  flush
}: Props) => ({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: 0,
    margin: -1 * Spacing.tiny,
  },
  item: {
    flex: `1 0 ${dimensions(size)}px`,
    height: dimensions(size),
    // TODO: This margin is screwing up the last row since it has margin 0
    // Fix so that we don't have to put a margin on the renderer card itself
    // margin: Spacing.base,
    margin: Spacing.tiny,
    // overflow: 'hidden',
    ':empty': {
      height: 0,
      border: 'none',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    boxSizing: 'border-box',
  },
})

const dimensions = (size: string) => {
  switch (size) {
    case 'small':
      return 200
    case 'base':
      return 320
    case 'large':
      return 400
    default:
      return 320
  }
}

const ThemedGrid = Theme('Grid', defaultTheme)(Grid)
export default ThemedGrid
