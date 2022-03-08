import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledActionsWrapper = styled.div`
  background-color: ${theme.color('paper')};
  padding-bottom: ${scale.space(-0.5)};
  display: flex;
  flex-wrap: wrap;
  z-index: 2; // Higher than StyledIndicatorsContainerWrapper
  position: sticky;
  top: 0;

  & > * {
    margin-top: ${scale.space(-0.5)};
  }
`
