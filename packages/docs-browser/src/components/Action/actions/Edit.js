import PropTypes from 'prop-types'
import React from 'react'
import {selection} from 'tocco-app-extensions'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import getDetailFormName from '../../../utils/getDetailFormName'

const EditAction = ({selection, onSuccess, onCancel, locale, context, emitAction}) => {
  const isActionBlocked = action => action.payload?.toaster?.title === 'client.entity-detail.createSuccessfulTitle'

  const emitActionBarrier = action => {
    if (!isActionBlocked(action)) {
      emitAction(action)
    }
  }

  const [entityName, entityKey] = selection.ids[0].split('/')

  if (entityName === 'Resource') {
    context.history.push(`/docs/doc/${entityKey}/detail`)
    onCancel()
  }

  const handleEntityUpdated = () => {
    const remoteEvents = [
      {
        type: 'entity-update-event',
        payload: {
          entities: [
            {
              entityName: 'Docs_list_item',
              key: selection.ids[0]
            }
          ]
        }
      }
    ]

    onSuccess({
      title: null,
      remoteEvents
    })
  }

  const handleEntityDeleted = () => {
    const remoteEvents = [
      {
        type: 'entity-delete-event',
        payload: {
          entities: [
            {
              entityName: 'Docs_list_item',
              key: selection.ids[0]
            }
          ]
        }
      }
    ]

    onSuccess({
      title: null,
      remoteEvents
    })
  }

  const formName = getDetailFormName(context, entityName)

  return (
    <EntityDetailApp
      entityName={entityName}
      formName={formName}
      entityId={entityKey}
      mode="update"
      locale={locale}
      onEntityUpdated={handleEntityUpdated}
      onEntityDeleted={handleEntityDeleted}
      emitAction={emitActionBarrier}
    />
  )
}

EditAction.propTypes = {
  selection: selection.propType,
  context: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}

export default EditAction
