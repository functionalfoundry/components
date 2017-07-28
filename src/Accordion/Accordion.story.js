import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Colors, Fonts } from '@workflo/styles'

import Accordion, { Card } from './' // eslint-disable-line

/* eslint-disable max-len */
const Content = () => (
  <div>
    <p style={{ ...Fonts.code }}>
      Lorem Ipsu"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    </p>
  </div>
)

const darkCardTheme = {
  cardContainer: {
    backgroundColor: Colors.grey800,
    color: Colors.grey300,
  },
}

storiesOf('Accordion', module).add('Standadlone Cards Uncontrolled', () => (
  <div style={{ height: 400, width: 400 }}>
    <Card title="first" theme={darkCardTheme}><Content /></Card>
    <Card title="second" theme={darkCardTheme}><Content /></Card>
    <Card isInitiallyExpanded title="third" theme={darkCardTheme}><Content /></Card>
  </div>
))
