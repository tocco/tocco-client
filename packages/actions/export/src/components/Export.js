import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {templateValues, selection as selectionPropType} from 'tocco-app-extensions'
import {Button, ColumnPicker, LoadMask} from 'tocco-ui'

import {StyledButtonWrapper} from './StyledComponents'

const Export = ({
  selection,
  intl,
  availableColumns,
  loadFormData,
  defaultValues,
  runExport,
  handleTemplateChange,
  templatesInitialized,
  formValid
}) => {
  const [columns, setColumns] = useState(availableColumns)
  useEffect(() => loadFormData(selection), [loadFormData, selection])

  useEffect(() => {
    setColumns(availableColumns)
  }, [availableColumns])

  return (
    <LoadMask required={[defaultValues]}>
      <templateValues.TemplateForm
        templateEntityName="Export_template"
        formName="Export_template_action"
        selection={selection}
        customTemplateFields={{
          text: value => handleTemplateChange(value)
        }}
        defaultValues={defaultValues}
      />

      <LoadMask required={[columns, templatesInitialized]}>
        <ColumnPicker intl={intl} columns={columns} onColumnsChange={setColumns} dndEnabled={true} />
        <StyledButtonWrapper>
          <Button onClick={() => runExport(columns)} ink="primary" look="raised" disabled={!formValid}>
            <FormattedMessage id="client.actions.export.form.generate" />
          </Button>
        </StyledButtonWrapper>
      </LoadMask>
    </LoadMask>
  )
}

Export.propTypes = {
  selection: selectionPropType.propType,
  intl: PropTypes.object.isRequired,
  formValid: PropTypes.bool.isRequired,
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
