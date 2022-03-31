import PropTypes from 'prop-types'
import {withTheme} from 'styled-components'
import {Breadcrumbs, theme as themeUtil} from 'tocco-ui'

const BreadcrumbLink = props => {
  return <span {...props}></span>
}

const DocsBrowserBreadcrumbs = ({embedded, navigate, resetSearchMode, theme, pathPrefix, breadcrumbsInfo}) => {
  const handleBreadcrumbsClick = breadcrumbsItem => {
    if (breadcrumbsItem.path === '') {
      resetSearchMode()
    }
    navigate(`/docs/${breadcrumbsItem.path}`)
  }

  return (
    <Breadcrumbs
      {...(embedded ? {backgroundColor: themeUtil.color('paper')({theme})} : {})}
      onClick={handleBreadcrumbsClick}
      linkComp={BreadcrumbLink}
      pathPrefix={pathPrefix}
      breadcrumbsInfo={breadcrumbsInfo}
    />
  )
}

DocsBrowserBreadcrumbs.propTypes = {
  embedded: PropTypes.bool,
  resetSearchMode: PropTypes.func,
  navigate: PropTypes.func,
  pathPrefix: PropTypes.string,
  breadcrumbsInfo: PropTypes.array,
  theme: PropTypes.object
}

export default withTheme(DocsBrowserBreadcrumbs)
