import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledActionsWrapper = styled.div`
  background-color: ${theme.color('paper')};
  padding-bottom: ${scale.space(-0.5)};
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin-top: ${scale.space(-0.5)};
  }
`
