import styled from 'styled-components'
import {theme, scale} from 'tocco-ui'

const StyledDevCon = styled.div`
  && {
    background-color: ${theme.color('paper')};
    padding: ${scale.space(0)};
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
  }
`

export default StyledDevCon
