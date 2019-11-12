import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledPaginationPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  
  span {
    margin-right: 6px;
    padding-top: 3px;
  }
  
  margin-bottom: ${scale.space(0)}
`
