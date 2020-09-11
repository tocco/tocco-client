import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {actions, notifier} from 'tocco-app-extensions'
import {selection as selectionPropType} from 'tocco-util'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import InputEditSearch from '../InputEditSearch'
import {
  StyledPanelWrapperLeft,
  StyledPanelWrapperRight,
  StyledLeftPane,
  StyledActionsWrapper,
  StyledInputEditSearchWrapper,
  StyledPaneWrapper
} from './StyledInputEdit'
import InputEditInformation from '../InputEditInformation'

const InputEdit = ({
  selection,
  validation: {valid, message},
  handleNotifications,
  checkSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  actionDefinitions,
  notify
}) => {
  useEffect(() => {
    checkSelection()
  }, [selection])
  useEffect(() => {
    initializeTable()
    initializeSearch()
    initializeInformation()
  }, [selection, valid])

  if (valid === false) {
    notify('error', 'client.component.input-edit.error.title', message)
  }

  return <LoadMask required={[valid || message]}>
    {handleNotifications && <notifier.Notifier/>}
    {valid
      ? <StyledPaneWrapper>
        <StyledPanelWrapperLeft>
          <StyledLeftPane>
            <StyledInputEditSearchWrapper>
              <InputEditSearch/>
            </StyledInputEditSearchWrapper>
            <InputEditInformation/>
          </StyledLeftPane>
        </StyledPanelWrapperLeft>
        <StyledPanelWrapperRight>
          <StyledActionsWrapper>
            {actionDefinitions.map(definition =>
              <actions.Action
                key={definition.id}
                definition={definition}
                selection={selection}/>
            )}
          </StyledActionsWrapper>
          <InputEditTable/>
        </StyledPanelWrapperRight>
      </StyledPaneWrapper>
      : null}
  </LoadMask>
}

InputEdit.propTypes = {
  selection: selectionPropType.propType.isRequired,
  validation: PropTypes.shape({
    valid: PropTypes.bool,
    message: PropTypes.string
  }).isRequired,
  handleNotifications: PropTypes.bool,
  checkSelection: PropTypes.func.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  initializeInformation: PropTypes.func.isRequired,
  actionDefinitions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })),
  notify: PropTypes.func.isRequired
}

export default InputEdit
