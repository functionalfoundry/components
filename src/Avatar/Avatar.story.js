/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Avatar from './Avatar'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Avatar', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Regular'
      >
        <Avatar
          firstName='Yaniv'
          lastName='Tal'
          image='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
        />
      </Preview>
      <Preview
        label='With name'
        style={{ width: 300 }}
      >
        <Avatar
          firstName='Yaniv'
          lastName='Tal'
          image='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
          showName
        />
      </Preview>
      <Preview
        label='Without image'
      >
        <Avatar
          firstName='Yaniv'
          lastName='Tal'
        />
      </Preview>
      <Preview
        label='Small without image'
      >
        <Avatar
          firstName='Yaniv'
          lastName='Tal'
          size='small'
        />
      </Preview>
      <Preview
        label='Small with name'
      >
        <Avatar
          firstName='Yaniv'
          lastName='Tal'
          size='small'
          showName
        />
      </Preview>
    </PreviewContainer>
  ))
