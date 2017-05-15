/** @flow */
import { PositionT, GravityT } from '../../types/AlignTypes'
import getPoints from './getPoints'
import alignDOM from '../DOMAlign'

type OptionsT = {
  gravity: GravityT,
  horizontalOffset: number,
  onRealign?: Function,
  position: PositionT,
  verticalOffset: number,
}

type TransformT = {
  /** A string representing a CSS trasnform value */
  transform: string,
}

/**
 * Utility for aligning one DOM Element to another DOM Element.
 *
 * - Note: The logic in this function doesn't currently work if the elements
 * have transforms applied to them.
 *
 * - Note: It's recommended to put this function insie of a setTimeout rather
 * than invoke it synchronously in a React component lifecylce hook.
 *
 *
 */
const getAlignment = (
  sourceElement: Element,
  targetElement: Element,
  options: OptionsT
): TransformT => {
  const { gravity, horizontalOffset, onRealign, position, verticalOffset } = options
  const align = {
    offset: [horizontalOffset, verticalOffset],
    points: getPoints(position, gravity),
    overflow: {
      adjustX: true,
      adjustY: false,
    },
    useCssTransform: true,
    useCssRight: false,
    useCssBottom: false,
    onRealign,
  }

  const { offsetStyle } = alignDOM(sourceElement, targetElement, align)
  return offsetStyle
}

export default getAlignment
