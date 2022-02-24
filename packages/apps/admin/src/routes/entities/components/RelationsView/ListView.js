import PropTypes from 'prop-types'
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'

import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'

const ListView = ({selectedRelation, currentViewInfo, emitAction}) => {
  const viewInfoName = `${selectedRelation.reverseRelationName}${selectedRelation.relationName}`
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <EntityListApp
      id={'preview' + selectedRelation.reverseRelationName + selectedRelation.targetEntity}
      key={selectedRelation.reverseRelationName + selectedRelation.targetEntity}
      entityName={selectedRelation.targetEntity}
      formName={selectedRelation.targetEntity}
      parent={{
        key: currentViewInfo.key,
        reverseRelationName: selectedRelation.reverseRelationName,
        model: currentViewInfo.model.name,
        relationName: selectedRelation.relationName
      }}
      showLink={true}
      navigationStrategy={navigationStrategy(navigate)}
      onRowClick={({id}) => {
        navigate(`../${selectedRelation.relationName}/${id}`)
      }}
      onNavigateToCreate={() => {
        navigate(+'../' + selectedRelation.relationName + '/create')
      }}
      searchFormType="fulltext"
      selectionStyle="none"
      store={viewPersistor.viewInfoSelector(location.pathname)[`store-${viewInfoName}`]}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(
          currentViewInfo.pathname,
          {[`store-${viewInfoName}`]: store},
          currentViewInfo.level
        )
      }}
      showActions={false}
      limit={15}
      emitAction={emitAction}
      scrollBehaviour="inline"
    />
  )
}

ListView.propTypes = {
  selectedRelation: PropTypes.shape({
    reverseRelationName: PropTypes.string,
    targetEntity: PropTypes.string,
    relationName: PropTypes.string
  }).isRequired,
  currentViewInfo: currentViewPropType,
  emitAction: PropTypes.func.isRequired
}

export default React.memo(ListView)
