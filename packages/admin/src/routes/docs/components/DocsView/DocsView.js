import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'
import {Icon} from 'tocco-ui'
import {put} from 'redux-saga/effects'

import Action from '../Action'
import FileInput from '../FileInput'

const ICONS = {
  Domain: 'globe',
  Folder: 'folder',
  Resource: 'file'
}

const getParent = match => {
  if (match.params && match.params.model) {
    const model = match.params.model.charAt(0).toUpperCase() + match.params.model.slice(1)
    const key = match.params.key
    const fullKey = `${model}/${key}`
    return {
      model: 'Docs_list_item',
      key: fullKey // e.g. "Domain/118"
    }
  }
  return null
}

const DocsView = props => {
  const {storeKey, history, match, onSearchChange, emitAction, openFileDialog} = props

  const handleRowClick = ({id}) => {
    const [model, key] = id.split('/')
    let newLocation
    switch (model) {
      case 'Domain':
        newLocation = `/docs/domain/${key}/list`
        break
      case 'Folder':
        newLocation = `/docs/folder/${key}/list`
        break
      case 'Resource':
        newLocation = `/docs/doc/${key}/detail`
        break
      default:
        throw new Error(`Unexpected model: ${model}`)
    }
    history.push(newLocation)
  }

  const parent = getParent(match)

  const handleCreateDocument = function* (definition, selection, parent, params, config, onSuccess, onError) {
    yield put(openFileDialog(history.location.pathname, onSuccess, onError))
  }

  return (
    <>
      <EntityListApp
        id="documents"
        entityName="Docs_list_item"
        formName="Docs_list_item"
        limit={25}
        onRowClick={handleRowClick}
        searchFormPosition="left"
        searchFormType="admin"
        parent={parent}
        onSearchChange={onSearchChange}
        store={viewPersistor.viewInfoSelector(storeKey).store}
        onStoreCreate={store => {
          viewPersistor.persistViewInfo(storeKey, {store})
        }}
        cellRenderers={{
          'dms-label-with-icon': (rowData, column, cellRenderer) => (
            <div>
              <Icon icon={ICONS[rowData.type]} style={{marginRight: '0.5rem', verticalAlign: 'middle'}}/>
              <span style={{verticalAlign: 'middle'}}>{cellRenderer(column.children[0])}</span>
            </div>
          )
        }}
        emitAction={emitAction}
        actionAppComponent={Action}
        contextParams={{
          history
        }}
        customActions={{
          'upload-document': handleCreateDocument
        }}
      />
      <FileInput/>
    </>
  )
}

DocsView.propTypes = {
  storeKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired
}

export default DocsView
