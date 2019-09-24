import styled from 'styled-components'
import {
  colorizeBorder,
  declareFont,
  declareWrappingText,
  scale,
  shadeColor,
  theme
} from 'tocco-ui'

const CARET_WIDTH = scale.space(-2)

const StyledTable = styled.div`
  && {
    .react-bs-table {
      margin-bottom: ${scale.space(-1)};

      table {
        background-color: transparent;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0;
        max-width: 100%;
        table-layout: fixed;
        width: 100%;

        th,
        td {
          ${declareFont({fontWeight: 700})}
          cursor: pointer;
          padding: ${scale.space(-2)} ${scale.space(-1)};
          text-align: center;
          vertical-align: top;
        }

        th {
          border-bottom: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;


          .order {
            margin-left: ${scale.space(-1)};
          }

          .caret {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 2px;
            vertical-align: middle;
            border-top:   ${CARET_WIDTH} dashed;
            border-top:   ${CARET_WIDTH} solid \9; // IE8
            border-top:   ${CARET_WIDTH} solid \9; // IE8
            border-right: ${CARET_WIDTH} solid transparent;
            border-left:  ${CARET_WIDTH} solid transparent;
            margin: 0 !important;
          }

          .dropup,
          .dropdown {
            position: relative;
          }

          .dropup {
            .caret {
              border-top: 0;
              border-bottom: ${CARET_WIDTH} dashed;
              border-bottom: ${CARET_WIDTH} solid \9; // IE8
              content: "";
            }
          }
        }
        
        th:first-of-type {
         text-overflow: clip;
        }

        td {
          ${declareWrappingText()}
          border-top: 1px solid ${props => colorizeBorder.shade2(props)};
          &[tabindex] {
            outline: none;
          }
        }

        &.table-striped > tbody > tr {
          &:nth-of-type(odd) {
            background-color: ${props => shadeColor(theme.color('paper')(props), 0.2)};
          }

          &:hover {
            background-color: ${props => shadeColor(theme.color('paper')(props), 0.4)};
          }
        }
      }
    }

    .react-bs-table-pagination .row {
      margin: ${scale.space(-1)} 0 0 0 !important;
    }
  }
`

export default StyledTable
