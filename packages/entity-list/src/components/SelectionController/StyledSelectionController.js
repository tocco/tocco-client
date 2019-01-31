import styled from 'styled-components'
import {
  spaceScale,
  StyledButtonGroup
} from 'tocco-ui'

export default styled.div`
  float: right;

  ${StyledButtonGroup} {
    margin-left: ${props => spaceScale(props, -1)};
    display: inline-flex;
  }
`
