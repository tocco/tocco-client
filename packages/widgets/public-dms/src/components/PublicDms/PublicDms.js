import PropTypes from 'prop-types'
import DocsBrowserApp from 'tocco-docs-browser/src/main'
import {appContext as appContextPropType} from 'tocco-util'

const PublicDms = ({listLimit, backendUrl, businessUnit, folderKeys, appContext}) => {
  const getListFormName = (parent, keys) => {
    if (parent !== null) {
      return 'DmsPublic_docs_list_item'
    } else if (keys !== null) {
      return 'DmsPublic_root_docs_list_item_specific'
    } else {
      return 'DmsPublic_root_docs_list_item'
    }
  }

  const rootNodes = folderKeys ? folderKeys.map(key => ({key, entityName: 'Folder'})) : undefined

  return (
    <DocsBrowserApp
      searchFormType="none"
      embedded={true}
      documentDetailFormName="DmsPublicResource"
      domainDetailFormName="DmsPublicDomain"
      folderDetailFormName="DmsPublicFolder"
      getListFormName={getListFormName}
      scrollBehaviour="none"
      sortable={false}
      listLimit={listLimit}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      rootNodes={rootNodes}
    />
  )
}

PublicDms.propTypes = {
  listLimit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  folderKeys: PropTypes.arrayOf(PropTypes.string),
  appContext: appContextPropType.propTypes.isRequired
}

export default PublicDms
