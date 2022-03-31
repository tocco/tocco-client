import PropTypes from 'prop-types'
import {useEffect} from 'react'

import MergeSummary from '../MergeSummary'
import MergeTable from '../MergeTable'
import {StyledMerge} from './StyledComponents'

const Merge = ({initialize, mergeDone}) => {
  useEffect(() => {
    initialize()
  }, [initialize])

  return <StyledMerge>{mergeDone ? <MergeSummary /> : <MergeTable />}</StyledMerge>
}

Merge.propTypes = {
  initialize: PropTypes.func.isRequired,
  mergeDone: PropTypes.bool.isRequired
}

export default Merge
