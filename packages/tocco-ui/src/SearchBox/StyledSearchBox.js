import styled from 'styled-components'

import {StyledButton} from '../Button'

// SCR_TEMP remove StyledInputGroupBtn after Bootstrap forms were refactored
const StyledInputGroupBtn = styled.span`
  && {
    /* copy of Bootstrap styles */
    display: table-cell;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    white-space: nowrap;
    width: 1%;

    /* bend Button styles to look properly */
    ${StyledButton} {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border: 1px solid #ccc;
      display: inline-block;
      height: 34px;  // magic number
      margin-left: -1px;
    }
  }
`

export default StyledInputGroupBtn
