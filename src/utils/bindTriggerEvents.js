/* @flow */
export type EventT =
  | 'Click inside'
  | 'Click outside'
  | 'Mouse enter'
  | 'Mouse leave'
  | 'Hit Escape'
  | 'Blur'
  | 'Focus'

const KEYCODES = {
  ESCAPE: 27,
}

/**
 * Utility for attaching trigger events to a DOM node using the familiar API
 * used elsewhere throughout the product. Analagous functionality to the Trigger component
 * but does not require wrapping the target component.
 *
 * Returns an Observable.
 */
const bindTriggerEvents = (triggerOn: Array<EventT>, node: Node) => {
  /** Helper for deciding whether to respond to a certain type of trigger */
  const shouldTrigger = (val: EventT) => triggerOn.indexOf(val) !== -1

  const subscribe = (next: Function) => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target: any = event.target
      if (!node.contains(target)) {
        next(event)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === KEYCODES.ESCAPE) {
        next(event)
      }
    }
    if (shouldTrigger('Click outside')) {
      /** Clicking out should only fire after mouse up to prevent accidental closes */
      document.addEventListener('mouseup', handleDocumentClick, true)
      /** Ignore this flow error, it is a bug */
      document.addEventListener('touchstart', handleDocumentClick, true)
    }

    if (shouldTrigger('Hit Escape')) {
      document.addEventListener('keydown', handleKeyDown, true)
    }
    if (shouldTrigger('Click inside')) {
      node.addEventListener('click', next)
    }
    if (shouldTrigger('Mouse enter')) {
      node.addEventListener('mouseenter', next)
    }
    if (shouldTrigger('Mouse leave')) {
      node.addEventListener('mouseleave', next)
    }
    /**
     * Using focusin and focusout rather that 'focous' and 'blur' because the
     * latter do not bubble, making them less suitable for React purposes, using
     * HOCs, etc.
     */
    if (shouldTrigger('Blur')) {
      node.addEventListener('focusout', next)
    }
    if (shouldTrigger('Focus')) {
      node.addEventListener('focusin', next)
    }

    /** Clean up the subscription */
    const unsubscribe = () => {
      if (shouldTrigger('Click outside')) {
        document.removeEventListener('mouseup', handleDocumentClick, true)
        /** Ignore this flow error, it is a bug */
        document.removeEventListener('touchstart', handleDocumentClick, true)
      }
      if (shouldTrigger('Hit Escape')) {
        document.removeEventListener('keydown', handleKeyDown, true)
      }
      if (shouldTrigger('Click inside')) {
        node.removeEventListener('click', next)
      }
      if (shouldTrigger('Mouse enter')) {
        node.removeEventListener('mouseenter', next)
      }
      if (shouldTrigger('Mouse leave')) {
        node.removeEventListener('mouseleave', next)
      }
      if (shouldTrigger('Blur')) {
        node.removeEventListener('focusout', next)
      }
      if (shouldTrigger('Focus')) {
        node.removeEventListener('focusin', next)
      }
    }
    return {
      unsubscribe,
    }
  }

  return { subscribe }
}

export default bindTriggerEvents
