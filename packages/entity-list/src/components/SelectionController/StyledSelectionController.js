import styled from 'styled-components'
import {
  scale,
  StyledButtonGroup
} from 'tocco-ui'

export default styled.div`
  float: right;

  > *:not(:last-child) {
    margin-right: ${scale.space(-1)};
  }

  ${StyledButtonGroup} {
    display: inline-flex;
    vertical-align: bottom;
  }
`
