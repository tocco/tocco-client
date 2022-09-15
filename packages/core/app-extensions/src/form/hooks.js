import _isEmpty from 'lodash/isEmpty'
import {useRef} from 'react'

import {asyncValidation} from './asyncValidation'
import syncValidation from './syncValidation'

/**
 * Returns same validation function.
 *
 * @param {Object} config
 * @returns func
 */
export const useSyncValidation = ({fieldDefinitions, formDefinition}) => {
  const validateSingletonRef = useRef(null)

  const getSyncValidation = () => {
    if (!validateSingletonRef.current && !_isEmpty(fieldDefinitions)) {
      validateSingletonRef.current = syncValidation(fieldDefinitions, formDefinition)
    }
    return validateSingletonRef.current
  }

  return getSyncValidation()
}

export const useAsyncValidation = ({formInitialValues, fieldDefinitions, formDefinition, mode}) => {
  const handleAsyncValidate = formValues =>
    asyncValidation(formValues, mode === 'create' ? {} : formInitialValues, fieldDefinitions, formDefinition, mode)

  return handleAsyncValidate
}

export const useFormEvents = ({submitForm}) => {
  const handleSubmit = event => {
    event.preventDefault()
    submitForm()
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault() // disable save on enter key down
    }
  }

  return {
    onSubmit: handleSubmit,
    onKeyDown: handleKeyPress
  }
}
