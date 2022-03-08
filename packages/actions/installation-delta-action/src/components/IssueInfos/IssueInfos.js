import PropTypes from 'prop-types'
import React from 'react'
import {Link, Typography} from 'tocco-ui'

const IssueInfos = ({issues, issueUrl}) =>
  issues.map((issue, idx) => (
    <Typography.P key={idx}>
      <Link target="_blank" href={`${issueUrl}${issue.key}`} label={`${issue.key} (${issue.status})`} />
    </Typography.P>
  ))

IssueInfos.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      status: PropTypes.string
    })
  ).isRequired,
  issueUrl: PropTypes.string.isRequired
}

export default IssueInfos
