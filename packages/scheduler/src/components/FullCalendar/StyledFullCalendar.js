import styled from 'styled-components'
import {
  colorizeBorder,
  declareFont,
  scale,
  shadeColor,
  theme
} from 'tocco-ui'

const StyledFullCalendar = styled.div`
  height: 100%;
  
&& {
  .fc{
    h2{
      margin: 0;
    }

    .remove-resource-btn{
      border: none;
      outline: none;
      background: #eee;
      border-radius: 50%;
      margin: 0 2px 0 0;
      height: 20px;
      width: 20px;
      padding: 0;
      vertical-align: 1px;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .fc-cell-content {
      ${declareFont({fontSize: scale.font(-1)})}
    }

    .fc-event{
      ${declareFont()}
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
    }

    .fc-timeline-event .fc-content{
      text-overflow: ellipsis;
    }
  }


  .popover {
    ${declareFont()}
    width: 300px;
    position: absolute;
    z-index: 1060;
    display: none;
    padding: 1px;
    background-color: ${theme.color('paper')};
    background-clip: padding-box;
    border: 1px solid ${props => colorizeBorder.shade2(props)};
    border-radius: ${theme.radii('regular')};

    &.bottom {
      margin-top: 10px;
    }

    .popover-content {
      padding: ${scale.space(-1)} ${scale.space(-1)} 0 ${scale.space(-1)};

      > div > * {
        ${declareFont()}
        margin: 0 0 ${scale.space(-1)} 0;
      }
    }

    .popover-title {
      font-weight: ${theme.fontWeight('bold')};
      font-size: ${scale.font(1)};
      margin: 0;
      padding: ${scale.space(-2)} ${scale.space(-1)};
      background-color: ${props => shadeColor(theme.color('paper')(props), 0.2)};
      border-bottom: 1px solid ${props => colorizeBorder.shade2(props)};
      border-radius: ${theme.radii('regular')} ${theme.radii('regular')} 0 0;
    }

    &.bottom > .arrow {
      left: 50%;
      margin-left: -11px;
      border-top-width: 0;
      border-bottom-color: ${props => colorizeBorder.shade2(props)};
      top: -11px;
    }

    &.bottom > .arrow:after {
      content: " ";
      top: 1px;
      margin-left: -10px;
      border-top-width: 0;
      border-bottom-color: ${props => colorizeBorder.shade2(props)};
    }

    .arrow {
      border-width: 11px;
    }

    .arrow,
    .arrow:after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }

    .arrow:after {
      border-width: 10px;
      content: "";
    }
  }
}
`
export default StyledFullCalendar
