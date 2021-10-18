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
  const [isResizing, setIsResizing] = useState(false)
  const [isResizingInternal, setIsResizingInternal] = useState(false)
  const lastPosition = useRef(null)
  const handler = useRef()

  const resizeState = useMemo(() => ({resizingElement, isResizing}), [resizingElement, isResizing])

  const startResize = element => () => {
    setResizingElement(element)
    setIsResizing(true)
    setIsResizingInternal(true)
    lastPosition.current = undefined
  }

  const onMouseUp = useCallback(() => {
    if (resizingElement) {
      resizeFinishedCallback(resizingElement)
      setIsResizingInternal(false)

      /**
       * Workaround:
       * The follow up click event should still be within the context of "resizing".
       * Otherwise the resizingElement which is returned is already cleared
       * and the follow up click event could be interpreted for something else (e.g. sorting).
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
