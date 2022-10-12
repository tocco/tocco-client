import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {html} from 'tocco-util'

import {AdminLink as StyledLink} from '../AdminLink'
import Icon from '../Icon'
import Typography from '../Typography'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import {StyledBreadcrumbs, StyledBreadcrumbsLink, StyledBreadcrumbsTitle} from './StyledBreadcrumbs'

const getElementTitle = breadcrumb => breadcrumb.title || breadcrumb.display

export const getTitle = (breadcrumbsInfo, createTitle) => {
  if (!breadcrumbsInfo || breadcrumbsInfo.length === 0) {
    return 'Tocco'
  }

  const lastElement = breadcrumbsInfo.at(-1)
  let title = ''

  switch (lastElement.type) {
    case 'create':
      title = `${getElementTitle(lastElement)} - ${createTitle}`
      break
    case 'detail':
      title = breadcrumbsInfo
        .slice(breadcrumbsInfo.length - 2)
        .map(getElementTitle)
        .join(' - ')
      break
    default:
      title = getElementTitle(lastElement)
  }

  return title
}

const Breadcrumbs = ({
  intl,
  pathPrefix,
  breadcrumbsInfo = [],
  currentView,
  backgroundColor,
  onClick,
  linkComp: LinkComp
}) => {
  const breadcrumbs = [...breadcrumbsInfo, ...(currentView ? [currentView] : [])]

  if (breadcrumbs.length === 0) {
    return null
  }

  const handleClick = breadcrumbsItem => () => {
    if (onClick) {
      onClick(breadcrumbsItem)
    }
  }

  const msg = id => intl.formatMessage({id})

  const BreadcrumbList = breadcrumbs
    .map((breadcrumb, idx) => {
      const display = breadcrumb.display || ''
      const Breadcrumb = idx === breadcrumbs.length - 1 ? StyledBreadcrumbsTitle : StyledBreadcrumbsLink
      const activeProp = idx === breadcrumbs.length - 1 && {active: 'true'}
      const pathProp = typeof breadcrumb.path !== 'undefined' ? {to: `${pathPrefix}/${breadcrumb.path}`} : {}
      const componentType = LinkComp ? <LinkComp /> : <StyledLink />
      const ListIcon = breadcrumb.type === 'list' && <Icon icon="list" />
      const ErrorIcon = breadcrumb.type === 'error' && <Icon icon="exclamation-circle" />
      const HomeIcon = breadcrumb.type === 'home' && <Icon icon="house-blank" />

      return (
        <Typography.Span key={`breadcrumbItem-${idx}`}>
          <Breadcrumb neutral {...activeProp} {...pathProp} onClick={handleClick(breadcrumb)} component={componentType}>
            {ListIcon}
            {ErrorIcon}
            {HomeIcon}
            <span dangerouslySetInnerHTML={{__html: html.sanitizeHtml(display)}} />
          </Breadcrumb>
        </Typography.Span>
      )
    })
    .reduce((prev, curr, idx) => [prev, <BreadcrumbSeparator key={`icon${idx}`} />, curr])

  return (
    <StyledBreadcrumbs backgroundColor={backgroundColor}>
      <Helmet defer={false}>
        <title>{getTitle(breadcrumbs, msg('client.component.breadcrumbs.createTitle'))}</title>
      </Helmet>
      <>{BreadcrumbList}</>
    </StyledBreadcrumbs>
  )
}

Breadcrumbs.defaultProps = {
  pathPrefix: ''
}

Breadcrumbs.propTypes = {
  intl: PropTypes.object.isRequired,
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
