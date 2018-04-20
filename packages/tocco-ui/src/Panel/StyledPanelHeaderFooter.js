import styled from 'styled-components'

import {StyledButton} from '../Button'

const StyledPanelHeaderFooter = styled.div`
  && {
    display: flex;

    > div {
      flex: 1 1 auto;
    }

    ${StyledButton} {
      margin-left: auto;
      align-self: flex-start;
    }
  }
`
export default StyledPanelHeaderFooter
