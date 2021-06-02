import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {injectIntl} from 'react-intl'

import getNode from '../../../utils/getNode'

const CreateFolder = ({context, onSuccess, intl, emitAction}) => {
  const handleEntityCreated = ({id}) => {
    const remoteEvents = [{
      type: 'entity-create-event',
      payload: {
        entities: [{
          entityName: 'Docs_list_item',
          key: `Folder/${id}`
        }]
      }
    }]

    onSuccess({
      message: intl.formatMessage({id: 'client.docs-browser.createFolderSuccessful'}),
      remoteEvents
    })
  }

  const parent = getNode(context.history.location.pathname)
  const defaultValues = parent
    ? [
        {id: `rel${parent.model}`, value: parent.key}
      ]
    : []

  return <EntityDetailApp
    entityName="Folder"
    formName="Folder"
    mode="create"
    defaultValues={defaultValues}
    onEntityCreated={handleEntityCreated}
    emitAction={emitAction}
  />
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
