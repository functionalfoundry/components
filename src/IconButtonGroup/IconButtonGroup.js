/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import View from '../View'
import Icon from '../Icon'

type IconT = {
  name: string,
  hint: string,
}

type PropsT = {
  icons: Array<IconT>,
  theme: Object,
  selectedIconName: string,
  onChange: Function,
}

const defaultProps = {
  icons: [],
  theme: {},
  onChange: () => {},
}

const IconButtonGroup = ({
  icons,
  theme,
  selectedIconName,
  onChange,
}: PropsT) => (
  <View
    {...theme.iconButtonGroup}
  >
    {icons.map((icon) => (
      <Icon
        key={icon.name}
        name={icon.name}
        title={icon.hint}
        size='large'
        stroke='rgba(255, 255, 255, 0.64)'
        onClick={() => onChange(icon.name)}
        {...theme.icon}
        theme={{
          icon: {
            ...getBorder(selectedIconName === icon.name),
            boxSizing: 'border-box',
            width: 46,
            height: 46,
            margin: 4,
            padding: 4,
            ':hover': {
              stroke: '#ffffff',
            },
            // ':active': {
            //   stroke: 'rgba(255, 255, 255, 0.6)'
            // },
          }
        }}
      />
    ))}
  </View>
)

const defaultTheme = ({
  selectedIconName,
}) => ({
  iconButtonGroup: {
    marginBottom: Spacing.base + Spacing.tiny,
    flexDirection: 'row',
  },
})

const getBorder = (isSelected) => {
  if (isSelected) {
    return {
      borderWidth: 1,
      borderColor: Colors.primary,
      stroke: 'white',
    }
  }
  return {
    cursor: 'pointer',
  }
}

IconButtonGroup.defaultProps = defaultProps
const ThemedIconButtonGroup = Theme('IconButtonGroup', defaultTheme)(IconButtonGroup)
export default ThemedIconButtonGroup
