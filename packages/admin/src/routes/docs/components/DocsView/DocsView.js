import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'

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
  const {storeKey, history, match, onSearchChange} = props

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

  return (
    <EntityListApp
      id="documents"
      entityName="Docs_list_item"
      formName="Docs_list_item"
      onRowClick={handleRowClick}
      searchFormPosition="left"
      searchFormType="admin"
      parent={parent}
      onSearchChange={onSearchChange}
      store={viewPersistor.viewInfoSelector(storeKey).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(storeKey, {store})
      }}
    />
  )
}

DocsView.propTypes = {
  storeKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSearchChange: PropTypes.func.isRequired
}

export default DocsView
