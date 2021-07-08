import styled from 'styled-components'
import {scale, theme, StyledButton} from 'tocco-ui'
import {StyledLabel, StyledLi} from 'tocco-ui/src/Typography'
import {lighten} from 'polished'

export const StyledUl = styled.ul`
  list-style-type: none;
  margin-top: ${scale.space(-0.5)} !important; // Nice2 Reset
  padding-left: ${scale.space(-0.5)} !important; // Nice2 Reset
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

export const StyledItem = styled(StyledLi)`
  border-right: ${({isDraggedOver, theme}) => isDraggedOver ? `3px solid ${theme.colors.secondary}` : 'none'};
  ${({draggable, theme}) => draggable && `
    &:hover {
      background-color: ${lighten(0.25, theme.colors.secondaryLight)};

      &,
      label {
        cursor: pointer;
      }
    }
  `
  }
`
