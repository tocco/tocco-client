import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'

import LoadingSpinner from '../LoadingSpinner'
import Typography from '../Typography'
import StyledLoadMask, {StyledLoadingIconAndTest} from './StyledLoadMask'

/**
 * A loadmask that can hide elements as long as promises are not resolved
 */
const LoadMask = ({promises, required, children, loadingText}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(true)

  const setIsLoadedSafe = isLoaded => {
    if (isMounted) {
      setIsLoaded(isLoaded)
    }
  }

  useEffect(() => {
    if (promises) {
      Promise.all(promises).then(() => {
        setIsLoadedSafe(true)
      })
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (required && Array.isArray(required)) {
      setIsLoaded(!required.some(r => (!r)))
    }
  })

  return (
    <StyledLoadMask>
      {isLoaded
        ? children
        : <StyledLoadingIconAndTest>
          <LoadingSpinner key="loading-spinner" size="30px"/>
          {loadingText
          && <Typography.Span key="loadingText">{loadingText}</Typography.Span>}
        </StyledLoadingIconAndTest>
      }
    </StyledLoadMask>
  )
}

LoadMask.propTypes = {
  /**
   * Optional text to be shown below spinner
   */
  loadingText: PropTypes.string,
  /**
   * As soon as all elements of the array are truthy, children will be displayed.
   */
  required: PropTypes.arrayOf(PropTypes.any),
  /**
   * An array of promises as alternative to required.
   */
  promises: PropTypes.array,
  /**
   * Will be shown once promises are resolved
   */
  children: PropTypes.node
}

export default LoadMask
