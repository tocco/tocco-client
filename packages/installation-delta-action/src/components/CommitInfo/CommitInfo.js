import React from 'react'
import PropTypes from 'prop-types'
import {Typography as T, FormattedValue} from 'tocco-ui'
import styled from 'styled-components'

const TimeWrapper = styled.span`
  time {
  overflow: visible !important;
  }
`

const CommitInfo = ({commitId, author, commitTimestamp}) => (
  <T.Span>
    <T.P><T.B>Commit: </T.B>{commitId}</T.P>
    <T.P><T.B>Author: </T.B>{author}</T.P>
    <T.P><T.B>Merge am: </T.B><TimeWrapper><FormattedValue type="datetime" value={commitTimestamp}/></TimeWrapper></T.P>
  </T.Span>
)

CommitInfo.propTypes = {
  commitId: PropTypes.string,
  author: PropTypes.string,
  commitTimestamp: PropTypes.string
}

export default CommitInfo
