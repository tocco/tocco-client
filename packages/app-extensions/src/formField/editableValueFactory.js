import React from 'react'
import {EditableValue} from 'tocco-ui'
import _get from 'lodash/get'

const settings = {
  REMOTE_SEARCH_RESULT_LIMIT: 50,
  REMOTE_SUGGESTION_LIMIT: 10,
  REMOTE_SUGGESTION_ORDER_FIELD: 'update_timestamp',
  SELECT_LIMIT: 10000
}

export default type =>
  (formField, modelField, formName, data, events, utils) => {
    const options = getOptions(type, formField, modelField, utils, formName)

    if (methodOverwriter[type]) {
      methodOverwriter[type](formField, formName, data, utils)
    }
    if (valueOverwriter[type]) {
      valueOverwriter[type](formField, formName, data, utils)
    }

    return <EditableValue type={type} events={events} {...data} options={options}/>
  }

const methodOverwriter = {
  'location': (formField, formName, data, utils) => {
    const locationMapping = formField.locationMapping || {}
    data.onChange = locationObject => {
      for (const key in locationMapping) {
        utils.changeFieldValue(formName, locationMapping[key], locationObject[key])
      }
    }
  }
}

const valueOverwriter = {
  'coordinate': (formField, formName, data) => {
    data.value = data.value.value
  },
  'location': (formField, formName, data, utils) => {
    const locationMapping = formField.locationMapping

    const filteredLocationData = utils.formValues

    let renamedLocationData = {}
    for (const locKey in locationMapping) {
      for (const filteredLocDataKey in filteredLocationData) {
        if (locationMapping[locKey] === filteredLocDataKey) {
          renamedLocationData = {...renamedLocationData, [locKey]: filteredLocationData[filteredLocDataKey]}
        }
      }
    }

    data.value = renamedLocationData
  }
}

const getOptions = (type, formField, modelField, utils, formName) => {
  const options = {}

  switch (type) {
    case 'single-select':
    case 'multi-select':
      options.options = _get(utils, ['relationEntities', formField.id, 'data'], [])
      options.isLoading = _get(utils, ['relationEntities', formField.id, 'isLoading'], false)
      options.tooltips = _get(utils.tooltips, modelField.targetEntity, null)
      options.loadTooltip = id => utils.loadTooltip(modelField.targetEntity, id)

      if (utils.intl) {
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'})
      }

      options.fetchOptions = () => utils.loadRelationEntities(formField.id, modelField.targetEntity, {
        forceReload: false,
        limit: settings.SELECT_LIMIT
      })

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
      options.searchOptions = searchTerm => utils.loadRelationEntities(formField.id, modelField.targetEntity, {
        searchTerm,
        limit: settings.REMOTE_SEARCH_RESULT_LIMIT,
        forceReload: true,
        formBase: formField.formBase
      })

      options.openAdvancedSearch = value => utils.openAdvancedSearch(formName, formField, modelField, value)
      options.tooltips = _get(utils.tooltips, modelField.targetEntity, null)
      options.loadTooltip = id => utils.loadTooltip(modelField.targetEntity, id)

      if (utils.intl) {
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'})
        options.moreOptionsAvailableText = utils.intl.formatMessage(
          {id: 'client.component.remoteselect.moreOptionsAvailableText'})
      }
      break
    case 'search-filter':
      options.isMulti = formField.multiple
      options.options = _get(utils.searchFilters, formField.model, null)
      options.fetchOptions = () => utils.loadSearchFilters(formField.model, formField.group)

      if (utils.intl) {
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.searchfilter.noResultsText'})
      }
      break
    case 'document':
      options.upload = document => {
        utils.uploadDocument(formName, formField.id, document)
        options.uploadText = utils.intl.formatMessage({id: 'client.component.upload.upload'})
      }
      options.uploadingText = utils.intl.formatMessage({id: 'client.component.upload.uploading'})
      options.downloadText = utils.intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      options.deleteText = utils.intl.formatMessage({id: 'client.component.upload.deleteTitle'})
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
      options.prePointDigits = _get(modelField, 'validation.decimalDigits.prePointDigits', null)
      options.postPointDigits = _get(modelField, 'validation.decimalDigits.postPointDigits', null)
      options.minValue = _get(modelField, 'validation.numberRange.fromIncluding', null)
      options.maxValue = _get(modelField, 'validation.numberRange.toIncluding', null)
      break
    case 'integer':
      options.prePointDigits = _get(modelField, 'validation.decimalDigits.prePointDigits', null)
      options.minValue = _get(modelField, 'validation.numberRange.fromIncluding', null)
      options.maxValue = _get(modelField, 'validation.numberRange.toIncluding', null)
      break
    case 'location':
      options.fetchSuggestions = searchTerm => utils.loadLocationsSuggestions(formField.id, searchTerm)
      options.isLoading = _get(utils, ['locations', formField.id, 'isLoading'], false)
      options.suggestions = _get(utils, ['locations', formField.id, 'suggestions'], null)
  }

  return options
}
