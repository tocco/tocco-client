import styled from 'styled-components'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledButtonGroup} from 'tocco-ui/src/ButtonGroup'

export default styled.div`
  ${StyledButtonGroup} {
    width: auto;

    ${StyledButton} {
      flex-grow: 1;

      > span {
        width: 100%;
      }
    }
  }
`
