import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {useCallback, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Icon, Typography} from 'tocco-ui'
import {js} from 'tocco-util'

import {currentViewPropType} from '../../utils/propTypes'
import {getRelation} from '../../utils/relationPersistor'
import DocsViewAdapter from './DocsViewAdapter'
import ListView from './ListView'
import RelationBox from './RelationBox'
import {
  StyledPlaceHolder,
  StyledPreviewBox,
  StyledPreviewLink,
  StyledRelationBoxes,
  StyledRelationsViewWrapper,
  StyledToggleCollapse,
  StyledToggleCollapseButton
} from './StyledComponents'

const RelationsView = props => {
  const {
    currentViewInfo,
    relations,
    relationsInfo,
    emitAction,
    intl,
    isRightPaneCollapsed,
    toggleCollapse,
    selectedRelation,
    selectRelation
  } = props
  const entityName = _get(currentViewInfo, 'model.name')
  const [searchParams] = useSearchParams()
  const queryRelation = searchParams.get('relation')

  const updateSelectedRelation = useCallback(() => {
    if (relations?.length > 0) {
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
  }, [relations, entityName, queryRelation, selectRelation])

  useEffect(updateSelectedRelation, [updateSelectedRelation])
  useEffect(() => (!selectedRelation ? updateSelectedRelation() : null), [selectedRelation, updateSelectedRelation])

  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  const msg = id => intl.formatMessage({id})
  const hasCreateRights = relationName => relationsInfo[relationName]?.createPermission

  const getRelationPreview = () => {
    if (selectedRelation) {
      return selectedRelation.targetEntity === 'Resource' ? DocsViewAdapter : ListView
    }

    return () => <React.Fragment />
  }
  const RelationPreview = getRelationPreview()

  const RelationBoxes = relations.map(relation => (
    <RelationBox key={`relation-${relation.relationName}`} relation={relation} entityName={entityName} {...props} />
  ))

  return (
    <>
      <StyledRelationsViewWrapper isRightPaneCollapsed={isRightPaneCollapsed}>
        <StyledToggleCollapse>
          <StyledToggleCollapseButton icon="chevron-right" onClick={toggleCollapse} />
        </StyledToggleCollapse>
        <StyledRelationBoxes>{RelationBoxes}</StyledRelationBoxes>
        {selectedRelation && (
          <StyledPreviewBox>
            <Typography.H4>
              {selectedRelation.relationDisplay.label}
              <StyledPreviewLink
                aria-label={msg('client.admin.entities.relationsView.relationLinkView')}
                to={`../${selectedRelation.relationName}`}
                // to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName)}
              >
                <Icon icon="arrow-right" />
              </StyledPreviewLink>
              {hasCreateRights(selectedRelation.relationName) && selectedRelation.targetEntity !== 'Resource' && (
                <StyledPreviewLink
                  aria-label={msg('client.admin.entities.relationsView.relationLinkCreate')}
                  to={`../${selectedRelation.relationName}/create`}
                  // to={match.url.replace(/(relations|detail)$/, selectedRelation.relationName) + '/create'}
                >
                  <Icon icon="plus" />
                </StyledPreviewLink>
              )}
            </Typography.H4>
            <RelationPreview
              selectedRelation={selectedRelation}
              currentViewInfo={currentViewInfo}
              emitAction={emitAction}
              sortable={true}
            />
          </StyledPreviewBox>
        )}
      </StyledRelationsViewWrapper>
      <StyledPlaceHolder onClick={toggleCollapse} isRightPaneCollapsed={isRightPaneCollapsed}>
        <StyledToggleCollapseButton icon={'chevron-left'} isRightPaneCollapsed={isRightPaneCollapsed} />
      </StyledPlaceHolder>
    </>
  )
}

RelationsView.propTypes = {
  currentViewInfo: currentViewPropType,
  relations: PropTypes.array,
  relationsInfo: PropTypes.objectOf(
    PropTypes.shape({
      count: PropTypes.number,
      createPermission: PropTypes.bool
    })
  ),
  emitAction: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isRightPaneCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  selectRelation: PropTypes.func.isRequired,
  selectedRelation: PropTypes.object
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(RelationsView, areEqual)
