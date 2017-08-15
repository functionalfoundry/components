import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Icon from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'
import { Colors } from '@workflo/styles'

storiesOf('Icon', module).add('Regular', () => (
  <PreviewContainer shade="dark">
    <Preview label="Regular">
      <Icon name="logo" size="huge" />
    </Preview>
    <Preview label="With fill">
      <Icon name="twitter" size="huge" fill={Colors.grey300} />
      <Icon name="duplicate" size="large" stroke={Colors.grey300} />
      <Icon name="add-example" size="large" stroke={Colors.grey300} />
      <Icon name="delete" size="large" stroke={Colors.grey300} />
      <Icon name="alignment" size="large" stroke={Colors.grey300} fill={Colors.grey300} />
      <Icon name="theme" size="large" stroke={Colors.grey300} />
      <Icon name="size" size="large" stroke={Colors.grey300} />
      <Icon name="more-horizontal" size="large" stroke={Colors.grey300} />
      <Icon name="share" size="large" stroke={Colors.primary} />
      <Icon name="column-sort-asc" />
      <Icon name="column-sort-desc" />
      <Icon name="size-small" size="large" />
      <Icon name="align-left" size="large" />
      <Icon name="github" size="large" fill="white" />
      <Icon name="grid" size="large" fill="white" />
      <Icon name="close" size="large" stroke={Colors.grey300} />
      <Icon name="caret" size="large" stroke={Colors.grey300} />
      <Icon name="star" size="large" stroke={Colors.grey300} />
      <div
        style={{
          padding: 16,
          backgroundColor: Colors.grey800,
        }}
      >
        <Icon
          name="primary-plus"
          size="base"
          theme={{
            svg: {
              width: 30,
              height: 30,
            },
          }}
        />
      </div>
      <div
        style={{
          padding: 16,
          backgroundColor: Colors.grey800,
        }}
      >
        <Icon
          name="primary-minus"
          size="base"
          theme={{
            svg: {
              width: 30,
              height: 30,
            },
          }}
        />
      </div>
    </Preview>
  </PreviewContainer>
))
