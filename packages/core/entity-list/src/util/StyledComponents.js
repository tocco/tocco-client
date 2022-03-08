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

export const StyledSpan = styled.span`
  p {
    margin-block-start: 0; // reset user agent style to prevent margin within table
  }
`
