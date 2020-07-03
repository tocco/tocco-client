import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {scale} from 'tocco-ui'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'

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

const InputEdit = ({entityKey, initializeTable, initializeSearch}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [entityKey])

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
      <InputEditTable/>
      <InputEditPagination/>
    </StyledSplitPanelWrapperRight>
  </StyledSplitPane>
}

InputEdit.propTypes = {
  entityKey: PropTypes.string.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired
}

export default InputEdit
