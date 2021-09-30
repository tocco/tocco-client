import React, {useEffect, useState} from 'react'
import DocsBrowserApp from 'tocco-docs-browser/src/main'
import {rest} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

const DocsView = ({entityName, entityKey, showActions, noLeftPadding, openResource}) => {
  const [folderKey, setFolderKey] = useState(null)

  const fetchFolder = async() => {
    rest.simpleRequest('entities/2.0/' + entityName + '/' + entityKey + '/entitydocs/folder')
      .then(res => {
        setFolderKey(res.body.key)
      })
  }

  useEffect(() => {
    fetchFolder()
  }, [])

  return folderKey
    && <DocsBrowserApp
      noLeftPadding={noLeftPadding}
      sortable={false}
      searchFormType="none"
      rootNodes={[
        {
          key: folderKey,
          entityName: 'Folder'
        }
      ]}
      embedded={true}
      showActions={showActions}
      {...showActions === false ? {selectionStyle: 'none'} : {}}
      disableViewPersistor={true}
      {...openResource ? {openResource} : {}}
    />
}

DocsView.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired,
  noLeftPadding: PropTypes.bool,
  openResource: PropTypes.func
}

export default DocsView
