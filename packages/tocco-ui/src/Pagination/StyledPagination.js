import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledSpan} from '../Typography'

const StyledPagination = styled.div`
  && {
    display: inline-flex;
    margin-bottom: ${props => theme('space.4')};
    align-items: baseline;

    input + ${StyledSpan} {
      margin-left: ${props => theme('space.4')};
    }

    button + ${StyledSpan} {
      transform: translateY(-1px);
    }

    input {
      width: auto;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`

export {
  StyledPagination
}
