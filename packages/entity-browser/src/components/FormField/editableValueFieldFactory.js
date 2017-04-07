import React from 'react'
import {EditableValue} from 'tocco-ui'
import _set from 'lodash/set'
import _get from 'lodash/get'
import _mergeWith from 'lodash/mergeWith'

export default type =>
  (formField, modelField, props, events, utils) => {
    const editableValueProps = getProps(formField, modelField, utils)
    const editableValueEvents = getEvents(formField, modelField, utils)
    const mergedEvents = mergeEvents(events, editableValueEvents)

    return <EditableValue type={type} events={mergedEvents} {...props} {...editableValueProps}/>
  }

const getProps = (formField, modelField, util) => {
  const props = {}
  switch (formField.type) {
    case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
    case 'ch.tocco.nice2.model.form.components.simple.SingleSelectBox':
      if (util.relationEntities) {
        const fieldStore = util.relationEntities[modelField.targetEntity]
        _set(props, 'options.store', fieldStore ? fieldStore.data : [])
      }
      break
    case 'ch.tocco.nice2.model.form.components.simple.RemoteField':
    case 'ch.tocco.nice2.model.form.components.simple.MultiRemoteField':
      _set(props, 'options.options', _get(util, 'remoteEntities.' + formField.name + '.entities', []))
      _set(props, 'options.isLoading', _get(util, 'remoteEntities.' + formField.name + '.loading', false))
      _set(props, 'options.fetchOptions',
        searchTerm => util.loadRemoteEntity(formField.name, modelField.targetEntity, searchTerm)
      )

      if (util.intl) {
        _set(props, 'options.searchPromptText',
          util.intl.formatMessage({id: 'client.component.remoteselect.searchPromptText'})
        )

        _set(props, 'options.clearValueText',
          util.intl.formatMessage({id: 'client.component.remoteselect.clearValueText'})
        )

        _set(props, 'options.clearAllText',
          util.intl.formatMessage({id: 'client.component.remoteselect.clearAllText'})
        )
      }
      break
  }

  return props
}

const getEvents = (field, modelField, util) => {
  const events = {}

  switch (field.type) {
    case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
    case 'ch.tocco.nice2.model.form.components.simple.SingleSelectBox':
      if (util.loadRelationEntity) {
        events.onFocus = () => {
          util.loadRelationEntity(modelField.targetEntity)
        }
      }
      break
    case 'ch.tocco.nice2.model.form.components.simple.RemoteField':
    case 'ch.tocco.nice2.model.form.components.simple.MultiRemoteField':
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
