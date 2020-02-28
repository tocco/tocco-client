import styled from 'styled-components'
import {
  colorizeBorder,
  declareFont,
  scale,
  theme
} from 'tocco-ui'

const StyledFullCalendar = styled.div`
  && {
    .fc{
      h2{
        margin: 0;
      }

      .remove-all-checkbox{
        margin-left: 7px;
        margin-top: 4px;
      }

      .remove-resource-checkbox{
        margin-left: 3px;
      }

      .fc-cell-content {
        ${declareFont({fontSize: scale.font(-2)})}
      }

      .fc-event{
        ${declareFont()}
        cursor: pointer;
        border: none;
        border-radius: 2px;
        background-color: #1287de;

        &.dark {
          color: ${theme.color('text')};
        }

        &.bright {
          color: #fff;
        }

        &.conflict {
          border: 3px dashed #8b0000;
          border-radius: ${theme.radii('regular')};
        }

        .fc-bg{
          opacity: 0;
        }

        .fc-time{
          font-weight: ${theme.fontWeight('normal')};
        }
      }

      .fc-timeline-event .fc-content{
        text-overflow: ellipsis;
      }
    }

    .na-tooltip {
      display: flex;
      flex-flow: column nowrap;
      z-index: 1060;
      width: 300px;

      .na-tooltip-inner{
        ${declareFont()}
        background-color: ${theme.color('paper')};
        border: 1px solid ${props => colorizeBorder.shade2(props)};
        border-radius: ${theme.radii('regular')};
        padding: 10px;

        b {
          font-weight: ${theme.fontWeight('bold')};
          font-size: ${scale.font(1)};
          display: inline-block;
          margin-bottom: 5px;
        }
      }

      .na-tooltip-arrow {
        width: 0;
        height: 0;
        margin-left: calc(50% - 5px);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }

      &[x-placement^='bottom'] {
        .na-tooltip-arrow {
          border-bottom: 10px solid ${props => colorizeBorder.shade2(props)};
        }
      }

      &[x-placement^='top'] {
        .na-tooltip-arrow {
          order: 2;
          border-top: 10px solid ${props => colorizeBorder.shade2(props)};
        }
      }
    }
  }
`
export default StyledFullCalendar
