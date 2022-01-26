import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

const CopyProgress = ({startCopy}) => {
  useEffect(() => {
    startCopy()
  }, [startCopy])

  return <LoadMask/>
}

CopyProgress.propTypes = {
  startCopy: PropTypes.func.isRequired
}

export default CopyProgress
