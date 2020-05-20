import styled from 'styled-components'
import {scale, shadeColor, theme} from 'tocco-ui'
import _get from 'lodash/get'

export const StyledTable = styled.table`
  background-color: ${theme.color('paper')};
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    tr {
      border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};

      th {
        border-bottom: 2px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
        padding-bottom: ${scale.space(-0.5)};
        padding-top: ${scale.space(-1)};
      }
    }
  }

  tbody {
    tr:hover {
      background-color: ${theme.color('backgroundBody')};
    }
  }
`

export const StyledHeader = styled.th`
  text-align: left;
  padding-right: 20px;
`

export const StyledCell = styled.td`
  width: ${props => props.width ? `${props.width}px` : 'auto'};
`
