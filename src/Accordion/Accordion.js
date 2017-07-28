/** @flow */
import React from 'react'
import Theme from 'js-theme'

type PropsT = {
  children: any,
  theme: Object,
}

// TODO: Implement Accordion component which manages the expanded state of Card children
const Accordion = ({ children, theme }: PropsT) => (
  <div {...theme.accordionContainer}>{children}</div>
)

const defaultTheme = {}

export default Theme('Accordion', defaultTheme)(Accordion)
