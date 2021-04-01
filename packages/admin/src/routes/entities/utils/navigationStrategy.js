import React from 'react'
import PropTypes from 'prop-types'
import {queryString as queryStringUtil} from 'tocco-util'
import {AdminLink as StyledLink} from 'tocco-ui'
import {injectIntl, intlShape} from 'react-intl'

import {goBack} from '../../../utils/routing'

const DetailLinkRelativeWithoutIntl = ({entityKey, children, relation, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledLink
      aria-label={msg('client.component.navigationStrategy.detailLinkRelative')}
      to={`${relation ? relation + '/' : ''}${entityKey}`}>
      {children}
    </StyledLink>
  )
}

const DetailLinkRelative = injectIntl(DetailLinkRelativeWithoutIntl)

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

DetailLinkRelativeWithoutIntl.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string,
  intl: intlShape.isRequired
}

DetailLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}
