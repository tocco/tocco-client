import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'
import {FormattedMessage} from 'react-intl'
import _groupBy from 'lodash/groupBy'

import {ManyRelationEntityCount} from '../../util/manyRelationEntityCount'
import {
  StyledSummarySuccessWrapper,
  StyledResultsWrapper,
  StyledIconWrapper,
  StyledMessageWrapper
} from './StyledComponents'
import {StyledButtonWrapper, StyledButton} from '../GlobalStyledComponents'

const MergeSummary = ({mergeResponse, navigationStrategy, close}) => {
  const mapToEntityList = entities => Object.entries(_groupBy(entities, e => e.entityLabel))
    .map(([entityLabel, list]) => {
      const model = entities.find(e => e.entityLabel === entityLabel).entity
      const keys = list.map(e => e.pk)
      return <span key={model}>{entityLabel} <ManyRelationEntityCount
        model={model}
        keys={keys}
        totalKeys={keys.length}
        navigationStrategy={navigationStrategy}
      /></span>
    }).reduce((prev, curr) => prev === null ? [curr] : [...prev, ', ', curr], null)

  const notCopiedRelations = mapToEntityList(mergeResponse.notCopiedRelations)
  const notDeletedEntities = mapToEntityList(mergeResponse.notDeletedEntities)

  return <>
    <StyledButtonWrapper>
      <StyledButton onClick={close} look="raised" ink="primary">
        <FormattedMessage id="client.merge.close"/>
      </StyledButton>
    </StyledButtonWrapper>
    <StyledResultsWrapper>
    <StyledSummarySuccessWrapper>
      <StyledIconWrapper>
        <Icon icon={'check'}/>
      </StyledIconWrapper>
      <Typography.P>
        <FormattedMessage id="client.merge.summary.success"/>
        {
          (mergeResponse.notCopiedRelations.length > 0 || mergeResponse.notDeletedEntities.length > 0)
          && <FormattedMessage id="client.merge.summary.successHint"/>
        }
      </Typography.P>
    </StyledSummarySuccessWrapper>
    {
      mergeResponse.notCopiedRelations.length > 0
      && <StyledMessageWrapper>
        <Typography.P>
          <FormattedMessage id="client.merge.summary.notCopiedRelations"/>:
        </Typography.P>
        <Typography.B>
          {notCopiedRelations}
        </Typography.B>
      </StyledMessageWrapper>
    }
    {
      mergeResponse.notDeletedEntities.length > 0
      && <StyledMessageWrapper>
        <Typography.P>
          <FormattedMessage id="client.merge.summary.notDeletedEntities"/>:
        </Typography.P>
        <Typography.B>
          {notDeletedEntities}
        </Typography.B>
      </StyledMessageWrapper>
    }
    {
      mergeResponse.showPermissionMessage
      && <Typography.P>
        <FormattedMessage id="client.merge.summary.permission"/>
      </Typography.P>
    }
    </StyledResultsWrapper>
  </>
}

const entityWarningPropType = PropTypes.shape({
  pk: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  entityLabel: PropTypes.string.isRequired
})

MergeSummary.propTypes = {
  mergeResponse: PropTypes.shape({
    notCopiedRelations: PropTypes.arrayOf(entityWarningPropType),
    notDeletedEntities: PropTypes.arrayOf(entityWarningPropType),
    showPermissionMessage: PropTypes.bool.isRequired
  }),
  navigationStrategy: navigationStrategy.propTypes,
  close: PropTypes.func.isRequired
}

export default MergeSummary
