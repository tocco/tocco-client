import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {AdminLink as StyledLink, Icon, Typography} from 'tocco-ui'
import {js} from 'tocco-util'
import queryString from 'query-string'
import _get from 'lodash/get'

import {
  StyledRelationBox,
  StyledRelationLabel,
  StyledRelationLinks,
  StyledPlaceHolder,
  StyledPreviewBox,
  StyledPreviewLink,
  StyledRelationBoxes,
  StyledRelationsViewWrapper,
  StyledToggleCollapse,
  StyledToggleCollapseButton
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
  intl,
  isCollapsed,
  toggleCollapse,
  selectRelation,
  selectedRelation
}) => {
  const entityName = _get(currentViewInfo, 'model.name')
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

  const getRelationCountLabel = relationName => relationsInfo[relationName]?.count > 0
    ? <StyledRelationLabel>&nbsp;({relationsInfo[relationName].count})</StyledRelationLabel>
    : null

  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  const hasCreateRights = relationName => relationsInfo[relationName]?.createPermission

  const RelationPreview = selectedRelation
    ? (selectedRelation.targetEntity === 'Resource' ? DocsViewAdapter : ListView)
    : () => <React.Fragment/>

  const RelationBox = relation => {
    const {
      relationName,
      targetEntity,
      relationDisplay
    } = relation
    const handleBoxClick = () => {
      selectRelation(relation)
      history.replace({
        search: `?relation=${relationName}`
      })
      setRelation(entityName, relationName)
    }

    return (
      <StyledRelationBox
        key={`relation-${relationName}`}
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

  const RelationBoxes = relations.map(relation => RelationBox(relation))

  return <>
    <StyledRelationsViewWrapper isCollapsed={isCollapsed}>
      <StyledToggleCollapse>
        <StyledToggleCollapseButton icon="chevron-right" onClick={toggleCollapse}/>
      </StyledToggleCollapse>
      <StyledRelationBoxes>
        {RelationBoxes}
      </StyledRelationBoxes>
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
    <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
      <StyledToggleCollapseButton icon={'chevron-left'} isCollapsed={isCollapsed}/>
    </StyledPlaceHolder>
  </>
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
  intl: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  selectRelation: PropTypes.func.isRequired,
  selectedRelation: PropTypes.object
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(RelationsView, areEqual)
