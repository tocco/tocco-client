import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {actions, notification} from 'tocco-app-extensions'
import {selection as selectionPropType} from 'tocco-util'
import {GlobalStyles} from 'tocco-ui'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import InputEditSearch from '../InputEditSearch'
import {
  StyledPanelWrapperLeft,
  StyledPanelWrapperRight,
  StyledLeftPane,
  StyledActionsWrapper,
  StyledInputEditSearchWrapper,
  StyledPaneWrapper,
  StyledToggleCollapse,
  StyledToggleCollapseButton,
  StyledPlaceHolder
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

  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const Actions = actionDefinitions.map(definition =>
    <actions.Action
      key={definition.id}
      definition={definition}
      selection={selection}/>
  )

  return <>
    <GlobalStyles/>
    {handleNotifications && <notification.Notifications/>}
    <StyledPaneWrapper>
      <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
        <StyledToggleCollapse isCollapsed={isCollapsed}>
          <StyledToggleCollapseButton icon="chevron-right" isCollapsed={isCollapsed}/>
        </StyledToggleCollapse>
      </StyledPlaceHolder>
      <StyledPanelWrapperLeft isCollapsed={isCollapsed}>
        <StyledToggleCollapse>
          <StyledToggleCollapseButton icon="chevron-left" onClick={toggleCollapse}/>
        </StyledToggleCollapse>
        <StyledLeftPane>
          <StyledInputEditSearchWrapper>
            <InputEditSearch/>
          </StyledInputEditSearchWrapper>
          <InputEditInformation/>
        </StyledLeftPane>
      </StyledPanelWrapperLeft>
      <StyledPanelWrapperRight>
        <StyledActionsWrapper>
          {Actions}
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
