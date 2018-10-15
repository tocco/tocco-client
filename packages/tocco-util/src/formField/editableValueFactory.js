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
  (formField, modelField, props, events, utils) => {
    const options = getOptions(type, formField, modelField, utils)

    return <EditableValue type={type} events={events} {...props} options={options}/>
  }

const getOptions = (type, formField, modelField, utils) => {
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
        orderBy: {name: settings.REMOTE_SUGGESTION_ORDER_FIELD, direction: 'desc'},
        formBase: formField.formBase
      })

      options.searchOptions = searchTerm => utils.loadRelationEntities(formField.id, modelField.targetEntity, {
        searchTerm,
        limit: settings.REMOTE_SEARCH_RESULT_LIMIT,
        forceReload: true,
        formBase: formField.formBase
      })

      options.openAdvancedSearch = value => utils.openAdvancedSearch(formField, modelField, value)
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
      options.options = utils.searchFilters
      options.fetchOptions = () => utils.loadSearchFilters(formField.model, formField.group)

      if (utils.intl) {
        options.noResultsText = utils.intl.formatMessage({id: 'client.component.searchfilter.noResultsText'})
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
    case 'decimal':
      if (utils.intl) {
        options.intl = utils.intl
      }
      options.postPointDigits = modelField.postPointDigits
      options.maxValue = modelField.maxValue
  }

  return options
}
