import getAlignOffset from './getAlignOffset'

const getElFuturePos = (elRegion, refNodeRegion, points, offset, targetOffset) => {
  const xy = {
    left: elRegion.left,
    top: elRegion.top,
  }

  const p1 = getAlignOffset(refNodeRegion, points[1])
  const p2 = getAlignOffset(elRegion, points[0])

  const diff = [p2.left - p1.left, p2.top - p1.top]

  return {
    left: xy.left - diff[0] + offset[0] - targetOffset[0], // eslint-disable-line no-mixed-operators
    top: xy.top - diff[1] + offset[1] - targetOffset[1], // eslint-disable-line no-mixed-operators
  }
}

export default getElFuturePos
