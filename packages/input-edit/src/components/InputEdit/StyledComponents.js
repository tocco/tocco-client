import styled from 'styled-components'
import {theme} from 'tocco-ui'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.color('backgroundBody')};

  > * {
    margin: 5px;
  }
`
