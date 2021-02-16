import styled from 'styled-components'
import {scale, theme, StyledButton} from 'tocco-ui'

export const StyledColumnPickerWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(100%, 700px);
`

export const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: ${scale.space(-0.5)};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

export const StyledCheckbox = styled.input`
  vertical-align: top;
  margin-right: ${scale.space(-1)} !important; // Nice2 Reset

  &:hover {
    cursor: pointer;
  }
`

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

export const StyledId = styled.span`
  color: ${theme.color('text')};
  font-style: italic;
`
