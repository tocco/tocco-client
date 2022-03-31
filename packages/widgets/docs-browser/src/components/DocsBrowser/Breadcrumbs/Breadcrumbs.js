import PropTypes from 'prop-types'
import {withTheme} from 'styled-components'
import {Breadcrumbs, theme as themeUtil} from 'tocco-ui'

const DocsBrowserBreadcrumbs = ({embedded, resetSearchMode, theme, pathPrefix, breadcrumbsInfo}) => {
  const handleBreadcrumbsClick = breadcrumbsItem => {
    if (breadcrumbsItem.path === '') {
      resetSearchMode()
    }
  }

  return (
    <Breadcrumbs
      {...(embedded ? {backgroundColor: themeUtil.color('paper')({theme})} : {})}
      onClick={handleBreadcrumbsClick}
      pathPrefix={pathPrefix}
      breadcrumbsInfo={breadcrumbsInfo}
    />
  )
}

DocsBrowserBreadcrumbs.propTypes = {
  embedded: PropTypes.bool,
  resetSearchMode: PropTypes.func,
  pathPrefix: PropTypes.string,
  breadcrumbsInfo: PropTypes.array,
  theme: PropTypes.object
}

export default withTheme(DocsBrowserBreadcrumbs)
