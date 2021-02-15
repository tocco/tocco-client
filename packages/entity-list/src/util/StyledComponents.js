import styled from 'styled-components'
import {StyledButton} from 'tocco-ui'

export const StyledActionWrapper = styled.div`
  ${StyledButton} {
    width: 100%;
    max-width: fit-content;
    justify-content: center;
    box-sizing: border-box;

    > * {
      overflow: hidden;
    }
  }
`
