import styled from 'styled-components'
import {theme} from 'tocco-ui'

export default styled.div`
  float: left;
  display: flex;
`

export const StyledButton = styled.span`
  border-radius: ${theme.radii('medium')};
  padding: .3rem 1.3rem;
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
  
  && {
    button {
      background-color: transparent;
      margin-left: .5rem;
      margin-top: -.2rem;
      margin-right: -.8rem;
      
      &:hover *{
        color: ${theme.color('secondary')};
      }
    }
  }
`
