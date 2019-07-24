import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon, Typography} from 'tocco-ui'
const Breadcrumbs = ({breadcrumbsInfo}) => {
  if (breadcrumbsInfo.length === 0) { return null }

  return <div>
    {
      breadcrumbsInfo
        .map((b, idx) => {
          return <Typography.Span key={idx}>
            <Link to={`/e/${b.path}`}> {b.type === 'list' && <Icon icon="list" />}  {b.display ? b.display : ''}</Link>
          </Typography.Span>
        })
        .reduce((prev, curr, idx) =>
          [prev,
            <Typography.Span key={'icon' + idx}> <Icon icon="caret-right"/> </Typography.Span>,
            curr]
        )}</div>
}

Breadcrumbs.propTypes = {
  match: PropTypes.object,
  breadcrumbsInfo: PropTypes.array
}

export default Breadcrumbs
