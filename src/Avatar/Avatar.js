/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

import View from '../View/View'
import Text from '../Text'


type PropsT = {
  image: string,
  firstName: string,
  lastName: string,
  size: any,
  theme: Object,
  showName: Boolean,
  backgroundShade: 'Light' | 'Dark',
}

const defaultProps = {
  backgroundShade: 'Dark',
  size: 'base',
  showName: false,
}

const Avatar = ({
  backgroundShade,
  image,
  firstName,
  lastName,
  size,
  showName,
  theme,
  ...props,
}: PropsT) => (
  <View
    {...props}
    {...theme.avatar}
  >
    <View
      {...theme.aligner}
    >
      <View
        {...theme.imageContainer}
      >
        <View
          {...theme.circle}
        >
          {image &&
            <img
              {...theme.image}
              src={image}
              alt={`${firstName} ${lastName}`}
            />}
          {!image &&
            <Text
              theme={{
                text: {
                  ...getFontStyle(size),
                },
              }}
            >
              {getInitials(firstName, lastName)}
            </Text>}
        </View>
      </View>
      {showName &&
        <Text
          size={3}
          theme={{
            text: {
              ...getFontStyle(size),
              color: backgroundShade === 'Dark' ? Colors.grey200 : Colors.grey800,
              flex: '1',
              paddingLeft: Spacing.tiny,
            },
          }}
        >
          {`${firstName || ''} ${lastName || ''}`}
        </Text>}
    </View>
  </View>
)

Avatar.defaultProps = defaultProps

const getInitials = (firstName: string, lastName: string) =>
  firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()

const defaultTheme = ({
  size,
  backgroundShade,
}: PropsT) => ({
  avatar: {
  },
  aligner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    flex: `0 1 ${sizeMap[size]}px`,
  },
  circle: {
    display: 'flex',
    ...getSizeStyle(size),
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: Colors.grey600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    ...getSizeStyle(size),
  },
  initials: {
    ...getFontStyle(size),
    color: Colors.grey200,
  },
  name: {
    ...getFontStyle(size),
    color: backgroundShade === 'Dark' ? Colors.grey200 : Colors.grey800,
    flex: '1',
  },
})

const sizeMap = {
  small: 22,
  base: 50,
  large: 70,
}

const getSizeStyle = (size: string) => {
  switch (size) {
    case 'small':
      return {
        width: Spacing.base,
        height: Spacing.base,
      }
    case 'base':
      return {
        width: Spacing.base * 2,
        height: Spacing.base * 2,
      }
    case 'large':
      return {
        width: 90,
        height: 90,
      }
    default:
      return {
        width: Spacing.base * 2,
        height: Spacing.base * 2,
      }
  }
}

const getFontStyle = (size: string) => {
  switch (size) {
    case 'small':
      return {
        ...Fonts.tiny,
      }
    case 'base':
      return {
        ...Fonts.base,
      }
    case 'large':
      return {
        ...Fonts.large,
      }
    default:
      return Fonts.base
  }
}

// imageContainer: {

// },

export default Theme('Avatar', defaultTheme)(Avatar)
