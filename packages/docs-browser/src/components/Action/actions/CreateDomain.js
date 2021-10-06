import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {injectIntl} from 'react-intl'

import getNode from '../../../utils/getNode'
import getDetailFormName from '../../../utils/getDetailFormName'

const CreateDomain = ({context, onSuccess, intl, emitAction}) => {
  const emitActionBarrier = action => {
    if (action.payload && action.payload.toaster
      && action.payload.toaster.title !== 'client.entity-detail.createSuccessfulTitle') {
      emitAction(action)
    }
  }

  const handleEntityCreated = ({id}) => {
    const remoteEvents = [{
      type: 'entity-create-event',
      payload: {
        entities: [{
          entityName: 'Docs_list_item',
          key: `Domain/${id}`
        }]
      }
    }]

    onSuccess({
      message: intl.formatMessage({id: 'client.docs-browser.createDomainSuccessful'}),
      remoteEvents
    })
  }

  const parent = getNode(context.history.location.pathname)
  const defaultValues = parent
    ? [
        {id: `rel${parent.model}`, value: parent.key}
      ]
    : []

  const formName = getDetailFormName(context, 'Domain')

  return <EntityDetailApp
    entityName="Domain"
    formName={formName}
    mode="create"
    defaultValues={defaultValues}
    onEntityCreated={handleEntityCreated}
    emitAction={emitActionBarrier}
  />
}

CreateDomain.propTypes = {
  context: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default injectIntl(CreateDomain)
