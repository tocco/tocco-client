import styled from 'styled-components'
import {colorizeBorder, scale, theme} from 'tocco-ui'

export const StyledInfoBoxWrapper = styled.div`
  border: 1px solid ${colorizeBorder.shade2};
  height: 300px;
  width: 100%;
  padding: 0 0 0 ${scale.space(0)};
  margin: ${scale.space(0)};
  background: ${theme.color('paper')};
`

export const StyledDroppedPreview = styled.div`
  border: 2px dashed ${theme.color('primary')};
  height: 300px;
  width: 100%;
  padding: 0 0 0 ${scale.space(0)};
  margin: ${scale.space(0)};
  background: ${theme.color('paper')};
`
