import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {injectIntl, intlShape} from 'react-intl'

import getNode from '../../../utils/getNode'

const CreateDomain = ({context, onSuccess, intl}) => {
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

  return <EntityDetailApp
    entityName="Domain"
    formName="Domain"
    mode="create"
    defaultValues={defaultValues}
    onEntityCreated={handleEntityCreated}
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
  intl: intlShape.isRequired
}

export default injectIntl(CreateDomain)
