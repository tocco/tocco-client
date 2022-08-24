import PropTypes from 'prop-types'
import React, {useContext, useMemo, useState, useCallback, useEffect, useRef} from 'react'

export const LabelVisibility = {
  visible: 'visible',
  hidden: 'hidden',
  responsive: 'responsive'
}

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

const defaultValue = {labelVisibility: LabelVisibility.responsive}
const ButtonContext = React.createContext(defaultValue)

const HeightThreshold = 50

const ButtonContextProvider = ({children}) => {
  const widthThreshold = useRef(null)

  const [wrapperRef, contentRect] = useResizeObserver()

  /**
   * Keep the width of the threshold and only show full buttons again, when wrapper has reached threshold again.
   * This prevents from infinite toggling between icon only buttons and full buttons when height threshold has reached.
   */
  const hideLabel = !widthThreshold.current
    ? contentRect?.height > HeightThreshold
    : contentRect?.width < widthThreshold.current

  /**
   * Only change widthThreshold when `hideLabel` has changed.
   * `contentRect.width` should be ignored in the `deps`:
   *  - `hideLabel` will only change when `contentRect.width` has changed too
   *  - useEffect code should not run when only `contentReact.width` has changed without `hideLabel`
   */
  useEffect(() => {
    if (hideLabel) {
      widthThreshold.current = contentRect.width + 1
    } else {
      widthThreshold.current = null
    }
  }, [hideLabel]) // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({labelVisibility: hideLabel ? LabelVisibility.hidden : LabelVisibility.visible}),
    [hideLabel]
  )
  return <ButtonContext.Provider value={value}>{children(wrapperRef)}</ButtonContext.Provider>
}

ButtonContextProvider.propTypes = {
  children: PropTypes.func.isRequired
}

export const useButtonContext = () => useContext(ButtonContext)

export default ButtonContextProvider
