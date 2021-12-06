import styled from 'styled-components'
import {scale, StyledButton, theme, StyledLabel} from 'tocco-ui'

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

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
