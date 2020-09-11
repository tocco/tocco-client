import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {scale, LoadMask} from 'tocco-ui'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import {actions, notifier} from 'tocco-app-extensions'
import {selection as selectionPropType} from 'tocco-util'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
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
      ? <StyledSplitPane
        defaultSize={300}
        minSize={250}
        resizerStyle={resizerStyle}
        split="vertical">
        <StyledSplitPanelWrapper key={'sidebar'}>
          <div>
            <InputEditSearch/>
            <InputEditInformation/>
          </div>
        </StyledSplitPanelWrapper>
        <StyledSplitPanelWrapper key="table">
          {actionDefinitions.map(definition =>
            <actions.Action
              key={definition.id}
              definition={definition}
              selection={selection}/>
          )}
          <InputEditTable/>
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
