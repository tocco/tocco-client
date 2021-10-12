import {useCallback, useEffect, useRef, useState} from 'react'

/**
 * resizeCallback: (columnId, width) => void
 *    gets called on every mouse move with the new width
 *
 * resizeFinishedCallback: (colmunId) => void
 *    gets called when user has finished moving the column (on mouseUp)
 */
export default (tableElRef, resizeCallback, resizeFinishedCallback) => {
  const [resizingColumn, setResizingColumn] = useState(null)
  const [isResizing, setIsResizing] = useState(false)
  const lastPositionX = useRef()
  const handler = useRef()

  const startResize = column => () => {
    setResizingColumn(column)
    setIsResizing(true)
    lastPositionX.current = undefined
  }

  const onMouseUp = useCallback(() => {
    if (resizingColumn) {
      resizeFinishedCallback(resizingColumn.id)
      /**
       * Internally the resizing is finished and `onMouseMove` should not
       * invoke any resize callback handler anymore.
       */
      setIsResizing(false)
      lastPositionX.current = undefined

      /**
       * Workaround:
       * The follow up click event should still be within the context of "resizing".
       * Otherwise the resizingColumn which is returned is already cleared
       * and the follow up click event could be interpreted for something else (e.g. sorting).
       */
      setTimeout(() => {
        setResizingColumn(null)
      }, 100)
    }
  }, [resizingColumn, resizeFinishedCallback])

  const onMouseMove = useCallback(e => {
    if (resizingColumn && isResizing) {
      handler.current = requestAnimationFrame(() => {
        if (lastPositionX.current) {
          const diff = e.clientX - lastPositionX.current
          const thEl = tableElRef.current.querySelector(`th[id='header-cell-${resizingColumn.id}']`)
          const width = Math.max(50, thEl.offsetWidth + diff)
          resizeCallback(resizingColumn.id, width)
        }
        
        lastPositionX.current = e.clientX
      })
    }
  }, [resizingColumn, resizeCallback])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    } else {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      cancelAnimationFrame(handler.current)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      cancelAnimationFrame(handler.current)
    }
  }, [isResizing, onMouseMove, onMouseUp])

  return {resizingColumn, startResize}
}
