import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {AdminLink as StyledLink, Icon, Typography} from 'tocco-ui'
import {js} from 'tocco-util'
import queryString from 'query-string'
import _get from 'lodash/get'

import {
  RelationBox,
  RelationLabel,
  RelationLinks,
  StyledPreviewBox,
  StyledRelationBox,
  StyledRelationsViewWrapper,
  StyledPreviewLink
} from './StyledComponents'
import {currentViewPropType} from '../../utils/propTypes'
import {getRelation, setRelation} from '../../utils/relationPersistor'
import ListView from './ListView'
import DocsViewAdapter from './DocsViewAdapter'

const RelationsView = ({
  history,
  match,
  currentViewInfo,
  relations,
  relationsInfo,
  emitAction,
  intl
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

  const msg = id => intl.formatMessage({id})

  const getRelationCountLabel = relationName => relationsInfo[relationName] && relationsInfo[relationName].count > 0
    ? <RelationLabel>&nbsp;({relationsInfo[relationName].count})</RelationLabel>
    : null

  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  const hasCreateRights = relationName => relationsInfo[relationName] && relationsInfo[relationName].createPermission

  const RelationPreview = selectedRelation
    ? (selectedRelation.targetEntity === 'Resource' ? DocsViewAdapter : ListView)
    : () => <React.Fragment/>

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
              <StyledLink
                aria-label={msg('client.admin.entities.relationsView.relationLinkView')}
                to={match.url.replace(/(relations|detail)$/, relation.relationName)}>
                <Icon icon="arrow-right"/>
              </StyledLink>
              {hasCreateRights(relation.relationName) && relation.targetEntity !== 'Resource'
                && <StyledLink
                  aria-label={msg('client.admin.entities.relationsView.relationLinkCreate')}
                  to={match.url.replace(/(relations|detail)$/, relation.relationName) + '/create'}>
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
            <StyledPreviewLink
              aria-label={msg('client.admin.entities.relationsView.relationLinkView')}
              to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName)}>
              <Icon icon="arrow-right"/>
            </StyledPreviewLink>
            {hasCreateRights(selectedRelation.relationName) && selectedRelation.targetEntity !== 'Resource'
              && <StyledPreviewLink
                aria-label={msg('client.admin.entities.relationsView.relationLinkCreate')}
                to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName) + '/create'}>
                <Icon icon="plus"/>
              </StyledPreviewLink>
            }
          </Typography.H4>
          <RelationPreview
            selectedRelation={selectedRelation}
            match={match}
            history={history}
            currentViewInfo={currentViewInfo}
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
  emitAction: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(RelationsView, areEqual)
