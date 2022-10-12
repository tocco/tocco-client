import styled from 'styled-components'

import {StyledButton} from '../Button'
import {StyledLi, StyledLabel} from '../Typography'
import {scale, themeSelector, generateShades} from '../utilStyles'

export const StyledColumnPickerWrapper = styled.div``

export const StyledControlsWrapper = styled.div`
  margin-top: ${scale.space(0.7)};
`

export const StyledUl = styled.ul`
  list-style-type: none;
  margin-top: ${scale.space(-0.5)} !important; // Nice2 Reset
  padding-left: 0 !important; // Nice2 Reset
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  ${StyledLabel} {
    padding: 0 !important; // Nice2 Reset
  }
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
  background-color: ${themeSelector.color('paper')};
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`

export const StyledId = styled.span`
  color: ${themeSelector.color('text')};
  font-style: italic;
`

export const StyledItem = styled(StyledLi)`
  display: flex;
  padding: ${scale.space(-2)} ${scale.space(-2)} ${scale.space(-2)} 0;
  border-right: ${({isDraggedOver, theme}) => (isDraggedOver ? `3px solid ${theme.colors.secondary}` : 'none')};
  ${({draggable, theme}) =>
    draggable &&
    `
    &:hover {
      background-color: ${generateShades(theme.colors.paper)[1]};

      &,
      label {
        cursor: pointer;
      }
    }
  `}
`

export const StyledNumber = styled.span`
  display: inline-block;
  margin-right: ${scale.space(-1)};
  color: ${themeSelector.color('text')};
  font-size: ${scale.font(0)};
`
