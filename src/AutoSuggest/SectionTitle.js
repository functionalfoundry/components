// From https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/SectionTitle.js

import React, { Component, PropTypes } from 'react'
import Theme from 'js-theme'
import { Fonts } from '@workflo/styles'
import compareObjects from '../utils/compareObjects'

class SectionTitle extends Component {
  static propTypes = {
    section: PropTypes.any.isRequired,
    renderSectionTitle: PropTypes.func.isRequired,
    theme: PropTypes.func.isRequired,
    sectionKeyPrefix: PropTypes.string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props)
  }

  render() {
    const { section, renderSectionTitle, theme } = this.props
    const sectionTitle = renderSectionTitle(section)

    if (!sectionTitle) {
      return null
    }

    return (
      <div {...theme.sectionTitle}>
        {sectionTitle}
      </div>
    )
  }
}

const defaultTheme = {
  sectionTitle: {
    ...Fonts.base,
  },
}

const ThemedSectionTitle = Theme('SectionTitle', defaultTheme)(SectionTitle)
export default ThemedSectionTitle
