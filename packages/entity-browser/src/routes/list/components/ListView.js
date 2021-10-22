import React from 'react'
import PropTypes from 'prop-types'
import {queryString as queryStringUtil, viewPersistor} from 'tocco-util'
import {RouterLink} from 'tocco-ui'
import EntityListApp from 'tocco-entity-list/src/main'

import Action from '../../../components/LazyAction'

const DetailLinkRelative = ({entityKey, children, relation}) =>
  <RouterLink to={`${relation ? relation + '/' : ''}detail/${entityKey}`}>{children}</RouterLink>

DetailLinkRelative.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string
}

const ListView = ({storeId, router, ...props}) => {
  const navigateToCreate = ({history, match, relationName}) => {
    if (relationName) {
      history.push(`${match}/${relationName}/`)
    } else {
      history.push('/detail')
    }
  }

  const navigateToAction = (history, definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    history.push({
      pathname: '/action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  const handleRowClick = e => {
    router.history.push(`/detail/${e.id}`)
  }

  return (
    <EntityListApp
      {...props}
      onRowClick={handleRowClick}
      showLink
      navigationStrategy={{
        DetailLinkRelative,
        navigateToActionRelative: (definition, selection) =>
          navigateToAction(router.history, definition, selection),
        navigateToCreateRelative: relationName => navigateToCreate(
          {relationName, history: router.history, match: router.match}
        )
      }}
      searchFormPosition="top"
      actionAppComponent={Action}
      store={viewPersistor.viewInfoSelector(storeId).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(storeId, {store}, 0)
      }}
    />
  )
}

ListView.propTypes = {
  id: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  searchFormType: PropTypes.string.isRequired,
  limit: PropTypes.number,
  searchFitlers: PropTypes.array,
  preselectedSearchFields: PropTypes.array,
  disableSimpleSearch: PropTypes.bool,
  simpleSearchFields: PropTypes.string,
  router: PropTypes.object.isRequired
}

export default ListView
