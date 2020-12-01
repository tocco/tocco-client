import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledColumnPickerWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(100%, 700px);
`

export const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: ${scale.space(-0.5)};
  margin-bottom: -${scale.space(0)};
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
  padding-bottom: ${scale.space(0)};
  background-color: ${theme.color('paper')};
  transform: translateY(1.8rem);
`

export const StyledColumnName = styled.span`
  color: ${props => props.hasLabel ? 'inherit' : 'grey'};
  font-style: ${props => props.hasLabel ? 'inherit' : 'italic'};
`
