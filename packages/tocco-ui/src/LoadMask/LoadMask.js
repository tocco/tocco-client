import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'

import LoadingSpinner from '../LoadingSpinner'
import Typography from '../Typography'
import StyledLoadMask, {StyledLoadingIconAndTest} from './StyledLoadMask'

/**
 * A loadmask that can hide elements as long as promises are not resolved
 */
const LoadMask = ({promises, required, children, loadingText}) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMounted, setIsMounted] = useState(true)

  const requiredLoaded = required => !required.some(r => (!r))
  const handleInitialization = () => {
    if (isMounted && !isInitialized) {
      setIsInitialized(true)
    }
  }

  useEffect(() => {
    if (promises) {
      Promise.all(promises).then(() => {
        handleInitialization()
      })
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) {
      if (required && requiredLoaded(required)) {
        handleInitialization()
      }
    }
  })

  return (
    <StyledLoadMask isInitialized={isInitialized}>
      {isInitialized
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
