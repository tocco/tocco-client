import styled from 'styled-components'

export const StyledRelationOptionSelect = styled.select`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`
