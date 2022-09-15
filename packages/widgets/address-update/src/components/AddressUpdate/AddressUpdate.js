import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {notification, form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import AddressForm from '../AddressForm'

const AddressUpdate = ({formDefinition, formInitialValues, fieldDefinitions, mode, unloadView}) => {
  useEffect(() => {
    return () => {
      unloadView()
    }
  }, [unloadView])

  const handleAsyncValidate = form.hooks.useAsyncValidation({formInitialValues, fieldDefinitions, formDefinition, mode})
  const handleAyncValidate = form.hooks.useSyncValidation({fieldDefinitions, formDefinition})

  const fieldDefinitionPaths = fieldDefinitions.map(fD => fD.path)

  return (
    <>
      <notification.Notifications />
      <LoadMask required={[formInitialValues]}>
        <AddressForm
          validate={handleAyncValidate}
          asyncValidate={handleAsyncValidate}
          asyncBlurFields={fieldDefinitionPaths}
        />
      </LoadMask>
    </>
  )
}

AddressUpdate.propTypes = {
  mode: PropTypes.string.isRequired,
  formDefinition: PropTypes.object.isRequired,
  fieldDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      id: PropTypes.string,
      validation: PropTypes.object
    })
  ).isRequired,
  unloadView: PropTypes.func.isRequired,
  formInitialValues: PropTypes.shape({
    initial: PropTypes.objectOf(PropTypes.string)
  })
}

export default AddressUpdate
