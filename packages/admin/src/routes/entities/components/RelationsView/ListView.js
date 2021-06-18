import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'

import {currentViewPropType} from '../../utils/propTypes'
import navigationStrategy from '../../utils/navigationStrategy'
import {goBack} from '../../../../utils/routing'

const ListView = ({selectedRelation, currentViewInfo, match, history, emitAction}) => {
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
          navigationStrategy={navigationStrategy(history, match)}
          onRowClick={({id}) => {
            const entityBaseUrl = match.url.replace(/detail$/, '')
            history.push(`${entityBaseUrl}${selectedRelation.relationName}/${id}`)
          }}
          onNavigateToCreate={() => {
            const entityBaseUrl = goBack(match.url)
            history.push(entityBaseUrl + '/' + selectedRelation.relationName + '/create')
          }}
          searchFormType="simple"
          selectionStyle="none"
          store={viewPersistor.viewInfoSelector(history.location.pathname)[`store-${selectedRelation.relationName}`]}
          onStoreCreate={store => {
            viewPersistor.persistViewInfo(
              currentViewInfo.pathname,
              {[`store-${selectedRelation.relationName}`]: store},
              currentViewInfo.level
            )
          }}
          showActions={false}
          limit={15}
          emitAction={emitAction}
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default React.memo(ListView)
