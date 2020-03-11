import styled from 'styled-components'

export const StyledTable = styled.table`
`

export const StyledHeader = styled.th`
  text-align: left;
  padding-right: 20px;
`

export const StyledCell = styled.td`
  width: ${props => props.width ? `${props.width}px` : 'auto'};
`
