import styled from 'styled-components'
import {scale, StyledButton} from 'tocco-ui'

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${scale.space(0.5)};

  > ${StyledButton} {
    margin-right: 0;
  }
`
