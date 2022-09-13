import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {RouterLink, scrollBehaviourPropType} from 'tocco-ui'
import {queryString as queryStringUtil, viewPersistor} from 'tocco-util'

import Action from '../LazyAction'

const DetailLinkRelative = ({entityKey, children, relation}) => (
  <RouterLink to={`${relation ? relation + '/' : ''}detail/${entityKey}`}>{children}</RouterLink>
)

DetailLinkRelative.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string
}

const ListView = ({storeId, router, modifyFormDefinition, disableDetailView, ...props}) => {
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
      state: {
        definition,
        selection,
        originUrl: history.location.pathname
      },
      search
    })
  }

  const handleRowClick = e => {
    if (!disableDetailView) {
      router.history.push(`/detail/${e.id}`)
    }
  }

  return (
    <EntityListApp
      {...props}
      onRowClick={handleRowClick}
      showLink={!disableDetailView}
      navigationStrategy={{
        DetailLinkRelative,
        navigateToActionRelative: (definition, selection) => navigateToAction(router.history, definition, selection),
        navigateToCreateRelative: relationName =>
          navigateToCreate({relationName, history: router.history, match: router.match})
      }}
      searchFormPosition="top"
      actionAppComponent={Action}
      store={viewPersistor.viewInfoSelector(storeId).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(storeId, {store}, 0)
      }}
      modifyFormDefinition={modifyFormDefinition}
    />
  )
}

ListView.propTypes = {
  id: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  scrollBehaviour: scrollBehaviourPropType,
  searchFormType: PropTypes.string.isRequired,
  limit: PropTypes.number,
  searchFitlers: PropTypes.array,
  preselectedSearchFields: PropTypes.array,
  simpleSearchFields: PropTypes.string,
  router: PropTypes.object.isRequired,
  modifyFormDefinition: PropTypes.func,
  disableDetailView: PropTypes.bool,
  reportIds: PropTypes.arrayOf(PropTypes.string)
}

export default ListView
