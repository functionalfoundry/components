/* @flow */
import React from 'react'
import Theme from 'js-theme'
import View from '../View'
import sprite from './sprite'

type SizeT = 'tiny' | 'small' | 'medium' | 'large' | 'huge'

type PropsT = {
  children: React.Children,
  fill: string,
  name: string,
  size: SizeT,
  stroke: string,
  theme: Object,
}

class Icon extends React.Component {
  static defaultProps = {
    size: 'small',
    theme: defaultTheme,
  }

  componentWillMount() {
    if (document && !document.getElementById('sprite')) {
      inject(sprite)
    }
  }

  props: PropsT

  render() {
    const {
      name,
      children,
      fill,
      stroke,
      size,
      theme,
      ...props,
    } = this.props

    return (
      <View
        {...theme.icon}
        {...props}
        inline
      >
        {
          isInline(children)
          ? <svg {...theme.svg}>{children}</svg>
          : <svg {...theme.svg}><use xlinkHref={`#${name}`} /></svg>
        }
      </View>
    )
  }
}

const isInline = (children: React.Children) =>
  children && (children.type === 'svg')

const inject = (content: string) => {
  let svg = document.getElementById('sprite')
  // TODO: Right now this is injecting on every load!
  // Figure out how to test preloading the SVG for code coverage
  // if (!svg) {
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('style', 'display:none;')
  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
  svg.id = 'sprite'
  document.body.appendChild(svg)

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `<svg>${content}</svg>`
  Array.prototype.slice
    .call(wrapper.childNodes[0].childNodes)
    .forEach((el: HTMLElement) => document.getElementById('sprite').appendChild(el))
  // }
}

// const capitalize = (str: string) => str.charAt(1).toUpperCase() + str.slice(1)

const defaultTheme = ({
  fill,
  stroke,
  size,
}: PropsT) => ({
  icon: {
    ...getFillStyle(fill),
    ...getStrokeStyle(stroke),
    lineHeight: 0,
  },
  svg: {
    ...getSizeStyle(size),
  },
})

const getFillStyle = (fill: string) => (fill ? { fill } : {})
const getStrokeStyle = (stroke: string) => (stroke ? { stroke } : {})

const getSizeStyle = (size: SizeT) => {
  switch (size) {
    case 'tiny':
      return {
        width: 12,
        height: 12,
      }
    case 'small':
      return {
        width: 16,
        height: 16,
      }
    case 'large':
      return {
        width: 36,
        height: 36,
      }
    case 'huge':
      return {
        width: 48,
        height: 48,
      }
    case 'medium':
    default:
      return {
        width: 24,
        height: 24,
      }
  }
}

export default Theme('Icon', defaultTheme)(Icon)
