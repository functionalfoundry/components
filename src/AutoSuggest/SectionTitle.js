// From https://github.com/moroshko/react-autowhatever/blob/f4f83aabbd69a9cb2271e6f4efbb32bbe1a9544d/src/SectionTitle.js

import React, { Component, PropTypes } from 'react';
import compareObjects from './compareObjects';

export default class SectionTitle extends Component {
  static propTypes = {
    section: PropTypes.any.isRequired,
    renderSectionTitle: PropTypes.func.isRequired,
    theme: PropTypes.func.isRequired,
    sectionKeyPrefix: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props);
  }

  render() {
    const { section, renderSectionTitle, theme, sectionKeyPrefix } = this.props;
    const sectionTitle = renderSectionTitle(section);

    if (!sectionTitle) {
      return null;
    }

    return (
      <div {...theme(`${sectionKeyPrefix}title`, 'sectionTitle')}>
        {sectionTitle}
      </div>
    );
  }
}
