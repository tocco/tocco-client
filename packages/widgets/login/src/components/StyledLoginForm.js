import styled from 'styled-components'
import {StyledInputCss, StyledEditableWrapperCss, Button, StyledButton, StyledButtonGroup, theme, scale} from 'tocco-ui'

export const StyledLoginFormInput = styled.input`
  /* stylelint-disable-next-line block-no-empty */
  @keyframes onAutoFillStart {
    from {
    }
  }

  &&&& {
    ${StyledInputCss}
    transition: background-color 50000s, color 50000s, filter 50000s;

    &:-webkit-autofill {
      animation-duration: 50000s;
      animation-name: onAutoFillStart;
    }
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }
`

export const StyledLoginFormInputWrapper = styled.div`
  &&& {
    ${StyledEditableWrapperCss}
  }
`

export const StyledLoginButton = styled(Button)`
  &&& {
    font-size: ${scale.font(1.3)};
    border-radius: ${theme.radii('large')};
    display: flex;
    justify-content: center;
    padding: 1.25rem 0;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;

    &:not(:last-child) {
      margin-right: 0;
    }
  }
`

export const StyledTransparentButton = styled(Button)`
  &&& {
    margin-right: 0;
    background-color: transparent;
    color: ${theme.color('primary')};
    padding: 1.25rem 0;
    width: 100%;
    justify-content: center;

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
    }
  }
`
