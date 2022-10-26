import PropTypes from 'prop-types'
import React, {useContext, useMemo, useEffect, useRef} from 'react'

import useResizeObserver from './useResizeObserver'

export const LabelVisibility = {
  visible: 'visible',
  hidden: 'hidden',
  responsive: 'responsive'
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
