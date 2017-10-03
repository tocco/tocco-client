import React from 'react'
import {EditableValue} from 'tocco-ui'
import _get from 'lodash/get'
import _mergeWith from 'lodash/mergeWith'

export default type =>
  (formField, modelField, props, events, utils) => {
    const options = getOptions(type, formField, modelField, utils)
    const editableValueEvents = getEvents(type, formField, modelField, utils)
    const mergedEvents = mergeEvents(events, editableValueEvents)

    return <EditableValue type={type} events={mergedEvents} {...props} options={options}/>
  }

const getOptions = (type, formField, modelField, utils) => {
  const options = {}

  switch (type) {
    case 'single-select':
    case 'multi-select':
      if (utils.relationEntities) {
        const fieldStore = utils.relationEntities[modelField.targetEntity]
        options.store = fieldStore ? fieldStore.data : []
      }
      break
    case 'remote':
    case 'multi-remote':
      options.options = _get(utils, 'remoteEntities.' + formField.name + '.entities', [])
      options.moreOptionsAvailable = _get(utils, 'remoteEntities.' + formField.name + '.moreOptionsAvailable', false)
      options.isLoading = _get(utils, 'remoteEntities.' + formField.name + '.loading', false)

      options.fetchOptions = searchTerm => utils.loadRemoteEntity(formField.name, modelField.targetEntity, searchTerm)

      if (utils.intl) {
        options.searchPromptText = utils.intl.formatMessage({id: 'client.component.remoteselect.searchPromptText'})
        options.clearValueText = utils.intl.formatMessage({id: 'client.component.remoteselect.clearValueText'})
        options.clearAllText = utils.intl.formatMessage({id: 'client.component.remoteselect.clearAllText'})
        options.moreOptionsAvailableText = utils.intl.formatMessage(
          {id: 'client.component.remoteselect.moreOptionsAvailableText'})
      }
      break
    case 'document':
      options.field = formField.name
      options.upload = utils.uploadDocument
      options.uploadText = utils.intl.formatMessage({id: 'client.component.upload.upload'})
      options.uploadingText = utils.intl.formatMessage({id: 'client.component.upload.uploading'})
      options.downloadText = utils.intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      options.deleteText = utils.intl.formatMessage({id: 'client.component.upload.deleteTitle'})
  }

  return options
}

const getEvents = (type, field, modelField, util) => {
  const events = {}

  switch (type) {
    case 'single-select':
    case 'multi-select':
      if (util.loadRelationEntity) {
        events.onFocus = () => {
          util.loadRelationEntity(modelField.targetEntity)
        }
      }
      break
    case 'remote':
    case 'multi-remote':
      if (util.loadRemoteEntity) {
        events.onFocus = () => {
          util.loadRemoteEntity(field.name, modelField.targetEntity, '')
        }
      }
  }

  return events
}

const mergeEvents = (eventObject1, eventObject2) => (
  _mergeWith(eventObject1, eventObject2, (event1, event2) =>
    () => {
      if (event1) event1()
      if (event2) event2()
    }
  ))
