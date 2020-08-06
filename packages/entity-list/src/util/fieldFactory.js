import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import {formData, field} from 'tocco-app-extensions'
import {intlShape} from 'react-intl'
import {js} from 'tocco-util'

import LazyDataEnhancer from '../components/LazyDataEnhancer'

export const MultiSeparator = () => (<Typography.Span>, </Typography.Span>)

const multiTypes = ['multi-select-box', 'multi-remote-field']

export default (fieldDefinition, entity, intl) => {
  const {id, path, dataType} = fieldDefinition
  const isMultiType = multiTypes.includes(dataType)
  const pathValue = entity[path]
  const values = !isMultiType && Array.isArray(pathValue) ? pathValue : [pathValue]
  return <span key={id} style={{marginRight: '2px'}} onClick={e => e.stopPropagation()}>
    {values.map((v, idx) =>
      <formData.FormDataContainer key={idx} linkFactory={true}>
        <FormattedValueWrapper type={dataType} value={v} intl={intl} formField={fieldDefinition}/>
      </formData.FormDataContainer>
    ).reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])
    }
  </span>
}

const FormattedValueWrapper = ({value, type, formData, intl, formField}) => {
  const modelField = {
    targetEntity: value && js.getOrFirst(value).model
  }

  const Field = useMemo(() => field.factory('list', type), [])

  return <LazyDataEnhancer value={value} type={type}>
    <Field
      type={type}
      formField={formField}
      modelField={modelField}
      value={value}
      formData={formData}
      breakWords={false}
    />
  </LazyDataEnhancer>
}

FormattedValueWrapper.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    linkFactory: PropTypes.object
  }),
  intl: intlShape.isRequired,
  formField: PropTypes.object.isRequired
}
