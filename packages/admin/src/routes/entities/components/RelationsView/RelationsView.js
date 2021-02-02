import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {js, viewPersistor} from 'tocco-util'
import EntityListApp from 'tocco-entity-list/src/main'
import queryString from 'query-string'
import _get from 'lodash/get'

import {
  RelationBox,
  RelationLabel,
  RelationLinks,
  StyledPreviewBox,
  StyledRelationBox,
  StyledRelationsViewWrapper
} from './StyledComponents'
import {StyledLink} from '../../../../components/StyledLink'
import {goBack} from '../../../../utils/routing'
import {currentViewPropType} from '../../utils/propTypes'
import {getRelation, setRelation} from '../../utils/relationPersistor'
import navigationStrategy from '../../utils/navigationStrategy'

const RelationsView = ({
  history,
  match,
  currentViewInfo,
  relations,
  relationsInfo,
  emitAction
}) => {
  const [selectedRelation, selectRelation] = useState(null)
  const entityName = _get(currentViewInfo, 'model.name')
  useEffect(
    () => {
      if (relations && relations.length > 0) {
        const queryRelation = queryString.parse(history.location.search).relation
        if (queryRelation) {
          selectRelation(relations.find(r => r.relationName === queryRelation))
        } else {
          const persistedSelectedRelation = getRelation(entityName)
          if (persistedSelectedRelation) {
            selectRelation(relations.find(r => r.relationName === persistedSelectedRelation))
          } else {
            selectRelation(relations[0])
          }
        }
      }
    },
    [relations]
  )

  const getRelationCountLabel = relationName => relationsInfo[relationName] && relationsInfo[relationName].count > 0
    ? <RelationLabel>&nbsp;({relationsInfo[relationName].count})</RelationLabel>
    : null

  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  const hasCreateRights = relationName => relationsInfo[relationName] && relationsInfo[relationName].createPermission

  return (
    <StyledRelationsViewWrapper>
      <StyledRelationBox>
        {relations.map(relation => (
          <RelationBox
            key={`relation-${relation.relationName}`}
            selected={selectedRelation && relation.relationName === selectedRelation.relationName}
            onClick={() => {
              selectRelation(relation)
              history.replace({
                search: '?relation=' + relation.relationName
              })
              setRelation(entityName, relation.relationName)
            }}
          >
            <RelationLabel title={relation.relationDisplay.label}>
              {relation.relationDisplay.label}</RelationLabel>{getRelationCountLabel(relation.relationName)}
            <RelationLinks>
              <StyledLink to={match.url.replace(/(relations|detail)$/, relation.relationName)}>
                <Icon icon="arrow-right"/>
              </StyledLink>
              {hasCreateRights(relation.relationName)
              && <StyledLink to={match.url.replace(/(relations|detail)$/, relation.relationName) + '/create'}>
                <Icon icon="plus"/>
              </StyledLink>
              }
            </RelationLinks>
          </RelationBox>
        ))}
      </StyledRelationBox>

      {selectedRelation
      && <StyledPreviewBox>
        <Typography.H4>
          {selectedRelation.relationDisplay.label}
          <StyledLink to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName)}>
            <Icon icon="arrow-right"/>
          </StyledLink>
          { hasCreateRights(selectedRelation.relationName)
          && <StyledLink to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName) + '/create'}>
            <Icon icon="plus"/>
          </StyledLink>
          }
        </Typography.H4>
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
      </StyledPreviewBox>
      }
    </StyledRelationsViewWrapper>
  )
}

RelationsView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType,
  relations: PropTypes.array,
  relationsInfo: PropTypes.objectOf(PropTypes.shape({
    count: PropTypes.number,
    createPermission: PropTypes.bool
  })),
  emitAction: PropTypes.func.isRequired
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(RelationsView, areEqual)
