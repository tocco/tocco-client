import React, {useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {scale, Typography} from 'tocco-ui'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import {actions} from 'tocco-app-extensions'
import {intlShape} from 'react-intl'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import InputEditPagination from '../InputEditPagination'
import InputEditSearch from '../InputEditSearch'
import {resizerStyle, StyledSplitPanelWrapper} from './StyledInputEdit'
import InputEditInformation from '../InputEditInformation'

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

const InputEdit = ({entityKey, initializeTable, initializeSearch, initializeInformation, inputDataForm, intl}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
    initializeInformation()
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
    defaultSize={300}
    minSize={300}
    resizerStyle={resizerStyle}
    split="vertical">
    <StyledSplitPanelWrapper key={'sidebar'}>
      <StyledSplitPane defaultSize={300}
        minSize={300}
        resizerStyle={resizerStyle}
        split="horizontal">
        <StyledSplitPanelWrapper key={'search'}>
          <Typography.H2>{intl.formatMessage({id: 'client.input-edit.sidebar.search'})}</Typography.H2>
          <InputEditSearch/>
        </StyledSplitPanelWrapper>
        <StyledSplitPanelWrapper key={'information'}>
          <Typography.H2>{intl.formatMessage({id: 'client.input-edit.sidebar.information'})}</Typography.H2>
          <InputEditInformation/>
        </StyledSplitPanelWrapper>
      </StyledSplitPane>
    </StyledSplitPanelWrapper>
    <StyledSplitPanelWrapper key={'table'}>
      {actionDefinitions.map(definition =>
        <actions.Action key={definition.id}
          definition={definition}
          selection={selection}/>
      )}
      <InputEditTable/>
      <InputEditPagination/>
    </StyledSplitPanelWrapper>
  </StyledSplitPane>
}

InputEdit.propTypes = {
  entityKey: PropTypes.string.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  initializeInformation: PropTypes.func.isRequired,
  inputDataForm: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  intl: intlShape.isRequired
}

export default InputEdit
