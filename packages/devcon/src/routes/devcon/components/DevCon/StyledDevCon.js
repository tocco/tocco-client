import styled from 'styled-components'
import {theme, scale} from 'tocco-ui'

export const StyledDevCon = styled.div`
  && {
    background-color: ${theme.color('paper')};
    padding: ${scale.space(0)};
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
  }
`

export const StyledNavigation = styled.div`
  display: flex;
`

export const StyledLink = styled.div`
  padding: 1em;
  background-color: #ddd;
  border-radius: 5px;
  margin: 5px;
`
