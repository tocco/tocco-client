import PropTypes from 'prop-types'
import React from 'react'
import {Helmet} from 'react-helmet'
import {html} from 'tocco-util'

import {AdminLink as StyledLink} from '../AdminLink'
import Icon from '../Icon'
import Typography from '../Typography'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import {StyledBreadcrumbs, StyledBreadcrumbsLink, StyledBreadcrumbsTitle} from './StyledBreadcrumbs'

const getTitle = breadcrumbsInfo =>
  breadcrumbsInfo
    .slice(breadcrumbsInfo.length - 2)
    .map(breadcrumb => breadcrumb.title || breadcrumb.display)
    .join(' - ')

const Breadcrumbs = ({pathPrefix, breadcrumbsInfo, currentView, backgroundColor, onClick, linkComp: LinkComp}) => {
  const breadcrumbs = [...(breadcrumbsInfo || []), ...(currentView ? [currentView] : [])]

  if (breadcrumbs.length === 0) {
    return null
  }

  const handleClick = breadcrumbsItem => () => {
    if (onClick) {
      onClick(breadcrumbsItem)
    }
  }

  const Breadcrumbs = breadcrumbs
    .map((b, idx) => {
      const display = b.display || ''
      const Breadcrumb = idx === breadcrumbs.length - 1 ? StyledBreadcrumbsTitle : StyledBreadcrumbsLink
      const activeProp = idx === breadcrumbs.length - 1 && {active: 'true'}
      const pathProp = typeof b.path !== 'undefined' ? {to: `${pathPrefix}/${b.path}`} : {}
      const componentType = LinkComp ? <LinkComp /> : <StyledLink />
      const ListIcon = b.type === 'list' && <Icon icon="list" />
      const ErrorIcon = b.type === 'error' && <Icon icon="exclamation-circle" />

      return (
        <Typography.Span key={`breadcrumbItem-${idx}`}>
          <Breadcrumb neutral {...activeProp} {...pathProp} onClick={handleClick(b)} component={componentType}>
            {ListIcon}
            {ErrorIcon}
            <span dangerouslySetInnerHTML={{__html: html.sanitizeHtml(display)}} />
          </Breadcrumb>
        </Typography.Span>
      )
    })
    .reduce((prev, curr, idx) => [prev, <BreadcrumbSeparator key={'icon' + idx} />, curr])

  return (
    <StyledBreadcrumbs backgroundColor={backgroundColor}>
      <Helmet defer={false}>
        <title>{getTitle(breadcrumbs)}</title>
      </Helmet>
      <>{Breadcrumbs}</>
    </StyledBreadcrumbs>
  )
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
      title: PropTypes.string,
      path: PropTypes.string,
      type: PropTypes.string
    })
  ),
  currentView: PropTypes.shape({
    display: PropTypes.string,
    title: PropTypes.string
  }),
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  linkComp: PropTypes.any
}

export default Breadcrumbs
