import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import MergeTable from '../MergeTable'
import MergeSummary from '../MergeSummary'
import {StyledMerge} from './StyledComponents'

const Merge = ({initialize, mergeDone}) => {
  useEffect(() => {
    initialize()
  }, [])

  return (
    <StyledMerge>
      {mergeDone ? <MergeSummary/> : <MergeTable/>}
    </StyledMerge>
  )
}

Merge.propTypes = {
  initialize: PropTypes.func.isRequired,
  mergeDone: PropTypes.bool.isRequired
}

export default Merge
