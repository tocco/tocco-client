import styled from 'styled-components'
import {scale, StyledScrollbar, themeSelector} from 'tocco-ui'

export const StyledSearchPanelWrapper = styled.div`
  padding: ${scale.space(-1.1)};
  overflow-y: auto;
  ${StyledScrollbar}
`

export const StyledSchedulerAppContainerWrapper = styled.div`
  background-color: ${themeSelector.color('paper')};
  height: 100%;
  width: 100%;
`
