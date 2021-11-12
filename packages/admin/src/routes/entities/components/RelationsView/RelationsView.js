import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {js} from 'tocco-util'

import {
  StyledPlaceHolder,
  StyledPreviewBox,
  StyledPreviewLink,
  StyledRelationBoxes,
  StyledRelationsViewWrapper,
  StyledToggleCollapse,
  StyledToggleCollapseButton
} from './StyledComponents'
import {currentViewPropType} from '../../utils/propTypes'
import ListView from './ListView'
import DocsViewAdapter from './DocsViewAdapter'
import RelationBox from './RelationBox'

const RelationsView = props => {
  const {
    history,
    match,
    currentViewInfo,
    relations,
    relationsInfo,
    emitAction,
    intl,
    isCollapsed,
    toggleCollapse,
    selectedRelation
  }
  = props
  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  const msg = id => intl.formatMessage({id})
  const hasCreateRights = relationName => relationsInfo[relationName]?.createPermission
  const RelationPreview = selectedRelation
    ? (selectedRelation.targetEntity === 'Resource' ? DocsViewAdapter : ListView)
    : () => <React.Fragment/>

  const RelationBoxes = relations.map(relation =>
    <RelationBox
      key={`relation-${relation.relationName}`}
      relation={relation}
      {...props}
    />
  )

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
