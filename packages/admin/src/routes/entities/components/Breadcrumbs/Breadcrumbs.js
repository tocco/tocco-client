import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {Helmet} from 'react-helmet'

import {StyledBreadcumbs, StyledBreadcrumbsLink} from './StyledBreadcrumbs'

const Breadcrumbs = ({breadcrumbsInfo}) => {
  if (breadcrumbsInfo.length === 0) { return null }

  return <StyledBreadcumbs>
    <Helmet defer={false}>
      <title>Tocco - {breadcrumbsInfo[breadcrumbsInfo.length - 1].display}</title>
    </Helmet>
    <div>  {
      breadcrumbsInfo
        .map((b, idx) => {
          return <Typography.Span key={idx}>
            <StyledBreadcrumbsLink neutral to={`/e/${b.path}`}>
              {b.type === 'list' && <Icon icon="list-ul" />}  {b.display ? b.display : ''}
            </StyledBreadcrumbsLink>
          </Typography.Span>
        })
        .reduce((prev, curr, idx) =>
          [prev,
            <Typography.Span key={'icon' + idx}> <Icon icon="angle-right"/> </Typography.Span>,
            curr]
        )}  </div>
  </StyledBreadcumbs>
}

Breadcrumbs.propTypes = {
  match: PropTypes.object,
  breadcrumbsInfo: PropTypes.array
}

export default Breadcrumbs
