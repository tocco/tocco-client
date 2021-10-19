import styled from 'styled-components'
import {scale, StyledButton, theme} from 'tocco-ui'
import {StyledLabel} from 'tocco-ui/src/Typography'

export const StyledButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  padding-top: ${scale.space(0)};
  background-color: ${theme.color('paper')};
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`

export const StyledUl = styled.ul`
  list-style-type: none;
  margin-top: ${scale.space(-0.5)};
  padding-left: ${scale.space(-0.5)};

  ${StyledLabel} {
    padding: 0;
  }
`

export const StyledCheckbox = styled.input`
  vertical-align: top;
  margin-right: ${scale.space(-1)};

  &:hover {
    cursor: pointer;
  }
`
