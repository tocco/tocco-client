import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MergeTable from '../MergeTable'
import MergeSummary from '../MergeSummary'

const StyledMerge = styled.div`
  margin: 5px;
  height: 100%;
  overflow: hidden;
`

const Merge = ({initialize, mergeDone}) => {
  useEffect(() => {
    initialize()
  }, [])

  return (
    <StyledMerge>
      {
        mergeDone ? <MergeSummary/> : <MergeTable/>
      }
    </StyledMerge>
  )
}

Merge.propTypes = {
  initialize: PropTypes.func.isRequired,
  mergeDone: PropTypes.bool.isRequired
}

export default Merge
