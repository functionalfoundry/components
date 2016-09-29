import React, { PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import contains from 'rc-util/lib/Dom/contains';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getContainerRenderMixin from 'rc-util/lib/getContainerRenderMixin';
import Pointer from '../Pointer';
import { getAlignFromPlacement, getPopupClassNameFromAlign } from './utils';

function noop() {
}

function returnEmptyString() {
  return '';
}

const ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter',
  'onMouseLeave', 'onFocus', 'onBlur'];

const Trigger = React.createClass({
  propTypes: {
    children: PropTypes.any,
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    showAction: PropTypes.any,
    hideAction: PropTypes.any,
    getPopupClassNameFromAlign: PropTypes.any,
    onPointerVisibleChange: PropTypes.func,
    afterPointerVisibleChange: PropTypes.func,
    pointer: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]).isRequired,
    pointerStyle: PropTypes.object,
    prefixCls: PropTypes.string,
    pointerClassName: PropTypes.string,
    pointerPlacement: PropTypes.string,
    builtinPlacements: PropTypes.object,
    pointerTransitionName: PropTypes.string,
    pointerAnimation: PropTypes.any,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    zIndex: PropTypes.number,
    focusDelay: PropTypes.number,
    blurDelay: PropTypes.number,
    getPointerContainer: PropTypes.func,
    destroyPointerOnHide: PropTypes.bool,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onPointerAlign: PropTypes.func,
    pointerAlign: PropTypes.object,
    pointerVisible: PropTypes.bool,
    maskTransitionName: PropTypes.string,
    maskAnimation: PropTypes.string,
  },

  mixins: [
    getContainerRenderMixin({
      autoMount: false,

      isVisible(instance) {
        return instance.state.pointerVisible;
      },

      getContainer(instance) {
        const pointerContainer = document.createElement('div');
        const mountNode = instance.props.getPointerContainer ?
          instance.props.getPointerContainer(findDOMNode(instance)) : document.body;
        mountNode.appendChild(pointerContainer);
        return pointerContainer;
      },

      getComponent(instance) {
        const { props, state } = instance;
        const mouseProps = {};
        if (instance.isMouseEnterToShow()) {
          mouseProps.onMouseEnter = instance.onPointerMouseEnter;
        }
        if (instance.isMouseLeaveToHide()) {
          mouseProps.onMouseLeave = instance.onPointerMouseLeave;
        }
        return (
          <Pointer
            prefixCls={props.prefixCls}
            destroyPointerOnHide={props.destroyPointerOnHide}
            visible={state.pointerVisible}
            className={props.pointerClassName}
            action={props.action}
            align={instance.getPointerAlign()}
            onAlign={props.onPointerAlign}
            animation={props.pointerAnimation}
            getClassNameFromAlign={instance.getPopupClassNameFromAlign}
            {...mouseProps}
            getRootDomNode={instance.getRootDomNode}
            style={props.pointerStyle}
            mask={props.mask}
            zIndex={props.zIndex}
            transitionName={props.pointerTransitionName}
            maskAnimation={props.maskAnimation}
            maskTransitionName={props.maskTransitionName}
          >
            {typeof props.pointer === 'function' ? props.pointer() : props.pointer}
          </Pointer>
        );
      },
    }),
  ],

  getDefaultProps() {
    return {
      prefixCls: 'rc-trigger-pointer',
      getPopupClassNameFromAlign: returnEmptyString,
      onPointerVisibleChange: noop,
      afterPointerVisibleChange: noop,
      onPointerAlign: noop,
      pointerClassName: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      focusDelay: 0,
      blurDelay: 0.15,
      pointerStyle: {},
      destroyPointerOnHide: false,
      pointerAlign: {},
      defaultPointerVisible: false,
      mask: false,
      maskClosable: true,
      action: [],
      showAction: [],
      hideAction: [],
    };
  },

  getInitialState() {
    const props = this.props;
    let pointerVisible;
    if ('pointerVisible' in props) {
      pointerVisible = !!props.pointerVisible;
    } else {
      pointerVisible = !!props.defaultPointerVisible;
    }
    return {
      pointerVisible,
    };
  },

  componentWillMount() {
    ALL_HANDLERS.forEach((h) => {
      this[`fire${h}`] = (e) => {
        this.fireEvents(h, e);
      };
    });
  },

  componentDidMount() {
    this.componentDidUpdate({}, {
      pointerVisible: this.state.pointerVisible,
    });
  },

  componentWillReceiveProps({ pointerVisible }) {
    if (pointerVisible !== undefined) {
      this.setState({
        pointerVisible,
      });
    }
  },

  componentDidUpdate(_, prevState) {
    const props = this.props;
    const state = this.state;
    this.renderComponent(null, () => {
      if (prevState.pointerVisible !== state.pointerVisible) {
        props.afterPointerVisibleChange(state.pointerVisible);
      }
    });
    if (this.isClickToHide()) {
      if (state.pointerVisible) {
        if (!this.clickOutsideHandler) {
          this.clickOutsideHandler = addEventListener(document,
            'mousedown', this.onDocumentClick);
          this.touchOutsideHandler = addEventListener(document,
            'touchstart', this.onDocumentClick);
        }
        return;
      }
    }
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.touchOutsideHandler.remove();
      this.clickOutsideHandler = null;
      this.touchOutsideHandler = null;
    }
  },

  componentWillUnmount() {
    this.clearDelayTimer();
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.touchOutsideHandler.remove();
      this.clickOutsideHandler = null;
      this.touchOutsideHandler = null;
    }
  },

  onMouseEnter(e) {
    this.fireEvents('onMouseEnter', e);
    this.delaySetPointerVisible(true, this.props.mouseEnterDelay);
  },

  onMouseLeave(e) {
    this.fireEvents('onMouseLeave', e);
    this.delaySetPointerVisible(false, this.props.mouseLeaveDelay);
  },

  onPointerMouseEnter() {
    this.clearDelayTimer();
  },

  onPointerMouseLeave(e) {
    // https://github.com/react-component/trigger/pull/13
    // react bug?
    if (e.relatedTarget && !e.relatedTarget.setTimeout &&
      this._component &&
      contains(this._component.getPopupDomNode(), e.relatedTarget)) {
      return;
    }
    this.delaySetPointerVisible(false, this.props.mouseLeaveDelay);
  },

  onFocus(e) {
    this.fireEvents('onFocus', e);
    // incase focusin and focusout
    this.clearDelayTimer();
    if (this.isFocusToShow()) {
      this.focusTime = Date.now();
      this.delaySetPointerVisible(true, this.props.focusDelay);
    }
  },

  onMouseDown(e) {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  },

  onTouchStart(e) {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  },

  onBlur(e) {
    this.fireEvents('onBlur', e);
    this.clearDelayTimer();
    if (this.isBlurToHide()) {
      this.delaySetPointerVisible(false, this.props.blurDelay);
    }
  },

  onClick(event) {
    this.fireEvents('onClick', event);
    // focus will trigger click
    if (this.focusTime) {
      let preTime;
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }
      this.focusTime = 0;
    }
    this.preClickTime = 0;
    this.preTouchTime = 0;
    event.preventDefault();
    const nextVisible = !this.state.pointerVisible;
    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
      this.setPointerVisible(!this.state.pointerVisible);
    }
  },

  onDocumentClick(event) {
    if (this.props.mask && !this.props.maskClosable) {
      return;
    }
    const target = event.target;
    const root = findDOMNode(this);
    const pointerNode = this.getPopupDomNode();
    if (!contains(root, target) && !contains(pointerNode, target)) {
      this.close();
    }
  },

  getPopupDomNode() {
    // for test
    if (this._component) {
      return this._component.isMounted() ? this._component.getPopupDomNode() : null;
    }
    return null;
  },

  getRootDomNode() {
    return ReactDOM.findDOMNode(this);
  },

  getPopupClassNameFromAlign(align) {
    const className = [];
    const props = this.props;
    const { pointerPlacement, builtinPlacements, prefixCls } = props;
    if (pointerPlacement && builtinPlacements) {
      className.push(getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  },

  getPointerAlign() {
    const props = this.props;
    const { pointerPlacement, pointerAlign, builtinPlacements } = props;
    if (pointerPlacement && builtinPlacements) {
      return getAlignFromPlacement(builtinPlacements, pointerPlacement, pointerAlign);
    }
    return pointerAlign;
  },

  setPointerVisible(pointerVisible) {
    this.clearDelayTimer();
    if (this.state.pointerVisible !== pointerVisible) {
      if (!('pointerVisible' in this.props)) {
        this.setState({
          pointerVisible,
        });
      }
      this.props.onPointerVisibleChange(pointerVisible);
    }
  },

  delaySetPointerVisible(visible, delayS) {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPointerVisible(visible);
        this.clearDelayTimer();
      }, delay);
    } else {
      this.setPointerVisible(visible);
    }
  },

  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  },

  createTwoChains(event) {
    const childPros = this.props.children.props;
    const props = this.props;
    if (childPros[event] && props[event]) {
      return this[`fire${event}`];
    }
    return childPros[event] || props[event];
  },

  isClickToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  },

  isClickToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  },

  isMouseEnterToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
  },

  isMouseLeaveToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
  },

  isFocusToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
  },

  isBlurToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  },
  forcePointerAlign() {
    if (this.state.pointerVisible && this.pointerInstance && this.pointerInstance.alignInstance) {
      this.pointerInstance.alignInstance.forceAlign();
    }
  },

  fireEvents(type, e) {
    const childCallback = this.props.children.props[type];
    if (childCallback) {
      childCallback(e);
    }
    const callback = this.props[type];
    if (callback) {
      callback(e);
    }
  },

  close() {
    this.setPointerVisible(false);
  },

  render() {
    const props = this.props;
    const children = props.children;
    const child = React.Children.only(children);
    const newChildProps = {};

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMouseDown = this.onMouseDown;
      newChildProps.onTouchStart = this.onTouchStart;
    } else {
      newChildProps.onClick = this.createTwoChains('onClick');
      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseEnter = this.onMouseEnter;
    } else {
      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseLeave = this.onMouseLeave;
    } else {
      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains('onFocus');
      newChildProps.onBlur = this.createTwoChains('onBlur');
    }

    return React.cloneElement(child, newChildProps);
  },
});

export default Trigger;
