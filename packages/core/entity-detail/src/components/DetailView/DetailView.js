import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import DetailFormContainer from '../../containers/DetailFormContainer'

const DetailView = ({unloadDetailView, mode, formInitialValues, fieldDefinitions, formDefinition, intl}) => {
  useEffect(() => {
    return () => {
      unloadDetailView()
    }
  }, [unloadDetailView])

  const handleAsyncValidate = form.hooks.useAsyncValidation({formInitialValues, fieldDefinitions, formDefinition, mode})
  const handleAyncValidate = form.hooks.useSyncValidation({fieldDefinitions, formDefinition})

  const msg = id => intl.formatMessage({id})
  const fieldDefinitionPaths = fieldDefinitions.map(fD => fD.path)

  return (
    <LoadMask required={[formInitialValues]} loadingText={msg('client.entity-detail.loadingText')}>
      <DetailFormContainer
        mode={mode}
        validate={handleAyncValidate}
        asyncValidate={handleAsyncValidate}
        asyncBlurFields={fieldDefinitionPaths}
      />
    </LoadMask>
  )
}

export default DetailView

DetailView.propTypes = {
  intl: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
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
