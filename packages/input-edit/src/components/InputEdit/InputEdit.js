import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {actions, notification} from 'tocco-app-extensions'
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
  handleNotifications,
  updateSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  actionDefinitions
}) => {
  useEffect(() => {
    updateSelection()
  }, [selection])
  useEffect(() => {
    initializeTable()
    initializeSearch()
    initializeInformation()
  }, [selection])

  return <>
    {handleNotifications && <notification.Notifications/>}
    <StyledPaneWrapper>
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
  </>
}

InputEdit.propTypes = {
  selection: selectionPropType.propType.isRequired,
  handleNotifications: PropTypes.bool,
  updateSelection: PropTypes.func.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  initializeInformation: PropTypes.func.isRequired,
  actionDefinitions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })),
  notify: PropTypes.func.isRequired
}

export default InputEdit
