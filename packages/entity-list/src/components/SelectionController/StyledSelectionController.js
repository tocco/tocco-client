import styled from 'styled-components'
import {theme} from 'tocco-ui'

export default styled.div`
  float: left;
  margin-right: 1rem;
  display: flex;
  margin-bottom: 1rem;
`

export const StyledButton = styled.span`
  border-radius: 3rem;
  padding: .5rem 2rem;
  display: ${({disabled}) => disabled ? 'none' : 'flex'};
  margin-right: 1rem;
  align-items: center;
  cursor: pointer;
  background-color: ${({active}) => active && theme.color('secondary')};

  &:hover {
    background-color: ${theme.color('secondaryLight')};
    * { color: ${theme.color('paper')};}
  }
  
  * {
    color: ${({active}) => active && theme.color('paper')};
  }
  
  &&& {
    button {
      background-color: transparent;
      margin-left: 1rem;
      margin-top: -.1rem;
    }
  }
`
