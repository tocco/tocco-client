import styled from 'styled-components'
import {theme} from 'tocco-ui'

export const StyledDashBoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 568px) {
    justify-content: center;
    align-items: center;
  }
`
