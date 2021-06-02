import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {selection} from 'tocco-util'

const EditAction = ({selection, onSuccess, onCancel, intl, context, emitAction}) => {
  const [entityName, entityKey] = selection.ids[0].split('/')

  if (entityName === 'Resource') {
    context.history.push(`/docs/doc/${entityKey}/detail`)
    onCancel()
  }

  const handleEntityUpdated = () => {
    const remoteEvents = [{
      type: 'entity-update-event',
      payload: {
        entities: [{
          entityName: 'Docs_list_item',
          key: selection.ids[0]
        }]
      }
    }]

    onSuccess({
      message: null,
      remoteEvents
    })
  }

  return <EntityDetailApp
    entityName={entityName}
    formName={`Dms${entityName}`}
    entityId={entityKey}
    mode="update"
    onEntityUpdated={handleEntityUpdated}
    emitAction={emitAction}
  />
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
  intl: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default injectIntl(EditAction)
