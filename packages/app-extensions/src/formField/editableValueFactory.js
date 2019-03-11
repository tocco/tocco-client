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
  (formField, modelField, formName, props, events, utils) => {
    const options = getOptions(type, formField, modelField, utils, formName)

    // TODO: Refactor to function
    if (type === 'location') {
      props.value = {
        city: 'Weinfelden',
        zipcode: '8570'
      } // = utils.valueprovider('address_')

      props.onChange = locationObject => {
        for (const key in locationObject) {
          utils.changeFieldValue(key, locationObject[key])
        }
      }
    }

    if (type === 'location') {
      const locationMapping = formField.locationMapping
      props.onChange = locationObject => {
        const locationChangeObject = {
          [locationMapping.postcode]: locationObject.plz,
          [locationMapping.location]: locationObject.city,
          [locationMapping.district]: locationObject.district,
          [locationMapping.state]: locationObject.canton,
          [locationMapping.country]: locationObject.country
        }

        for (const key in locationChangeObject) {
          utils.changeFieldValue(key, locationChangeObject[key])
        }
      }
    }

    return <EditableValue type={type} events={events} {...props} options={options}/>
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
      if (utils.intl) {
        options.deleteLabel = utils.intl.formatMessage({id: 'client.component.location.deleteLabel'})
      }
      options.fetchSuggestions = searchTerm => utils.loadLocationsSuggestions(formField.id, searchTerm)
      options.isLoading = _get(utils.locationSuggestions, [formField.id, 'isLoading'], false)
      options.suggestions = _get(utils.locationSuggestions, [formField.id, 'suggestions'], null)
  }

  return options
}
