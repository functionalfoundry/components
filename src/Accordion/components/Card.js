/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'

import Icon from '../../Icon'

type ContainerPropsT = {
  children: any,
  onCollapse: Function,
  onExpand: Function,
  /** When in uncontrolled mode, indicates the initial expanded state */
  isInitiallyExpanded: boolean,
  /**
   * Setting this prop puts the Card into "controlled" mode and also controls
   * the expanded state in this mode.
   */
  isExpanded: boolean,
  title: string,
  theme: Object,
}

type ContainerStateT = {
  /** Indicates whether the Card is in controlled or uncontrolled mode */
  isControlled: boolean,
  isExpanded: boolean,
}

/**
 * Card component for rendering an expandable/collapsable portion of an Accordion.
 * Can be used in both controlled and uncontrolled modes, determined by whether the
 * isExpanded prop is specified. Can be used standalone or with an Accordion parent
 * in which case the Accordion parent will take ownership of controlling and managing
 * it's Card children.
 */
class CardContainer extends React.Component {
  props: ContainerPropsT
  state: ContainerStateT

  constructor(props: ContainerPropsT) {
    const { isExpanded, isInitiallyExpanded } = props
    super(props)
    this.state = {
      isControlled: this.getIsControlled(props),
      isExpanded: this.getIsControlled(props) ? isExpanded : isInitiallyExpanded,
    }
  }

  getIsControlled = ({ isExpanded }: any) =>
    isExpanded !== null && typeof isExpanded !== 'undefined'

  handleToggle = () => {
    if (!this.state.isControlled) {
      this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))
    }
  }

  render() {
    return (
      <ThemedCard
        {...this.props}
        isExpanded={this.state.isExpanded}
        onToggle={this.handleToggle}
      />
    )
  }
}

type PropsT = {
  children: any,
  isExpanded: boolean,
  onToggle: Function,
  title: string,
  theme: Object,
}

const Card = ({ children, isExpanded = true, onToggle, title, theme }: PropsT) => (
  <div {...theme.cardContainer}>
    <div {...theme.cardTitleContainer}>
      <div {...theme.cardExpandIcon} onClick={onToggle}>
        {isExpanded
          ? <Icon name="minus" stroke={Colors.grey300} />
          : <Icon name="add" stroke={Colors.grey300} />}
      </div>
      <div {...theme.cardTitle}>{title}</div>
    </div>
    <div {...theme.cardContent}>
      {children}
    </div>
  </div>
)

const defaultTheme = ({ isExpanded }) => ({
  cardContainer: {
    ...Fonts.small,
    borderColor: Colors.grey900,
    borderStyle: 'solid',
    borderWidth: 1,
    flexGrow: 1,
  },
  cardContent: isExpanded
    ? {
        overflow: 'scroll',
      }
    : {
        overflow: 'hidden',
        height: 0,
      },
  cardTitle: {
    paddingLeft: Spacing.tiny,
  },
  cardTitleContainer: {
    ...Fonts.small,
    display: 'flex',
    flexDirection: 'row',
  },
})

const ThemedCard = Theme('Card', defaultTheme)(Card)

export default CardContainer
