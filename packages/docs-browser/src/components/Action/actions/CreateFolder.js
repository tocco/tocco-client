import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import getDetailFormName from '../../../utils/getDetailFormName'
import getNode from '../../../utils/getNode'

const CreateFolder = ({context, onSuccess, intl, emitAction}) => {
  const isActionBlocked = action => action.payload?.toaster?.title === 'client.entity-detail.createSuccessfulTitle'

  const emitActionBarrier = action => {
    if (!isActionBlocked(action)) {
      emitAction(action)
    }
  }

  const handleEntityCreated = ({id}) => {
    const remoteEvents = [
      {
        type: 'entity-create-event',
        payload: {
          entities: [
            {
              entityName: 'Docs_list_item',
              key: `Folder/${id}`
            }
          ]
        }
      }
    ]

    onSuccess({
      title: intl.formatMessage({id: 'client.docs-browser.createFolderSuccessful'}),
      remoteEvents
    })
  }

  const parent = getNode(context.history.location.pathname)
  const defaultValues = parent ? [{id: `rel${parent.model}`, value: parent.key}] : []

  const formName = getDetailFormName(context, 'Folder')

  return (
    <EntityDetailApp
      entityName="Folder"
      formName={formName}
      mode="create"
      defaultValues={defaultValues}
      onEntityCreated={handleEntityCreated}
      emitAction={emitActionBarrier}
    />
  )
}

CreateFolder.propTypes = {
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

export default injectIntl(CreateFolder)
