import styled from 'styled-components'
import {StyledButton} from 'tocco-ui'

const StyledModelContent = styled.div.attrs({
  className: props => `rrt-confirm animated ${props.isClosing ? ' fadeOut' : 'bounceIn'}`
})`
   &&& {
    width: 700px;
    margin-left: -350px;

    > ${StyledButton} {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
`

export {
  StyledModelContent
}
