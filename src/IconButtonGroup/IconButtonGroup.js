/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'
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

const IconButtonGroup = ({ icons, theme, selectedIconName, onChange }: PropsT) => (
  <View {...theme.iconButtonGroup}>
    {icons.map(icon => (
      <Icon
        key={icon.name}
        name={icon.name}
        title={icon.hint}
        size="base"
        stroke="rgba(255, 255, 255, 0.64)"
        onClick={() => onChange(icon.name)}
        {...theme.icon}
        theme={{
          icon: {
            ...getBorder(selectedIconName === icon.name),
            boxSizing: 'border-box',
            width: 30,
            height: 30,
            margin: 3,
            padding: 3,
            ':hover': {
              stroke: '#ffffff',
            },
            // ':active': {
            //   stroke: 'rgba(255, 255, 255, 0.6)'
            // },
          },
        }}
      />
    ))}
  </View>
)

const defaultTheme = {
  iconButtonGroup: {
    flexDirection: 'row',
  },
}

const getBorder = (isSelected: boolean) => {
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
