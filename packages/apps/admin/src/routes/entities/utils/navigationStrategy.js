import {createPath} from 'history'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {AdminLink as StyledLink} from 'tocco-ui'
import {queryString as queryStringUtil} from 'tocco-util'

const DetailLinkRelativeWithoutIntl = ({entityKey, entityModel, children, relation, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledLink
      aria-label={msg('client.component.navigationStrategy.detailLinkRelative')}
      to={`../${relation ? relation + '/' : ''}${entityKey}`}
    >
      {children}
    </StyledLink>
  )
}

const DetailLinkRelative = injectIntl(DetailLinkRelativeWithoutIntl)

export const DetailLink = ({entityName, entityKey, children}) => (
  <StyledLink to={`/e/${entityName}/${entityKey}`} target="_blank">
    {children}
  </StyledLink>
)

export const ListLink = ({entityName, entityKeys, children}) => {
  const queryString = entityKeys?.length && 'tql=KEYS(' + entityKeys.join(',') + ')'

  return (
    <StyledLink
      to={{
        pathname: `/e/${entityName}/list`,
        search: `?${queryString}`
      }}
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

export const ListOrDetailLink = ({entityName, entityKeys, children}) => {
  if (entityKeys?.length === 1) {
    return (
      <DetailLink entityName={entityName} entityKey={entityKeys[0]}>
        {children}
      </DetailLink>
    )
  }
  return (
    <ListLink entityName={entityName} entityKeys={entityKeys}>
      {children}
    </ListLink>
  )
}

ListOrDetailLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  entityKeys: PropTypes.arrayOf(PropTypes.string)
}

export default navigate => {
  const navigateToCreateRelative = (relationName, state) => {
    if (relationName) {
      navigate({
        pathname: `${relationName}/create`,
        state
      })
    } else {
      navigate({
        pathname: '../create',
        state
      })
    }
  }

  const navigateToActionRelative = (definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    navigate({
      pathname: '../action/' + definition.appId,
      state: {
        definition,
        selection
      },
      search
    })
  }

  const openDetail = (entityName, key, inNewTab = true) => {
    const pathname = `/e/${entityName}/${key}`
    if (inNewTab) {
      const url = createPath({pathname})
      window.open(url, '_blank')
    } else {
      navigate({pathname})
    }
  }

  return {
    DetailLink,
    ListLink,
    ListOrDetailLink,
    DetailLinkRelative,
    navigateToCreateRelative,
    navigateToActionRelative,
    openDetail
  }
}

DetailLinkRelativeWithoutIntl.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entityModel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string,
  intl: PropTypes.object.isRequired
}

DetailLink.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}
