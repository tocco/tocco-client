import styled, {createGlobalStyle} from 'styled-components'
import _get from 'lodash/get'
import {
  declareFont,
  theme,
  StyledScrollbar,
  shadeColor,
  scale
} from 'tocco-ui'

export const StyledFullCalendarWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;

  .fc {
    ${declareFont()};

    table {
      font-size: ${scale.font(-2)};
    }

    // decrease header height
    .fc-datagrid-header {
      .fc-datagrid-cell-frame {
        height: 25px !important;
      }
    }

    .fc-timeline-slot-frame a {
      text-decoration: none;
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
        font-size: ${scale.font(0)};
        font-weight: ${theme.fontWeight('regular')};
      }
    }

    .fc-event-title {
      font-size: ${scale.font(0)};
    }
  }
`

export const StyledMemoizedFullCalender = styled.div`
  overflow-y: auto;
  ${StyledScrollbar}
`

export const CalendarGlobalPrintStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }

    #section-to-print,
    #section-to-print * {
      visibility: visible;
      color: ${theme.color('text')};

      input[type='checkbox'] {
        visibility: hidden !important;
      }
    }

    #section-to-print {
      position: fixed;
      overflow: visible;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      & *:not(.fc-timeline-event-harness *) {
        overflow: visible;
      }
    }
  }
`
