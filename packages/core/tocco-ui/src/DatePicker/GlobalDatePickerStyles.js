import {createGlobalStyle} from 'styled-components'

import {theme, declareFont} from '../utilStyles'

export const GlobalDatePickerStyles = createGlobalStyle`
  .react-datepicker-popper {
    && {
      z-index: 5;
      margin: 0;
    }
  }

  .react-datepicker {
    && {
      ${declareFont()}

      .react-datepicker__header {
        background-color: #f2f2f2;
      }

      .react-datepicker__header,
      .react-datepicker__header select {
        ${declareFont()}
      }

      .react-datepicker__current-month {
        ${declareFont({
          fontWeight: theme.fontWeight('bold')
        })}
      }

      .react-datepicker__day,
      .react-datepicker__day-name {
        width: 2.5rem;
        line-height: 2.5rem;
      }

      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: ${theme.color('signal.info.text')};
      }

      .react-datepicker__today-button {
        background-color: #f2f2f2;
        ${declareFont({
          fontWeight: theme.fontWeight('bold')
        })}
      }

      .react-datepicker__input-time-container {
        display: flex;
        justify-content: center;
        margin: 5px 0;

        .react-datepicker-time__input {
          margin: 0;
        }
      }
    }
  }
`
