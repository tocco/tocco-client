import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MergeTable from '../MergeTable'

const StyledMerge = styled.div`
  margin: 5px;
  height: 100%;
  overflow: hidden;
`

const Merge = ({initialize, mergeResponse}) => {
  useEffect(() => {
    initialize()
  })

  return (
    <StyledMerge>
      {
        mergeResponse
          ? <div>Merge Response</div>
          : <MergeTable/>
      }
    </StyledMerge>
  )
}

Merge.propTypes = {
  initialize: PropTypes.func.isRequired,
  mergeResponse: PropTypes.object
}

export default Merge
