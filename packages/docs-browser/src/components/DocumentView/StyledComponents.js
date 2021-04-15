import styled from 'styled-components'
import {theme, scale} from 'tocco-ui'

export const StyledDocumentViewWrapper = styled.div`
  height: 100%;
  background-color: ${theme.color('paper')};
  padding-left: ${scale.space(0.5)};
  overflow-y: hidden;
`
