import styled from 'styled-components'
import {theme} from 'tocco-ui'

export default styled.div`
  display: flex;
  width: max-content;
`

export const StyledButton = styled.span`
  border-radius: ${theme.radii('medium')};
  padding: 0.3rem 1.3rem;
  display: ${({disabled}) => (disabled ? 'none' : 'flex')};
  margin-right: 1rem;
  align-items: center;
  cursor: pointer;
  background-color: ${({active}) => active && theme.color('secondary')};

  &:hover {
    background-color: ${theme.color('secondaryLight')};

    * {
      color: ${theme.color('paper')};
    }
  }

  && {
    * {
      color: ${({active}) => active && theme.color('paper')};
    }

    button {
      background-color: transparent;
      margin-left: 0.5rem;
      margin-top: -0.2rem;
      margin-right: -0.8rem;

      &:hover * {
        color: ${theme.color('secondary')};
      }
    }
  }
`
