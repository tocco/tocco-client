import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'
import {FormattedMessage} from 'react-intl'
import _groupBy from 'lodash/groupBy'

import {ManyRelationEntityCount} from '../../util/manyRelationEntityCount'
import {StyledButtonWrapper} from './StyledComponents'

const MergeSummary = ({mergeResponse, navigationStrategy, isOldClient, close, openEntityList}) => {
  const mapToEntityList = entities => Object.entries(_groupBy(entities, e => e.entityLabel))
    .map(([entityLabel, list]) => {
      const model = entities.find(e => e.entityLabel === entityLabel).entity
      const keys = list.map(e => e.pk)
      return <span key={model}>{entityLabel} <ManyRelationEntityCount
        model={model}
        keys={keys}
        totalKeys={keys.length}
        openEntityList={openEntityList}
        navigationStrategy={navigationStrategy}
        isOldClient={isOldClient}
      /></span>
    }).reduce((prev, curr) => prev === null ? [curr] : [...prev, ', ', curr], null)

  const notCopiedRelations = mapToEntityList(mergeResponse.notCopiedRelations)
  const notDeletedEntities = mapToEntityList(mergeResponse.notDeletedEntities)

  return <>
    <Typography.H3>
      <FormattedMessage id="client.merge.summary.success"/>
      {
        (mergeResponse.notCopiedRelations.length > 0 || mergeResponse.notDeletedEntities.length > 0)
        && <FormattedMessage id="client.merge.summary.successHint"/>
      }
    </Typography.H3>
    {
      mergeResponse.notCopiedRelations.length > 0
      && <Typography.P>
        <Typography.B>
          <FormattedMessage id="client.merge.summary.notCopiedRelations"/>:
        </Typography.B>
        <br/>
        {notCopiedRelations}
      </Typography.P>
    }
    {
      mergeResponse.notDeletedEntities.length > 0
      && <Typography.P>
        <Typography.B>
          <FormattedMessage id="client.merge.summary.notDeletedEntities"/>:
        </Typography.B>
        <br/>
        {notDeletedEntities}
      </Typography.P>
    }
    {
      mergeResponse.showPermissionMessage
      && <Typography.B>
        <FormattedMessage id="client.merge.summary.permission"/>
      </Typography.B>
    }
    <StyledButtonWrapper>
      <Button onClick={close} look="raised" ink="primary">
        <FormattedMessage id="client.merge.close"/>
      </Button>
    </StyledButtonWrapper>
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
  isOldClient: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openEntityList: PropTypes.func.isRequired
}

export default MergeSummary
