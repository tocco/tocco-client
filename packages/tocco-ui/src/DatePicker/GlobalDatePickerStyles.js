import {createGlobalStyle} from 'styled-components'

import {theme, declareFont, scale} from '../utilStyles'

const calendarWidth = 270
const secondaryLight = theme.color('secondaryLight')
const secondary = theme.color('secondary')
const paper = theme.color('paper')
const regular = theme.fontWeight('regular')
const baseSpace = scale.space(-2)

export const GlobalDatePickerStyles = createGlobalStyle`
  .flatpickr-calendar {
    && {
      ${declareFont()}
      width: ${calendarWidth}px;
      border: 1px solid ${secondaryLight};
      border-radius: 0;
    }

    &.arrowTop:before,
    &.arrowTop:after {
      border-bottom-color: ${secondaryLight} !important;
    }

    &.arrowBottom:before,
    &.arrowBottom:after {
      border-top-color: ${secondaryLight} !important;
    }

    .flatpickr-rContainer {
      width: 100%;
    }

    .dayContainer {
      padding-top: ${baseSpace};
      padding-right: ${baseSpace};
      padding-bottom: ${baseSpace};
      width: ${calendarWidth}px;
      min-width: ${calendarWidth}px;
      max-width: ${calendarWidth}px;
    }

    .numInput.cur-year,
    .flatpickr-current-month span.cur-month{
      font-weight: ${regular};
    }

    .flatpickr-weekday {
      font-size: ${scale.font(-2)};
      font-weight: ${regular};
    }

    .flatpickr-days {
      width: ${calendarWidth}px;
    }

    .flatpickr-day.today {
      border-color: ${secondary};
      font-weight: ${theme.fontWeight('bold')};
    }

    .flatpickr-day {
      max-width: 34px;
      height: 34px;
      line-height: 34px;
      margin-bottom: ${baseSpace};
      font-weight: ${regular};
    }

    .flatpickr-current-month {
      left: 17.5%;
    }

    .flatpickr-months .flatpickr-month {
      border-radius: 0;
    }

    .flatpickr-months .flatpickr-month,
    .flatpickr-weekdays,
    .flatpickr-weekday {
      background-color: ${secondaryLight};
      color: ${paper};
    }

    .flatpickr-day.selected,
    .flatpickr-day.startRange,
    .flatpickr-day.endRange,
    .flatpickr-day.selected.inRange,
    .flatpickr-day.startRange.inRange,
    .flatpickr-day.endRange.inRange,
    .flatpickr-day.selected:focus,
    .flatpickr-day.startRange:focus,
    .flatpickr-day.endRange:focus,
    .flatpickr-day.selected:hover,
    .flatpickr-day.startRange:hover,
    .flatpickr-day.endRange:hover,
    .flatpickr-day.selected.prevMonthDay,
    .flatpickr-day.startRange.prevMonthDay,
    .flatpickr-day.endRange.prevMonthDay,
    .flatpickr-day.selected.nextMonthDay,
    .flatpickr-day.startRange.nextMonthDay,
    .flatpickr-day.endRange.nextMonthDay,
    .flatpickr-day.today:hover,
    .flatpickr-day.today:focus {
      background-color: ${secondary};
      border-color: ${secondary};
    }

    .flatpickr-day.inRange,
    .flatpickr-day.prevMonthDay.inRange,
    .flatpickr-day.nextMonthDay.inRange,
    .flatpickr-day.today.inRange,
    .flatpickr-day.prevMonthDay.today.inRange,
    .flatpickr-day.nextMonthDay.today.inRange,
    .flatpickr-day:hover,
    .flatpickr-day.prevMonthDay:hover,
    .flatpickr-day.nextMonthDay:hover,
    .flatpickr-day:focus,
    .flatpickr-day.prevMonthDay:focus,
    .flatpickr-day.nextMonthDay:focus {
      background-color: ${secondaryLight};
      border-color: ${secondaryLight};
      color: ${paper};
    }

    .flatpickr-months .flatpickr-prev-month,
    .flatpickr-months .flatpickr-next-month {
      color: ${paper};
      fill: ${paper};

      &:hover svg {
        color: ${secondary};
        fill: ${secondary};
      }
    }
  }
`
