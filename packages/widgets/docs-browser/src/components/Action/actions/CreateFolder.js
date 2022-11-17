import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import EntityListApp from 'tocco-entity-list/src/main'

import DocsBrowserApp from '../../../main'
import getDetailFormName from '../../../utils/getDetailFormName'
import getNode from '../../../utils/getNode'
import {withRouterTypeCompProvider} from '../../../utils/withRouterTypeCompProvider'

const CreateFolder = ({context, path, onSuccess, intl, locale, emitAction}) => {
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

  const parent = getNode(path)
  const defaultValues = parent ? [{id: `rel${parent.model}`, value: parent.key}] : []

  const formName = getDetailFormName(context, 'Folder')

  return (
    <EntityDetailApp
      entityName="Folder"
      formName={formName}
      mode="create"
      defaultValues={defaultValues}
      locale={locale}
      onEntityCreated={handleEntityCreated}
      emitAction={emitActionBarrier}
      listApp={EntityListApp}
      docsApp={DocsBrowserApp}
    />
  )
}

CreateFolder.propTypes = {
  path: PropTypes.string.isRequired,
  context: PropTypes.shape({
    detailFormNames: PropTypes.object.isRequired
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}

export default withRouterTypeCompProvider(injectIntl(CreateFolder))
