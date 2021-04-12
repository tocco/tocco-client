import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'

import Icon from '../Icon'
import Typography from '../Typography'
import {
  StyledBreadcrumbs,
  StyledBreadcrumbsLink,
  StyledBreadcrumbsTitle
} from './StyledBreadcrumbs'

const getTitle = breadcrumbsInfo =>
  breadcrumbsInfo
    .slice(breadcrumbsInfo.length - 2)
    .map(breadcrumb => breadcrumb.display)
    .reverse()
    .join(' - ')

const Breadcrumbs = ({pathPrefix, breadcrumbsInfo, currentViewTitle, backgroundColor}) => {
  const breadcrumbs = [
    ...(breadcrumbsInfo || []),
    ...(currentViewTitle ? [{display: currentViewTitle}] : [])
  ]

  if (breadcrumbs.length === 0) {
    return null
  }

  return <StyledBreadcrumbs backgroundColor={backgroundColor}>
    <Helmet defer={false}>
      <title>{getTitle(breadcrumbsInfo)}</title>
    </Helmet>
    <div>  {
      breadcrumbs.map((b, idx) => {
        const display = b.display || ''
        const Comp = idx === breadcrumbs.length - 1 ? StyledBreadcrumbsTitle : StyledBreadcrumbsLink
        return <Typography.Span key={`breadcrumbItem-${idx}`}>
          <Comp
            neutral="true"
            {...(idx === breadcrumbs.length - 1 && {active: 'true'})}
            to={`${pathPrefix}/${b.path}`}
          >
            {b.type === 'list' && <Icon icon="list-ul" />}  {display}
          </Comp>
        </Typography.Span>
      })
        .reduce((prev, curr, idx) =>
          [prev,
            <Typography.Span key={'icon' + idx}> <Icon icon="angle-right"/> </Typography.Span>,
            curr]
        )}
    </div>
  </StyledBreadcrumbs>
}

Breadcrumbs.defaultProps = {
  pathPrefix: ''
}

Breadcrumbs.propTypes = {
  pathPrefix: PropTypes.string,
  match: PropTypes.object,
  breadcrumbsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string,
      path: PropTypes.string,
      type: PropTypes.string
    })
  ),
  currentViewTitle: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Breadcrumbs
