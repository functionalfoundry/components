/** @flow */
import { HorizontalT, VerticalT } from '../../types/PortalTypes'
import { PositionT, GravityT } from '../../types/AlignTypes'

const horizontalMap = {
  Left: 'l',
  Center: 'c',
  Right: 'r',
}

const verticalMap = {
  Top: 't',
  Center: 'c',
  Bottom: 'b',
}

const getOpposite = (direction: VerticalT | HorizontalT) => {
  switch (direction) {
    case 'Top':
      return 'Bottom'
    case 'Right':
      return 'Left'
    case 'Bottom':
      return 'Top'
    case 'Left':
      return 'Right'
    case 'Center':
      return 'Center'
    default:
      return null
  }
}

const getPoints = (position: PositionT, gravity: GravityT) => {
  let portalVertical: VerticalT
  let portalHorizontal: HorizontalT
  let targetVertical: VerticalT
  let targetHorizontal: HorizontalT
  const [first = 'Center', second = 'Center'] = position.split(' ')
  if (first === 'Left') {
    targetVertical = 'Center'
    targetHorizontal = 'Left'
  } else if (first === 'Right') {
    targetVertical = 'Center'
    targetHorizontal = 'Right'
  } else {
    targetVertical = first
    targetHorizontal = second
  }
  if (gravity === 'Right') {
    portalHorizontal = 'Left'
    portalVertical = targetVertical
  } else if (gravity === 'Left') {
    portalHorizontal = 'Right'
    portalVertical = targetVertical
  } else if (gravity === 'Corner') {
    portalHorizontal = getOpposite(targetHorizontal)
    portalVertical = getOpposite(targetVertical)
  } else if (gravity === 'Top') {
    portalHorizontal = targetHorizontal
    portalVertical = getOpposite(targetVertical)
  } else if (gravity === 'Bottom') {
    portalHorizontal = targetHorizontal
    portalVertical = getOpposite(targetVertical)
  } else {
    portalHorizontal = getOpposite(targetHorizontal)
    portalVertical = getOpposite(targetVertical)
  }

  const portalAlign = `${verticalMap[portalVertical]}${horizontalMap[portalHorizontal]}`
  const targetAlign = `${verticalMap[targetVertical]}${horizontalMap[targetHorizontal]}`
  return [portalAlign, targetAlign]
}

export default getPoints
