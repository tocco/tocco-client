import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, {useEffect, useRef} from 'react'
import {form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import DetailFormContainer from '../../containers/DetailFormContainer'
import modes from '../../util/modes'

const DetailView = ({unloadDetailView, mode, formInitialValues, fieldDefinitions, formDefinition, intl}) => {
  useEffect(() => {
    return () => {
      unloadDetailView()
    }
  }, [unloadDetailView])

  const handledAsyncValidate = formValues =>
    form.asyncValidation(formValues, mode === modes.CREATE ? {} : formInitialValues, fieldDefinitions, mode)

  const validateSingletonRef = useRef(null)

  const getSyncValidation = () => {
    if (!validateSingletonRef.current && !_isEmpty(fieldDefinitions)) {
      validateSingletonRef.current = form.syncValidation(fieldDefinitions, formDefinition)
    }
    return validateSingletonRef.current
  }

  const msg = id => intl.formatMessage({id})
  const fieldDefinitionPaths = fieldDefinitions.map(fD => fD.path)

  return (
    <LoadMask required={[formInitialValues]} loadingText={msg('client.entity-detail.loadingText')}>
      <DetailFormContainer
        mode={mode}
        validate={getSyncValidation()}
        asyncValidate={handledAsyncValidate}
        asyncBlurFields={fieldDefinitionPaths}
      />
    </LoadMask>
  )
}

export default DetailView

DetailView.propTypes = {
  intl: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  loadDetailView: PropTypes.func.isRequired,
  unloadDetailView: PropTypes.func.isRequired,
  logError: PropTypes.func.isRequired,
  entityModel: PropTypes.object.isRequired,
  fieldDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      id: PropTypes.string,
      validation: PropTypes.object
    })
  ).isRequired,
  formDefinition: PropTypes.object.isRequired,
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  formInitialValues: PropTypes.shape({
    initial: PropTypes.objectOf(PropTypes.string)
  })
}
