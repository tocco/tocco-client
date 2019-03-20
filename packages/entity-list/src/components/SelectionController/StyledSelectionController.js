import styled from 'styled-components'
import {
  spaceScale,
  StyledButtonGroup
} from 'tocco-ui'

export default styled.div`
  float: right;

  > *:not(:last-child) {
    margin-right: ${props => spaceScale(props, -1)};
  }

  ${StyledButtonGroup} {
    display: inline-flex;
    vertical-align: bottom;
  }
`
