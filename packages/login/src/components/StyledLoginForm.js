import styled from 'styled-components'
import {
  StyledInputCss,
  StyledEditableWrapperCss,
  Button,
  theme
} from 'tocco-ui'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledButtonGroup} from 'tocco-ui/src/ButtonGroup'

export const StyledLoginFormInput = styled.input`
  @keyframes onAutoFillStart { from {} }

  && {
    transition: background-color 50000s, color 50000s, filter 50000s;
    &:-webkit-autofill {
      animation-duration: 50000s;
      animation-name: onAutoFillStart;
    }
    padding-top: .7rem;
    padding-bottom: .7rem;
  }

  ${StyledInputCss}
`

export const StyledLoginFormInputWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}
  }
`

export const StyledLoginButton = styled(Button)`
  &&& {
    border-radius: ${theme.radii('large')};
    display: flex;
    justify-content: center;
    padding: 1.25rem 0;
  
    &:not(:last-child) {
      margin-right: 0;
    }
    
    && > span {
      width: auto;
      padding-left: .4em;
    }
  }
`

export const StyledTransparentButton = styled(Button)`
  &&& {
    margin-right: 0;
    background-color: transparent;
    color: ${theme.color('primary')};
    padding: 1.25rem 0;
    
    &:hover {
      background-color: transparent;
    }
  }
`

export const StyledLoginFormWrapper = styled.div`  
  ${StyledButtonGroup} {
    margin-top: 1.8rem;
    width: auto;
    flex-direction: column;

    ${StyledButton} {
      flex-grow: 1;

      > span {
        width: 100%;
      }
    }
  }
`
