import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {injectIntl, intlShape} from 'react-intl'

import getNode from '../../../utils/getNode'

const CreateFolder = ({context, onSuccess, intl}) => {
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
      message: intl.formatMessage({id: 'client.admin.docs.createFolderSuccessful'}),
      remoteEvents
    })
  }

  const parent = getNode(context.history.location.pathname)
  const defaultValues = parent ? [
    {id: `rel${parent.model}`, value: parent.key}
  ] : []

  return <EntityDetailApp
    entityName="Folder"
    formName="Folder"
    mode="create"
    defaultValues={defaultValues}
    onEntityCreated={handleEntityCreated}
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
  intl: intlShape.isRequired
}

export default injectIntl(CreateFolder)
