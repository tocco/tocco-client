import React, {useEffect} from 'react'
import {AdminLink as StyledLink, Icon} from 'tocco-ui'
import queryString from 'query-string'
import _get from 'lodash/get'
import PropTypes from 'prop-types'

import {getRelation, setRelation} from '../../utils/relationPersistor'
import {StyledRelationBox, StyledRelationLabel, StyledRelationLinks} from './StyledComponents'
import {currentViewPropType} from '../../utils/propTypes'

const RelationBox = ({
  relation,
  history,
  match,
  currentViewInfo,
  relations,
  relationsInfo,
  selectRelation,
  selectedRelation,
  intl
}) => {
  useEffect(
    () => {
      if (!selectedRelation && relations?.length > 0) {
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
    [relations, selectedRelation]
  )

  const msg = id => intl.formatMessage({id})
  const entityName = _get(currentViewInfo, 'model.name')
  const hasCreateRights = relationName => relationsInfo[relationName]?.createPermission
  const {
    relationName,
    targetEntity,
    relationDisplay
  } = relation

  const getRelationCountLabel = relationName => relationsInfo[relationName]?.count > 0
    ? <StyledRelationLabel>&nbsp;({relationsInfo[relationName].count})</StyledRelationLabel>
    : null

  const handleBoxClick = () => {
    selectRelation(relation)
    history.replace({
      search: `?relation=${relationName}`
    })
    setRelation(entityName, relationName)
  }

  return (
    <StyledRelationBox
      selected={selectedRelation?.relationName === relationName}
      onClick={handleBoxClick}
    >
      <StyledRelationLabel title={relationDisplay.label}>
        {relationDisplay.label}</StyledRelationLabel>{getRelationCountLabel(relationName)}
      <StyledRelationLinks>
        <StyledLink
          aria-label={msg('client.admin.entities.relationsView.relationLinkView')}
          to={match.url.replace(/(relations|detail)$/, relationName)}>
          <Icon icon="arrow-right"/>
        </StyledLink>
        {hasCreateRights(relationName) && targetEntity !== 'Resource'
        && <StyledLink
          aria-label={msg('client.admin.entities.relationsView.relationLinkCreate')}
          to={match.url.replace(/(relations|detail)$/, relationName) + '/create'}>
          <Icon icon="plus"/>
        </StyledLink>
        }
      </StyledRelationLinks>
    </StyledRelationBox>
  )
}

RelationBox.propTypes = {
  relation: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType,
  relations: PropTypes.array,
  relationsInfo: PropTypes.objectOf(PropTypes.shape({
    count: PropTypes.number,
    createPermission: PropTypes.bool
  })),
  intl: PropTypes.object.isRequired,
  selectRelation: PropTypes.func.isRequired,
  selectedRelation: PropTypes.object
}

export default RelationBox
