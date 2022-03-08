import PropTypes from 'prop-types'
import React, {useEffect, useState, useCallback} from 'react'
import {rest} from 'tocco-app-extensions'
import DocsBrowserApp from 'tocco-docs-browser/src/main'

const DocsView = ({entityName, entityKey, showActions, noLeftPadding, openResource}) => {
  const [folderKey, setFolderKey] = useState(null)

  const fetchFolder = useCallback(async () => {
    rest.simpleRequest('entities/2.0/' + entityName + '/' + entityKey + '/entitydocs/folder').then(res => {
      setFolderKey(res.body.key)
    })
  }, [entityName, entityKey])

  useEffect(() => {
    fetchFolder()
  }, [fetchFolder])

  return (
    folderKey && (
      <DocsBrowserApp
        routerType="routerless"
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
        {...(showActions === false ? {selectionStyle: 'none'} : {})}
        disableViewPersistor={true}
        {...(openResource ? {openResource} : {})}
        scrollBehaviour="inline"
      />
    )
  )
}

DocsView.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired,
  noLeftPadding: PropTypes.bool,
  openResource: PropTypes.func
}

export default DocsView
