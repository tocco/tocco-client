import styled from 'styled-components'
import {theme} from 'tocco-ui'

const StyledFullCalendar = styled.div`
&& {
  .fc{
    h2{
      margin: 0;
    }

    .remove-resource-btn{
      margin: 0;
      border: none;
      outline: none;
      background: #eee;
      border-radius: 50%;
      margin-right: 2px;
      height: 20px;
      width: 20px;
      padding: 0;
      vertical-align: 1px;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .fc-event{
      border: none;
      border-radius: 2px;
      font-weight: ${theme.fontWeight('bold')};
      background-color: #1287de;
      color: #fff;

      &.dark {
        color: ${theme.color('text')};
      }

      &.bright {
        color: #fff;
      }

      &.conflict {
        border: 3px dashed #8b0000;
        border-radius: 3px;
      }

      .fc-bg{
        opacity: 0;
      }
    }

    .fc-timeline-event .fc-content{
      text-overflow: ellipsis;
    }
  }

  .tocco-resource-scheduler {
    .popover {
      min-width: 500px;
      max-width: 600px;

      .popover-content {
        width: 100%;
      }
    }
  }
}
`
export default StyledFullCalendar
