import styled from 'styled-components'
import {
  declareFont,
  declareWrappingText,
  scale,
  theme,
  shadeColor,
  StyledScrollbar
} from 'tocco-ui'
import _get from 'lodash/get'

const CARET_WIDTH = scale.space(-2)

const StyledTable = styled.div`
  
  .react-bs-container-body {
    height: 48vh !important;
    max-height: 450px;
    overflow-y: auto;
    ${StyledScrollbar}
  }
   
  && {
    .react-bs-table {
      background-color: ${theme.color('paper')};

      table {
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0;
        max-width: 100%;
        table-layout: fixed;
        width: 100%;
        
        tr {
          border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
          
          th {
            border-bottom: 2px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
            padding-bottom: ${scale.space(-0.5)};
            padding-top: ${scale.space(-1)};
          }
        }

        th,
        td {
          ${declareFont({fontWeight: 700})}
          padding: ${scale.space(-2)} ${scale.space(-1)};
          text-align: center;
          vertical-align: top;
        }
        
        tr:hover {
          background-color: ${theme.color('backgroundBody')};
        }
        
        tr:active, tr:focus {
          &&& {
            background-color: ${theme.color('secondary')} !important;
            color: ${theme.color('paper')} !important;
          }
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
          ${declareWrappingText()};
          &[tabindex] {
            outline: none;
          }
        }
      }
    }
  }
`

export default StyledTable
