import React, {useEffect, useState} from 'react'
import DocsBrowserApp from 'tocco-docs-browser/src/main'
import {rest} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

const DocsView = ({entityName, entityKey, showActions}) => {
  const [folderKey, setFolderKey] = useState(null)

  const fetchFolder = async() => {
    rest.simpleRequest('/entities/2.0/' + entityName + '/' + entityKey + '/entitydocs/folder')
      .then(res => {
        setFolderKey(res.body.key)
      })
  }

  useEffect(() => {
    fetchFolder()
  }, [])
    
  return folderKey
    && <DocsBrowserApp
        searchFormType="none"
        rootNodes={[
          {key: folderKey, entityName: 'Folder'}
        ]}
        embedded={true}
        showActions={showActions}
        {...showActions === false ? {selectionStyle: 'none'} : {}}
        disableViewPersistor={true}
      />
}

DocsView.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired
}

export default DocsView
