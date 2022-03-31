import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {templateValues, selection as selectionPropType} from 'tocco-app-extensions'
import {ColumnPicker} from 'tocco-ui'

const Export = ({selection, intl, availableColumns, loadFormData, setAvailableColumns, defaultValues, runExport}) => {
  useEffect(() => loadFormData(selection), [loadFormData, selection])

  if (defaultValues && availableColumns) {
    return (
      <>
        <templateValues.TemplateForm
          templateEntityName={'Export_template'}
          formName={'Export_template_action'}
          selection={selection}
          customTemplateFields={{
            text: value => setAvailableColumns(selectColumnsByFields(availableColumns, value))
          }}
          defaultValues={defaultValues}
        />
        <ColumnPicker
          onOk={values => runExport(values)}
          intl={intl}
          initialColumns={availableColumns}
          dndEnabled={true}
          buttonLabel={intl.formatMessage({id: 'client.actions.export.form.generate'})}
        />
      </>
    )
  } else {
    return null
  }
}

const selectColumnsByFields = (columns, fields) => {
  const fieldsToSelect = fields.split('\n')
  return columns.map(column => ({
    ...column,
    hidden: !fieldsToSelect.includes(column.id)
  }))
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
  setAvailableColumns: PropTypes.func.isRequired,
  runExport: PropTypes.func.isRequired,
  defaultValues: PropTypes.object
}

export default Export
