import styled from 'styled-components'
import {
  declareFont,
  theme
} from 'tocco-ui'

const StyledFullCalendar = styled.div`
  .fc{
    ${declareFont()}

    // decrease header height
    .fc-datagrid-header {
      .fc-datagrid-cell-frame{
        height: 25px !important;
      }
    }

    // decrease header height
    .fc-timeline-slot-frame.fc-timeline-slot-frame{
      height: 25px !important;
    }

    .remove-resource-checkbox{
      margin-right: 6px;
    }

    .fc-timeline-header-row {
      th{
        font-weight: ${theme.fontWeight('regular')};
      }
    }

    .fc-event {
      cursor: pointer;
      border: none;
      border-radius: 2px;
      background-color: #1287de;

      .dark {
        color: ${theme.color('text')};
      }

      .bright {
        color: #fff;
      }

      .conflict {
        border: 3px dashed #8b0000;
        border-radius: ${theme.radii('regular')};
      }

      .fc-event-time {
        overflow: visible;
      }
    }
  }
`

export default StyledFullCalendar
