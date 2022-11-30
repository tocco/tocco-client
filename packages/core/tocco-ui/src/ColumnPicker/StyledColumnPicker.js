import styled from 'styled-components'

import {StyledLi, StyledLabel} from '../Typography'
import {scale, theme, generateShades} from '../utilStyles'

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

export const StyledId = styled.span`
  color: ${theme.color('text')};
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
  color: ${theme.color('text')};
  font-size: ${scale.font(0)};
`
