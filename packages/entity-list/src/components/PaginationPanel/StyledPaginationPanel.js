import styled from 'styled-components'
import {Button, theme} from 'tocco-ui'

export const StyledPaginationPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  
  span {
    margin-right: 6px;
    padding-top: 3px;
  }
`

export const StyledButton = styled(Button)`
 && {
    border: 0;
    
    &:hover, &:focus {
      color: ${theme.color('secondaryLight')};
      background-color: transparent;
    }
 }

`
