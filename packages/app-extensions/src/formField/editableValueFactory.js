import React from 'react'
import {EditableValue} from 'tocco-ui'
import _get from 'lodash/get'
import _mergeWith from 'lodash/mergeWith'

const settings = {
  REMOTE_SEARCH_RESULT_LIMIT: 50,
  REMOTE_SUGGESTION_LIMIT: 10,
  REMOTE_SUGGESTION_ORDER_FIELD: 'update_timestamp',
  SELECT_LIMIT: 10000
}

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
      options.store = _get(utils, ['relationEntities', formField.id, 'data'], [])
      options.isLoading = _get(utils, ['relationEntities', formField.id, 'isLoading'], false)
      options.tooltips = _get(utils.tooltips, modelField.targetEntity, null)
      options.loadTooltip = id => utils.loadTooltip(modelField.targetEntity, id)

      if (utils.intl) {
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'})
      }
      break
    case 'remote':
    case 'multi-remote':
      options.options = _get(utils, ['relationEntities', formField.id, 'data'], [])
      options.moreOptionsAvailable = _get(utils, ['relationEntities', formField.id, 'moreEntitiesAvailable'], false)
      options.isLoading = _get(utils, ['relationEntities', formField.id, 'isLoading'], false)

      options.fetchOptions = () => utils.loadRelationEntities(formField.id, modelField.targetEntity, {
        forceReload: true,
        limit: settings.REMOTE_SUGGESTION_LIMIT,
        sorting: [{field: settings.REMOTE_SUGGESTION_ORDER_FIELD, order: 'desc'}],
        formBase: formField.formBase
      })
      options.searchOptions = search => utils.loadRelationEntities(formField.id, modelField.targetEntity, {
        search,
        limit: settings.REMOTE_SEARCH_RESULT_LIMIT,
        forceReload: true,
        formBase: formField.formBase
      })

      options.openAdvancedSearch = value => utils.openAdvancedSearch(formField, modelField, value)
      options.tooltips = _get(utils.tooltips, modelField.targetEntity, null)
      options.loadTooltip = id => utils.loadTooltip(modelField.targetEntity, id)

      if (utils.intl) {
        options.searchPromptText = utils.intl.formatMessage({id: 'client.component.remoteselect.searchPromptText'})
        options.clearValueText = utils.intl.formatMessage({id: 'client.component.remoteselect.clearValueText'})
        options.clearAllText = utils.intl.formatMessage({id: 'client.component.remoteselect.clearAllText'})
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'})
        options.moreOptionsAvailableText = utils.intl.formatMessage(
          {id: 'client.component.remoteselect.moreOptionsAvailableText'})
      }
      break
    case 'document':
      options.field = formField.id
      options.upload = utils.uploadDocument
      options.uploadText = utils.intl.formatMessage({id: 'client.component.upload.upload'})
      options.uploadingText = utils.intl.formatMessage({id: 'client.component.upload.uploading'})
      options.downloadText = utils.intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      options.deleteText = utils.intl.formatMessage({id: 'client.component.upload.deleteTitle'})
      break
    case 'search-filter':
      options.field = formField.id
      options.model = formField.model
      options.multi = formField.multiple ? formField.multiple : false
      options.store = utils.searchFilters
      options.onChange = utils.onChange
      break
    case 'phone':
      options.customPhoneRegex = modelField.customPhoneRegex
      options.defaultCountry = modelField.defaultCountry
      break
    case 'duration':
      if (utils.intl) {
        options.hoursLabel = utils.intl.formatMessage({id: 'client.component.duration.hoursLabel'})
        options.minutesLabel = utils.intl.formatMessage({id: 'client.component.duration.minutesLabel'})
      }
      break
    case 'number':
    case 'decimal':
    case 'moneyamount':
      if (utils.intl) {
        options.intl = utils.intl
      }
      options.prePointDigits = _get(modelField, 'validation.decimalDigits.prePointDigits', null)
      options.postPointDigits = _get(modelField, 'validation.decimalDigits.postPointDigits', null)
      options.minValue = _get(modelField, 'validation.numberRange.fromIncluding', null)
      options.maxValue = _get(modelField, 'validation.numberRange.toIncluding', null)
      break
    case 'integer':
      if (utils.intl) {
        options.intl = utils.intl
      }
      options.prePointDigits = _get(modelField, 'validation.decimalDigits.prePointDigits', null)
      options.minValue = _get(modelField, 'validation.numberRange.fromIncluding', null)
      options.maxValue = _get(modelField, 'validation.numberRange.toIncluding', null)
  }

  return options
}

const getEvents = (type, field, modelField, util) => {
  const events = {}

  switch (type) {
    case 'single-select':
    case 'multi-select':
      if (util.loadRelationEntities) {
        events.onFocus = () => {
          util.loadRelationEntities(field.id, modelField.targetEntity, {
            forceReload: false,
            limit: settings.SELECT_LIMIT
          })
        }
      }
      break
    case 'search-filter':
      if (util.loadSearchFilters) {
        events.onFocus = () => {
          util.loadSearchFilters(field.model, field.group)
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
