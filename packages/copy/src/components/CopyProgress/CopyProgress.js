import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'

const CopyProgress = ({startCopy}) => {
  useEffect(() => {
    startCopy()
  }, [])

  return <LoadMask/>
}

CopyProgress.propTypes = {
  startCopy: PropTypes.func.isRequired
}

export default CopyProgress
