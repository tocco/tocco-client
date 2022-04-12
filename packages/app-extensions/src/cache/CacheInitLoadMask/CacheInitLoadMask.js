import React from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'

const CacheInitLoadMask = ({children, initialised}) => (
  <LoadMask required={[initialised]}>
    {children}
  </LoadMask>
)

CacheInitLoadMask.propTypes = {
  children: PropTypes.any,
  initialised: PropTypes.bool
}

export default CacheInitLoadMask
