import React from 'react'
import PropTypes from 'prop-types'
import DocsBrowser from 'tocco-docs-browser/src/main'
import {AdminLink as StyledLink} from 'tocco-ui'
import queryString from 'query-string'

import {DetailLink} from '../entities/utils/navigationStrategy'

export const ListLink = ({entityName, entityKeys, children}) => {
  const rootNodes = entityKeys.map(key => ({entityName, key}))
  return <StyledLink to={`/docs?rootNodes=${JSON.stringify(rootNodes)}`} target="_blank">{children}</StyledLink>
}

ListLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  entityKeys: PropTypes.arrayOf(PropTypes.string)
}

const DocsBrowserApp = props => {
  const queryParams = queryString.parse(props.history.location.search)

  return <DocsBrowser
    {...props}
    navigationStrategy={{
      ListLink,
      DetailLink
    }}
    {...queryParams.rootNodes && {rootNodes: JSON.parse(queryParams.rootNodes)}}
/>
}

DocsBrowserApp.propTypes = {
  history: PropTypes.object.isRequired
}

export default {
  container: DocsBrowserApp
}
