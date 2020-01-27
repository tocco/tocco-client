import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {Helmet} from 'react-helmet'

import {StyledBreadcumbs, StyledBreadcrumbsLink} from './StyledBreadcrumbs'

const getTitle = breadcrumbsInfo =>
  breadcrumbsInfo
    .slice(breadcrumbsInfo.length - 2)
    .map(breadcrumb => breadcrumb.display)
    .reverse()
    .join(' - ')

const Breadcrumbs = ({breadcrumbsInfo}) => {
  if (breadcrumbsInfo.length === 0) { return null }

  return <StyledBreadcumbs>
    <Helmet defer={false}>
      <title>{getTitle(breadcrumbsInfo)}</title>
    </Helmet>
    <div>  {
      breadcrumbsInfo
        .map((b, idx) => {
          return <Typography.Span key={idx}>
            <StyledBreadcrumbsLink
              neutral="true"
              {...(idx === breadcrumbsInfo.length - 1 && {active: 'true'})}
              to={`/e/${b.path}`}
            >
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
