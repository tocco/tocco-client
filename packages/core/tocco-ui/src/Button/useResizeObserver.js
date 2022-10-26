import {useCallback, useRef, useState, useEffect} from 'react'

const useResizeObserver = () => {
  const [contentRect, setContentRect] = useState()

  const resizeObserverRef = useRef()

  const handleResize = useCallback(entries => {
    if (!Array.isArray(entries)) {
      return
    }

    const entry = entries[0]
    setContentRect(entry.contentRect)
  }, [])

  // use callback ref to get notified whenever ref is attach to another node
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const ref = useCallback(
    node => {
      if (node) {
        resizeObserverRef.current = new ResizeObserver(entries => handleResize(entries))
        resizeObserverRef.current.observe(node)
      }
    },
    [handleResize]
  )

  useEffect(
    () => () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
    },
    []
  )

  return [ref, contentRect]
}

export default useResizeObserver
