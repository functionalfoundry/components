/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 * Modernized by yaniv@workfloapp.com
 */

import utils from './modules/utils'
import getOffsetParent from './modules/getOffsetParent'
import getVisibleRectForElement from './modules/getVisibleRectForElement'
import adjustForViewport from './modules/adjustForViewport'
import getRegion from './modules/getRegion'
import getElFuturePos from './modules/getElFuturePos'

// http://yiminghe.iteye.com/blog/1124720

function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left ||
    elFuturePos.left + elRegion.width > visibleRect.right
}

function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top ||
    elFuturePos.top + elRegion.height > visibleRect.bottom
}

function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right ||
    elFuturePos.left + elRegion.width < visibleRect.left
}

function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom ||
    elFuturePos.top + elRegion.height < visibleRect.top
}

function flip(points, reg, map) {
  const ret = []
  utils.each(points, (p) => {
    ret.push(p.replace(reg, (m) => {
      return map[m]
    }))
  })
  return ret
}

function flipOffset(offset, index) {
  offset[index] = -offset[index]
  return offset
}

function convertOffset(str, offsetLen) {
  let n
  if (/%$/.test(str)) {
    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen
  } else {
    n = parseInt(str, 10)
  }
  return n || 0
}

function normalizeOffset(offset, el) {
  offset[0] = convertOffset(offset[0], el.width)
  offset[1] = convertOffset(offset[1], el.height)
}

function domAlign(el, refNode, align) {
  let points = align.points
  let offset = align.offset || [0, 0]
  let targetOffset = align.targetOffset || [0, 0]
  let overflow = align.overflow
  const target = align.target || refNode
  const source = align.source || el
  offset = [].concat(offset)
  targetOffset = [].concat(targetOffset)
  overflow = overflow || {}
  const newOverflowCfg = {}

  let fail = 0
  const visibleRect = getVisibleRectForElement(source)
  // left/top/width/height
  const elRegion = getRegion(source)
  // left/top/width/height
  const refNodeRegion = getRegion(target)
  // offset
  normalizeOffset(offset, elRegion)
  normalizeOffset(targetOffset, refNodeRegion)
  let elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset)
  let newElRegion = utils.merge(elRegion, elFuturePos)

  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
    if (overflow.adjustX) {
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        const newPoints = flip(points, /[lr]/ig, {
          l: 'r',
          r: 'l',
        })
        const newOffset = flipOffset(offset, 0)
        const newTargetOffset = flipOffset(targetOffset, 0)
        const newElFuturePos = getElFuturePos(elRegion, refNodeRegion,
          newPoints, newOffset, newTargetOffset)
        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1
          points = newPoints
          offset = newOffset
          targetOffset = newTargetOffset
        }
      }
    }

    if (overflow.adjustY) {
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        const newPoints = flip(points, /[tb]/ig, {
          t: 'b',
          b: 't',
        })
        const newOffset = flipOffset(offset, 1)
        const newTargetOffset = flipOffset(targetOffset, 1)
        const newElFuturePos = getElFuturePos(elRegion, refNodeRegion,
          newPoints, newOffset, newTargetOffset)
        if (!isCompleteFailY(newElFuturePos, elRegion, visibleRect)) {
          fail = 1
          points = newPoints
          offset = newOffset
          targetOffset = newTargetOffset
        }
      }
    }
    if (fail) {
      elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset)
      utils.mix(newElRegion, elFuturePos)
    }

    newOverflowCfg.adjustX = overflow.adjustX &&
      isFailX(elFuturePos, elRegion, visibleRect)

    newOverflowCfg.adjustY = overflow.adjustY &&
      isFailY(elFuturePos, elRegion, visibleRect)

    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = adjustForViewport(elFuturePos, elRegion,
        visibleRect, newOverflowCfg)
    }
  }

  // need judge to in case set fixed with in css on height auto element
  if (newElRegion.width !== elRegion.width) {
    utils.css(source, 'width', utils.width(source) + newElRegion.width - elRegion.width)
  }

  if (newElRegion.height !== elRegion.height) {
    utils.css(source, 'height', utils.height(source) + newElRegion.height - elRegion.height)
  }

  // https://github.com/kissyteam/kissy/issues/190
  // <div 'relative'><el absolute></div>
  utils.offset(source, {
    left: newElRegion.left,
    top: newElRegion.top,
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform,
  })

  return {
    points,
    offset,
    targetOffset,
    overflow: newOverflowCfg,
  }
}

domAlign.__getOffsetParent = getOffsetParent

domAlign.__getVisibleRectForElement = getVisibleRectForElement

export default domAlign
