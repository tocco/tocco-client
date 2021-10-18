import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import measureSize from './measureSize'

/**
 * resizingElementSelector: (resizingElement) => HtmlElement
 *    selector to retrieve the current HtmlElement for taking size measurements
 *
 * resizeCallback: (resizingElement, size) => void
 *    gets called on every mouse move with the new size ({height, width})
 *
 * resizeFinishedCallback: (resizingElement) => void
 *    gets called when user has finished moving the element (on mouseUp)
 */
export default (resizingElementSelector, resizeCallback, resizeFinishedCallback) => {
  const [resizingElement, setResizingElement] = useState(null)
  const lastPosition = useRef(null)
  const handler = useRef()

  /**
   * Workaround:
   * Problem:
   *  The `onClick` event after the `onMouseUp` should still be handled within the "resizing"-context.
   *  However any follow up `onMouseMove` should not be handled within the "resizing"-context anymore.
   * Solution:
   *  Therefore we have an `isResizing` state which we will propagate to the outside
   *  which will switch to `false` AFTER the follow up `onClick` event.
   *  And we have an `isResizingInternal` state which will switch to `false` IMMEDIATELY and
   *  can be used in any follow up `onMouseMove` handler.
   */
  const [isResizing, setIsResizing] = useState(false)
  const [isResizingInternal, setIsResizingInternal] = useState(false)

  const resizeState = useMemo(() => ({resizingElement, isResizing}), [resizingElement, isResizing])

  const startResize = element => e => {
    setResizingElement(element)
    setIsResizing(true)
    setIsResizingInternal(true)
    lastPosition.current = undefined

    // stop any further events e.g. `onDragStart`
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseUp = useCallback(() => {
    if (resizingElement) {
      resizeFinishedCallback(resizingElement)
      setIsResizingInternal(false)

      /**
       * Workaround:
       * The follow up `onClick` event should still be within the context of "resizing".
       * Therefore change these state in the next cycle after the `onClick` event fired already.
       */
      setTimeout(() => {
        setIsResizing(false)
        setResizingElement(null)
        lastPosition.current = undefined
      }, 0)
    }
  }, [resizingElement, resizeFinishedCallback])

  const onMouseMove = useCallback(e => {
    if (resizingElement && isResizingInternal) {
      handler.current = requestAnimationFrame(() => {
        if (lastPosition.current) {
          const element = resizingElementSelector(resizingElement)

          const height = measureSize(lastPosition.current.y, e.clientY, element.clientHeight)
          const width = measureSize(lastPosition.current.x, e.clientX, element.clientWidth)

          resizeCallback(resizingElement, {height, width})
        }
        
        lastPosition.current = {y: e.clientY, x: e.clientX}
      })
    }
  }, [resizingElement, resizeCallback, isResizingInternal])

  const events = {
    onMouseMove,
    onMouseUp
  }

  useEffect(() => {
    if (!isResizingInternal) {
      cancelAnimationFrame(handler.current)
    }

    return () => {
      cancelAnimationFrame(handler.current)
    }
  }, [isResizingInternal])

  return {resizeState, startResize, resizingEvents: events}
}
