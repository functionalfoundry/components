import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import Card from '.'
import View from '../View'

type CardViewPropsT = {
  fontStyle: Object,
  cardProps: Object,
  label: string,
}

const CardView = ({
  fontStyle,
  cardProps,
  label,
}: CardViewPropsT) => (
  <View>
    <View
      style={{
        ...fontStyle,
      }}
    >
      {label}
    </View>
    <Card
      {...cardProps}
      style={{
        backgroundColor: 'white',
        margin: 20,
      }}
    />
  </View>
)

storiesOf('Cards', module)
  .add('Sizes', () => (
    <div
      style={{
        backgroundColor: Colors.grey1200,
        padding: Spacing.base,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <CardView
        key={'tiny'}
        fontStyle={Fonts.base}
        cardProps={{
          size: 'tiny',
        }}
        label={'tiny'}
      />
      <CardView
        key={'small'}
        fontStyle={Fonts.base}
        cardProps={{
          size: 'small',
        }}
        label={'small'}
      />
      <CardView
        key={'base'}
        fontStyle={Fonts.base}
        cardProps={{
          size: 'base',
        }}
        label={'base'}
      />
      <CardView
        key={'large'}
        fontStyle={Fonts.base}
        cardProps={{
          size: 'large',
        }}
        label={'large'}
      />
      <CardView
        key={'huge'}
        fontStyle={Fonts.base}
        cardProps={{
          size: 'huge',
        }}
        label={'huge'}
      />
    </div>
  ))
  .add('Floating', () => (
    <div
      style={{
        backgroundColor: Colors.grey1200,
        padding: Spacing.base,
        display: 'flex',
        flex: 1,
      }}
    >
      <CardView
        key={'floating'}
        fontStyle={Fonts.base}
        cardProps={{
          floating: true,
        }}
        label={'Floating'}
      />
    </div>
  ))
