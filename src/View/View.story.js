import React from 'react'
import { storiesOf } from '@kadira/storybook'
import View from './View'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('View', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Without props'
      >
        <View>
          {'View'}
        </View>
      </Preview>
      <Preview
        label='With theme'
      >
        <View
          theme={getTheme()}
        >
          {'Content text'}
        </View>
      </Preview>
      <Preview
        label='Inline'
      >
        <View
          theme={getTheme()}
          inline
        >
          {'Content text'}
        </View>
      </Preview>
      <Preview
        label='Without props'
      >
        <View>
          {'View'}
        </View>
      </Preview>
      <Preview
        label='Nested props'
      >
        <View
          theme={getTheme()}
        >
          {'1'}
        </View>
        <View
          theme={getTheme('green')}
        >
          {'2'}
        </View>
        <View>
          <View
            theme={getTheme('yellow')}
          >
            {'3'}
          </View>
          <View
            theme={getTheme('red')}
          >
            {'4'}
          </View>
        </View>
      </Preview>
      <Preview
        label='With test ID'
      >
        <View
          testId='View234'
        >
          {'View'}
        </View>
      </Preview>
    </PreviewContainer>
  ))

const getTheme = (color = 'aqua') => ({
  view: {
    backgroundColor: color,
  },
})
