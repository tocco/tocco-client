import React, {useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {scale} from 'tocco-ui'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import {actions} from 'tocco-app-extensions'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import InputEditPagination from '../InputEditPagination'
import InputEditSearch from '../InputEditSearch'
import {resizerStyle, StyledSplitPanelWrapperLeft, StyledSplitPanelWrapperRight} from './StyledInputEdit'

const StyledSplitPane = styled(SplitPane)`
  position: static !important;

  .react-bs-container-body {
    height: auto !important;
    margin-bottom: ${scale.space(0)};
  }

  > div {
    overflow-y: hidden;
  }
`

const InputEdit = ({entityKey, initializeTable, initializeSearch, inputDataForm}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [entityKey])

  const actionDefinitions = useMemo(() => inputDataForm.children ? inputDataForm.children
    .find(child => child.id === 'main-action-bar')
    .children
    .filter(child => child.componentType === 'action')
    .map(child => {
      child.scope = 'detail'
      return child
    }) : [], [inputDataForm])
  const selection = actions.getSingleEntitySelection('Input', entityKey)

  return <StyledSplitPane
    defaultSize={325}
    minSize={325}
    resizerStyle={resizerStyle}
    split="vertical"
  >
    <StyledSplitPanelWrapperLeft>
      <InputEditSearch/>
    </StyledSplitPanelWrapperLeft>
    <StyledSplitPanelWrapperRight>
      {actionDefinitions.map(definition =>
        <actions.Action key={definition.id}
          definition={definition}
          selection={selection}/>
      )}
      <InputEditTable/>
      <InputEditPagination/>
    </StyledSplitPanelWrapperRight>
  </StyledSplitPane>
}

InputEdit.propTypes = {
  entityKey: PropTypes.string.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  inputDataForm: PropTypes.shape({
    children: PropTypes.array
  }).isRequired
}

export default InputEdit
