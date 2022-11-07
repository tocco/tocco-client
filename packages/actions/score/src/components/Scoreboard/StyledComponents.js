import styled from 'styled-components'
import {theme, declareFont} from 'tocco-ui'

export const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledTable = styled.table`
  ${declareFont()}
  border-collapse: collapse;
  width: 30vw;
  border-style: hidden;
  box-shadow: 0 0 0 1px none;
  text-align: center;
  align-self: center;
`
export const StyledTh = styled.th`
  text-align: left;
  background-color: ${theme.color('primary')};
  color: ${theme.color('paper')};
  border: 1px solid #dddd;
  padding: 12px 8px;
`

export const StyledTd = styled.td`
  border: 1px solid #dddd;
  padding: 8px;
`

export const StyledTr = styled.tr`
  &:hover {
    background-color: #ddd;
  }

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`
