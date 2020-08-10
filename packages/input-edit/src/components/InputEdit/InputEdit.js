import React, {useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {scale, LoadMask} from 'tocco-ui'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import {actions} from 'tocco-app-extensions'
import {selection as selectionPropType} from 'tocco-util'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import InputEditPagination from '../InputEditPagination'
import InputEditSearch from '../InputEditSearch'
import {resizerStyle, StyledSplitPanelWrapper} from './StyledInputEdit'
import InputEditInformation from '../InputEditInformation'

const StyledSplitPane = styled(SplitPane)`
  position: static !important;

  & > div {
    flex-direction: column;
    overflow: hidden;
  }

  .react-bs-container-body {
    height: auto !important;
    margin-bottom: ${scale.space(0)};
  }
`

const InputEdit = ({
  selection,
  validation: {valid, message},
  checkSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  inputDataForm,
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

  const actionDefinitions = useMemo(() => inputDataForm.children
    ? inputDataForm.children
      .find(child => child.id === 'main-action-bar')
      .children
      .filter(child => child.componentType === 'action')
      .map(child => ({...child, scope: 'detail'}))
    : [], [inputDataForm])

  if (valid === false) {
    notify('error', 'client.component.input-edit.error.title', message)
    return null
  }
  return <LoadMask required={[valid || message]}>
    {valid
      ? <StyledSplitPane
        defaultSize={300}
        minSize={250}
        resizerStyle={resizerStyle}
        split="vertical">
        <StyledSplitPanelWrapper key={'sidebar'}>
          <StyledSplitPane defaultSize={300}
            minSize={300}
            resizerStyle={resizerStyle}
            split="horizontal">
            <StyledSplitPanelWrapper key="search">
              <InputEditSearch/>
            </StyledSplitPanelWrapper>
            <StyledSplitPanelWrapper key="information">
              <InputEditInformation/>
            </StyledSplitPanelWrapper>
          </StyledSplitPane>
        </StyledSplitPanelWrapper>
        <StyledSplitPanelWrapper key="table">
          {actionDefinitions.map(definition =>
            <actions.Action
              key={definition.id}
              definition={definition}
              selection={selection}/>
          )}
          <InputEditTable/>
          <InputEditPagination/>
        </StyledSplitPanelWrapper>
      </StyledSplitPane>
      : null}
  </LoadMask>
}

InputEdit.propTypes = {
  selection: selectionPropType.propType.isRequired,
  validation: PropTypes.shape({
    valid: PropTypes.bool,
    message: PropTypes.string
  }).isRequired,
  checkSelection: PropTypes.func.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  initializeInformation: PropTypes.func.isRequired,
  inputDataForm: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  notify: PropTypes.func.isRequired
}

export default InputEdit
