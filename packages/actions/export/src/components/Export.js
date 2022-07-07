import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {templateValues, selection as selectionPropType} from 'tocco-app-extensions'
import {ColumnPicker, LoadMask} from 'tocco-ui'

const Export = ({
  selection,
  intl,
  availableColumns,
  loadFormData,
  defaultValues,
  runExport,
  handleTemplateChange,
  templatesInitialized
}) => {
  useEffect(() => loadFormData(selection), [loadFormData, selection])

  return (
    <LoadMask required={[defaultValues]}>
      <templateValues.TemplateForm
        templateEntityName={'Export_template'}
        formName={'Export_template_action'}
        selection={selection}
        customTemplateFields={{
          text: value => handleTemplateChange(value)
        }}
        defaultValues={defaultValues}
      />

      <LoadMask required={[availableColumns, templatesInitialized]}>
        <ColumnPicker
          onOk={values => runExport(values)}
          intl={intl}
          initialColumns={availableColumns}
          dndEnabled={true}
          buttonLabel={intl.formatMessage({id: 'client.actions.export.form.generate'})}
        />
      </LoadMask>
    </LoadMask>
  )
}

Export.propTypes = {
  selection: selectionPropType.propType,
  intl: PropTypes.object.isRequired,
  availableColumns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      hidden: PropTypes.bool
    })
  ),
  loadFormData: PropTypes.func.isRequired,
  runExport: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  handleTemplateChange: PropTypes.func.isRequired,
  templatesInitialized: PropTypes.bool
}

export default Export
