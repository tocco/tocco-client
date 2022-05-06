import PropTypes from 'prop-types'
import {useMemo} from 'react'
import {formData, field} from 'tocco-app-extensions'
import {Typography} from 'tocco-ui'
import {js} from 'tocco-util'

import LazyDataEnhancer from '../components/LazyDataEnhancer'
import {StyledSpan} from './StyledComponents'

export const MultiSeparator = () => <Typography.Span>, </Typography.Span>

const multiTypes = ['multi-select-box', 'multi-remote-field']

export default (fieldDefinition, entity, intl) => {
  const {id, path, dataType} = fieldDefinition
  const isMultiType = multiTypes.includes(dataType)
  const pathValue = entity[path]
  const values = !isMultiType && Array.isArray(pathValue) ? pathValue : [pathValue]

  const config = field.formattedTypeConfigs[dataType]
  const dataContainerProps =
    config && config.dataContainerProps ? config.dataContainerProps({formField: fieldDefinition}) : {}

  const formDataContainer = values
    .map((v, idx) => (
      <formData.FormDataContainer
        key={`formDataContainer-${entity.__key}-${path}-${idx}`}
        {...dataContainerProps}
        navigationStrategy={true}
      >
        <FormattedValueWrapper type={dataType} value={v} intl={intl} formField={fieldDefinition} />
      </formData.FormDataContainer>
    ))
    .reduce((acc, curr, idx) => [...acc, ...(acc.length > 0 ? [<MultiSeparator key={`sep${idx}`} />] : []), curr], [])

  return <StyledSpan key={id}>{formDataContainer}</StyledSpan>
}

const FormattedValueWrapper = ({value, type, formData, formField}) => {
  const modelField = {
    targetEntity: value && js.getOrFirst(value).model
  }

  const Field = useMemo(() => field.factory('list', type), [type])

  return (
    <LazyDataEnhancer value={value} type={type}>
      <Field
        type={type}
        formField={formField}
        modelField={modelField}
        value={value}
        formData={formData}
        breakWords={false}
      />
    </LazyDataEnhancer>
  )
}

FormattedValueWrapper.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    navigationStrategy: PropTypes.object
  }),
  intl: PropTypes.object.isRequired,
  formField: PropTypes.object.isRequired
}
