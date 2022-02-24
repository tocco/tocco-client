import PropTypes from 'prop-types'
import queryString from 'query-string'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'

import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'
import Action from '../Action'
import DocsViewAdapter from './DocsViewAdapter'

const ListView = ({currentViewInfo, emitAction, searchFormCollapsed, saveUserPreferences}) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  if (!currentViewInfo) {
    return null
  }

  const queryParams = queryString.parse(searchParams)

  const handleRowClick = ({id}) => {
    navigate(`../${id}`)
  }

  const initialLocation = history.location.hash ? history.location.hash.substring(1) : null

  if (currentViewInfo.model.name === 'Resource') {
    return <DocsViewAdapter currentViewInfo={currentViewInfo} initialLocation={initialLocation} />
  }

  return (
    <EntityListApp
      emitAction={emitAction}
      limit={25}
      id={`${currentViewInfo.model.name}_list`}
      entityName={currentViewInfo.model.name}
      formName={queryParams.formName || currentViewInfo.model.name}
      onRowClick={handleRowClick}
      {...(currentViewInfo.reverseRelation && {
        parent: {
          key: currentViewInfo.parentKey,
          reverseRelationName: currentViewInfo.reverseRelation,
          model: currentViewInfo.parentModel.name
        }
      })}
      showLink={true}
      navigationStrategy={navigationStrategy(navigate)}
      searchFormPosition="left"
      searchFormType="admin"
      scrollBehaviour="inline"
      store={viewPersistor.viewInfoSelector(location.pathname).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(location.pathname, {store}, currentViewInfo.level)
      }}
      actionAppComponent={Action}
      tql={queryParams.tql}
      searchFormCollapsed={searchFormCollapsed}
      onSearchFormCollapsedChange={({collapsed}) => {
        saveUserPreferences({'admin.list.searchFormCollapsed': collapsed})
      }}
    />
  )
}

ListView.propTypes = {
  emitAction: PropTypes.func.isRequired,
  currentViewInfo: currentViewPropType,
  persistedViewInfo: PropTypes.shape({
    store: PropTypes.object
  }),
  searchFormCollapsed: PropTypes.bool,
  saveUserPreferences: PropTypes.func
}

export default ListView
