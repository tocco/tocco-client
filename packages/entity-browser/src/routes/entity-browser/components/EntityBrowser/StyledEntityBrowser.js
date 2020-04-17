import styled from 'styled-components'
import {theme, scale} from 'tocco-ui'

const StyledEntityBrowser = styled.div`
  && {
    background-color: ${theme.color('paper')};
    height: 100%;
    padding: ${scale.space(0)};
  }
`

export default StyledEntityBrowser
