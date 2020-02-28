import styled from 'styled-components'

import {StyledButton} from '../Button'

const StyledButtonGroup = styled.div`
  &&& > ${StyledButton} {
    :not(:first-child) {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    :not(:last-child) {
      margin-right: 0;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`

export default StyledButtonGroup
