import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {injectIntl, intlShape} from 'react-intl'

import getNode from '../../../utils/getNode'
import getDetailFormName from '../../../utils/getDetailFormName'

const CreateFolder = ({context, onSuccess, intl, locale, emitAction}) => {
  const emitActionBarrier = action => {
    if (action.payload && action.payload.title !== 'client.entity-detail.createSuccessfulTitle') {
      emitAction(action)
    }
  }

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
      title: intl.formatMessage({id: 'client.docs-browser.createFolderSuccessful'}),
      remoteEvents
    })
  }

  const parent = getNode(context.history.location.pathname)
  const defaultValues = parent
    ? [
        {id: `rel${parent.model}`, value: parent.key}
      ]
    : []

  const formName = getDetailFormName(context, 'Folder')

  return <EntityDetailApp
    entityName="Folder"
    formName={formName}
    mode="create"
    defaultValues={defaultValues}
    locale={locale}
    onEntityCreated={handleEntityCreated}
    emitAction={emitActionBarrier}
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
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}

export default injectIntl(CreateFolder)
