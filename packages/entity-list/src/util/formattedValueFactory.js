import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue, Typography} from 'tocco-ui'
import {formData} from 'tocco-app-extensions'
import {intlShape} from 'react-intl'
import {js} from 'tocco-util'

import LazyDataEnhancer from '../components/LazyDataEnhancer'

const listMapping = {
  'binary': 'document-compact',
  'display': 'html',
  'document': 'document-compact',
  'image': 'document-compact',
  'multi-remote-field': 'multi-remote',
  'single-remote-field': 'remote',
  'single-select-box': 'single-select',
  'multi-select-box': 'multi-select'
}

const getOptions = (type, value, intl, formData) => {
  const getModel = () => js.getOrFirst(value).model

  switch (type) {
    case 'document-compact':
      return {
        downloadTitle: intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      }
    case 'multi-remote':
    case 'remote':
      return {
        ...(formData.linkFactory && formData.linkFactory.detail
          && {linkFactory: (key, children) => formData.linkFactory.detail(getModel(), null, key, children)})
      }
  }

  return null
}

export const MultiSeparator = () => (<Typography.Span>, </Typography.Span>)

const multiTypes = ['multi-select', 'multi-remote']

export default (fieldDefinition, entity, intl) => {
  const {id, path, dataType} = fieldDefinition
  const type = listMapping[dataType] ? listMapping[dataType] : dataType
  const isMultiType = multiTypes.includes(type)
  const pathValue = entity[path]
  const values = !isMultiType && Array.isArray(pathValue) ? pathValue : [pathValue]

  return <span key={id} style={{marginRight: '2px'}} onClick={e => e.stopPropagation()}>
    {values.map((v, idx) => {
      return <formData.FormDataContainer key={idx} linkFactory={true}>
        <FormattedValueWrapper type={type} value={v} intl={intl}/>
      </formData.FormDataContainer>
    }).reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])
    }
  </span>
}

const FormattedValueWrapper = ({value, type, formData, intl}) =>
  <LazyDataEnhancer value={value} type={type}>
    <FormattedValue
      type={type}
      options={getOptions(type, value, intl, formData)}
      value={value}
    />
  </LazyDataEnhancer>

FormattedValueWrapper.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    linkFactory: PropTypes.object
  }),
  intl: intlShape.isRequired
}
