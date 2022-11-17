import PropTypes from 'prop-types'
import {selection as selectionPropType} from 'tocco-app-extensions'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import EntityListApp from 'tocco-entity-list/src/main'

import DocsBrowserApp from '../../../main'
import getDetailFormName from '../../../utils/getDetailFormName'
import {withRouterTypeCompProvider} from '../../../utils/withRouterTypeCompProvider'

const EditAction = ({selection, onSuccess, onCancel, locale, context, emitAction, navigate}) => {
  const isActionBlocked = action => action.payload?.toaster?.title === 'client.entity-detail.createSuccessfulTitle'

  const emitActionBarrier = action => {
    if (!isActionBlocked(action)) {
      emitAction(action)
    }
  }

  const [entityName, entityKey] = selection.ids[0].split('/')

  if (entityName === 'Resource') {
    navigate(`/docs/doc/${entityKey}/detail`)
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
      listApp={EntityListApp}
      docsApp={DocsBrowserApp}
    />
  )
}

EditAction.propTypes = {
  selection: selectionPropType.propType,
  context: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}

export default withRouterTypeCompProvider(EditAction)
