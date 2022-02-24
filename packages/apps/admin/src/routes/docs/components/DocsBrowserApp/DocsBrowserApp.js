import PropTypes from 'prop-types'
import {useSearchParams} from 'react-router-dom'
import DocsBrowser from 'tocco-docs-browser/src/main'
import {AdminLink as StyledLink} from 'tocco-ui'

import {DetailLink} from '../../../entities/utils/navigationStrategy'

export const ListLink = ({entityName, entityKeys, children}) => {
  const rootNodes = entityKeys.map(key => ({entityName, key}))
  return (
    <StyledLink to={`/docs?rootNodes=${JSON.stringify(rootNodes)}`} target="_blank">
      {children}
    </StyledLink>
  )
}

ListLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  entityKeys: PropTypes.arrayOf(PropTypes.string)
}

const DocsBrowserApp = props => {
  const [searchParams] = useSearchParams()
  const queryRootNodes = searchParams.get('rootNodes')

  return (
    <DocsBrowser
      {...props}
      routerType="inherit"
      navigationStrategy={{
        ListLink,
        DetailLink
      }}
      {...(queryRootNodes && {rootNodes: JSON.parse(queryRootNodes)})}
      searchFormCollapsed={props.searchFormCollapsed}
      onSearchFormCollapsedChange={({collapsed}) => {
        props.saveUserPreferences({'admin.list.searchFormCollapsed': collapsed})
      }}
      scrollBehaviour="inline"
    />
  )
}

DocsBrowserApp.propTypes = {
  searchFormCollapsed: PropTypes.bool,
  saveUserPreferences: PropTypes.func
}

export default DocsBrowserApp
