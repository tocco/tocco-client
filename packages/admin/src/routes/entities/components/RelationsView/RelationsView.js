import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {js} from 'tocco-util'
import EntityListApp from 'tocco-entity-list/src/main'
import queryString from 'query-string'

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

const RelationsView = ({
  history,
  match,
  currentViewInfo,
  relations,
  relationsInfo,
  persistViewInfo,
  persistedViewInfo
}) => {
  const [selectedRelation, selectRelation] = useState(null)

  useEffect(
    () => {
      if (relations && relations.length > 0) {
        const queryRelation = queryString.parse(history.location.search).relation
        if (queryRelation) {
          selectRelation(relations.find(r => r.relationName === queryRelation))
        } else if (persistedViewInfo.selectedRelation) {
          selectRelation(relations.find(r => r.relationName === persistedViewInfo.selectedRelation))
        } else {
          selectRelation(relations[0])
        }
      }
    },
    [relations]
  )

  const getRelationCountLabel = relationName => relationsInfo[relationName] && relationsInfo[relationName].count > 0
    ? <RelationLabel>&nbsp;({relationsInfo[relationName].count})</RelationLabel> : null

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
              persistViewInfo(
                currentViewInfo.location,
                currentViewInfo.level,
                {selectedRelation: relation.relationName}
              )
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
            model: currentViewInfo.model.name
          }}
          showLink={true}
          linkFactory={{
            detail: (entity, relation, key, children) =>
              entity
                ? <StyledLink to={`/e/${entity}/${key}`} target="_blank">{children}</StyledLink>
                : <StyledLink to={selectedRelation.relationName + '/' + key}>{children}</StyledLink>
          }}
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
          store={persistedViewInfo[`store-${selectedRelation.relationName}`]}
          onStoreCreate={store => {
            persistViewInfo(
              currentViewInfo.location,
              currentViewInfo.level,
              {[`store-${selectedRelation.relationName}`]: store}
            )
          }}
          showActions={false}
          limit={15}
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
  persistedViewInfo: PropTypes.shape({
    selectedRelation: PropTypes.string
  }),
  persistViewInfo: PropTypes.func.isRequired
}

const updateIgnoreProps = ['persistedViewInfo']

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps)).filter(key => !updateIgnoreProps.includes(key))
  return diff.length === 0
}

export default React.memo(RelationsView, areEqual)
