import styled from 'styled-components'
import _get from 'lodash/get'
import {
  declareFont,
  theme,
  StyledScrollbar,
  shadeColor
} from 'tocco-ui'

export const StyledFullCalendarWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;

  .fc {
    ${declareFont()}

    // decrease header height
    .fc-datagrid-header {
      .fc-datagrid-cell-frame {
        height: 25px !important;
      }
    }

    // decrease header height
    .fc-timeline-slot-frame.fc-timeline-slot-frame {
      height: 25px !important;
    }

    .remove-resource-checkbox {
      margin-right: 6px;
    }

    .fc-scrollgrid {
      border-top: 0; // remove top border as it otherwise causes a double border when not scrolling
      border-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 1)};
    }

    // prevent top border from disappearing on scroll
    & .fc-scroller-harness {
      border-top: 1px solid ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 1)};
    }

    .fc-timeline-header-row {
      th {
        font-weight: ${theme.fontWeight('regular')};
      }
    }

    .fc-event {
      cursor: pointer;
      border: none;
      background-color: ${theme.color('signal.info.paper')};

      .dark {
        color: ${theme.color('text')};
      }

      .bright {
        color: ${theme.color('paper')};
      }

      .conflict {
        border: 2px dashed  ${theme.color('signal.danger.text')};
      }

      .fc-event-time {
        overflow: visible;
      }
    }
  }
`

export const StyledMemoizedFullCalender = styled.div`
  overflow-y: auto;
  ${StyledScrollbar}
`
