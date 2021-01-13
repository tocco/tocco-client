import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import _groupBy from 'lodash/groupBy'

const MergeSummary = ({mergeResponse, close}) => {
  const notCopiedRelations = Object.entries(_groupBy(mergeResponse.notCopiedRelations, e => e.entityLabel))
    .map(([entityLabel, list]) => `${entityLabel} (${list.length})`).join(', ')

  const notDeletedEntities = Object.entries(_groupBy(mergeResponse.notDeletedEntities, e => e.entityLabel))
    .map(([entityLabel, list]) => `${entityLabel} (${list.length})`).join(', ')

  return <>
    <Typography.P>
      <FormattedMessage id="client.merge.summary.success"/>
      {
        (mergeResponse.notCopiedRelations.length > 0 || mergeResponse.notDeletedEntities.length > 0)
        && <FormattedMessage id="client.merge.summary.successHint"/>
      }
    </Typography.P>
    {
      mergeResponse.notCopiedRelations.length > 0
      && <Typography.P>
        <FormattedMessage id="client.merge.summary.notCopiedRelations"/>:<br/>{notCopiedRelations}
      </Typography.P>
    }
    {
      mergeResponse.notDeletedEntities.length > 0
      && <Typography.P>
        <FormattedMessage id="client.merge.summary.notDeletedEntities"/>:<br/>{notDeletedEntities}
      </Typography.P>
    }
    {
      mergeResponse.showPermissionMessage
      && <Typography.P><FormattedMessage id="client.merge.summary.permission"/></Typography.P>
    }

    <Button onClick={close} look="raised" ink="primary">
      <FormattedMessage id="client.merge.close"/>
    </Button>
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
  close: PropTypes.func.isRequired
}

export default MergeSummary
