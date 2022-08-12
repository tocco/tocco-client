import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: ${scale.space(0)};

  button {
    margin-right: 0;
  }
`
