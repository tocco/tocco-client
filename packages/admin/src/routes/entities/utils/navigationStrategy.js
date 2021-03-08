import React from 'react'
import PropTypes from 'prop-types'
import {queryString as queryStringUtil} from 'tocco-util'
import {AdminLink as StyledLink} from 'tocco-ui'

import {goBack} from '../../../utils/routing'

const DetailLinkRelative = ({entityKey, children, relation}) =>
  <StyledLink
    aria-label="go to detail"
    to={`${relation ? relation + '/' : ''}${entityKey}`}>
    {children}
  </StyledLink>

export const DetailLink = ({entityName, entityKey, children}) =>
  <StyledLink to={`/e/${entityName}/${entityKey}`} target="_blank">{children}</StyledLink>

export const ListLink = ({entityName, entityKeys, children}) => {
  const queryString = entityKeys && entityKeys.length > 0 && 'tql=KEYS(' + entityKeys.join(',') + ')'
  return (
    <StyledLink
      to={{pathname: `/e/${entityName}/list`, search: `?${queryString}`}}
      target="_blank"
    >
      {children}
    </StyledLink>
  )
}

ListLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  entityKeys: PropTypes.arrayOf(PropTypes.string)
}

export default (history, match) => {
  const navigateToCreateRelative = (relationName, state) => {
    if (relationName) {
      history.push({
        pathname: `${match.url}/${relationName}/create`,
        state
      })
    } else {
      const entityBaseUrl = goBack(match.url)

      history.push({
        pathname: entityBaseUrl + '/create',
        state
      })
    }
  }

  const navigateToActionRelative = (definition, selection) => {
    const entityBaseUrl = goBack(match.url)
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    history.push({
      pathname: entityBaseUrl + '/action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  return {
    DetailLink,
    ListLink,
    DetailLinkRelative,
    navigateToCreateRelative,
    navigateToActionRelative
  }
}

DetailLinkRelative.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string
}

DetailLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}
