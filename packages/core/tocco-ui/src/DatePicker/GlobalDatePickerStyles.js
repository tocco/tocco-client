/* eslint-disable max-len */
import {darken, lighten} from 'polished'
import {createGlobalStyle} from 'styled-components'

import {theme, declareFont, scale} from '../utilStyles'

const secondaryLight = theme.color('secondaryLight')
const paper = theme.color('paper')
const secondary = theme.color('secondary')

// put long css rule in variable to avoid eslint problem https://github.com/eslint/eslint/issues/11138
const disableTitleCss = `
  .react-datepicker__current-month.react-datepicker__current-month--hasYearDropdown.react-datepicker__current-month--hasMonthDropdown {
    // Avoid showing the month and year a second time when it has month and year dropdowns.
    display: none;
  }
`

export const GlobalDatePickerStyles = createGlobalStyle`
  .react-datepicker-popper {
    && {
      z-index: 5;
      margin: 0;
    }
  }

  .react-datepicker {
    && {
      * {
        box-sizing: content-box; // prevent box-sizing problems in widgets
      }
      border-radius: 0;
      border: 1px solid ${secondaryLight};
      ${declareFont()}

      .react-datepicker__header {
        ${declareFont()}
        border-radius: 0;
        background-color: ${secondaryLight};
        padding-bottom: 0;
      }

      .react-datepicker__navigation {
        top: 3px;
      }

      .react-datepicker__navigation--previous,
      .react-datepicker__navigation--next {
        margin-top: ${scale.space(-0.6)};
      }
      ${disableTitleCss}

      .react-datepicker__year-read-view--down-arrow,
      .react-datepicker__month-read-view--down-arrow,
      .react-datepicker__month-year-read-view--down-arrow,
      .react-datepicker__navigation-icon:before {
        border-color: ${paper} !important;
        border-width: 1.5px 1.5px 0 0;
      }

      .react-datepicker__header__dropdown {
        font-size: ${scale.font(2.85)};

        /* decrease padding to prevent overflow on small screens */
        @media only screen and (max-width: 480px) {
          font-size: ${scale.font(1.8)};
        }
      }

      .react-datepicker__current-month {
        ${declareFont({
          fontWeight: theme.fontWeight('bold')
        })}
      }

      .react-datepicker__day-name {
        color: ${paper};
        font-size: ${scale.font(-2)};
      }

      .react-datepicker__day,
      .react-datepicker__day-name {
        border: 1px solid transparent;
        padding: ${scale.space(-0.6)};

        /* decrease padding to prevent overflow on small screens */
        @media only screen and (max-width: 480px) {
          padding: ${scale.space(-1.2)};
        }
      }

      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: ${secondary};
        border-color: ${secondary};
        border-radius: 50%;
      }

      .react-datepicker__day--today,
      .react-datepicker__month-text--today,
      .react-datepicker__quarter-text--today,
      .react-datepicker__year-text--today {
        border-radius: 50%;
        border-color: ${secondary};
      }

      .react-datepicker__today-button {
        ${declareFont()}
        background-color: ${paper};
        border-top: 0;
        padding-bottom: ${scale.space(-0.5)};
        padding-top: 0;

        &:hover > button {
          background-color: ${({theme}) => darken(0.1, theme.colors.paper)};
        }
      }

      .react-datepicker__input-time-container {
        display: flex;
        justify-content: center;
        margin: 5px 0;

        .react-datepicker-time__input {
          margin: 0;
        }
      }

      .react-datepicker__header__dropdown.react-datepicker__header__dropdown--scroll {
        width: 190px;
        margin: 8px auto 0;
        display: grid;
        grid-template-columns: 100px 85px;
      }

      .react-datepicker__month-read-view,
      .react-datepicker__year-read-view {
        color: ${paper};
        visibility: visible !important;
      }

      .react-datepicker__year-option,
      .react-datepicker__month-option,
      .react-datepicker__month-year-option {
        font-size: ${scale.font(0)};
      }

      .react-datepicker__year-option:first-of-type,
      .react-datepicker__month-option:first-of-type,
      .react-datepicker__month-year-option:first-of-type,
      .react-datepicker__year-option:last-of-type,
      .react-datepicker__month-option:last-of-type,
      .react-datepicker__month-year-option:last-of-type {
        border-radius: 0;
      }

      .react-datepicker__year-read-view--down-arrow,
      .react-datepicker__month-read-view--down-arrow,
      .react-datepicker__month-year-read-view--down-arrow {
        top: 6px;
        right: -10px;
        width: 5px;
        height: 5px;

        /* decrease padding to prevent overflow on small screens */
        @media only screen and (max-width: 480px) {
          right: -8px;
        }
      }

      .react-datepicker__year-read-view--down-arrow {
        right: -4px;

        /* decrease padding to prevent overflow on small screens */
        @media only screen and (max-width: 480px) {
          right: 3px;
        }
      }

      .react-datepicker__day:hover,
      .react-datepicker__month-text:hover,
      .react-datepicker__quarter-text:hover,
      .react-datepicker__year-text:hover {
        background-color: ${secondaryLight};
        border-radius: 50%;
        color: ${paper};
      }

      .react-datepicker__year-dropdown {
        left: 40%;
        top: 45px;
      }

      .react-datepicker__navigation--years-upcoming:before {
        border-width: 1.5px 1.5px 0 0;
        border-color: ${theme.color('text')};
        border-style: solid;
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 12px;
        height: 5px;
        width: 5px;
        transform: rotate(-45deg);
      }

      .react-datepicker__navigation--years-previous:before {
        border-width: 1.5px 1.5px 0 0;
        border-color: ${theme.color('text')};
        border-style: solid;
        content: '';
        display: block;
        position: absolute;
        top: 6px;
        left: 12px;
        height: 5px;
        width: 5px;
        transform: rotate(135deg);
      }

      .react-datepicker__year-dropdown,
      .react-datepicker__month-dropdown,
      .react-datepicker__month-year-dropdown {
        background-color: ${paper};
        border-radius: 0;
        border-color: ${secondaryLight};
        box-shadow: 0 0 5px rgb(0 0 0 / 30%);
      }

      .react-datepicker__year-option:hover,
      .react-datepicker__month-option:hover,
      .react-datepicker__month-year-option:hover {
        background-color: ${({theme}) => darken(0.1, theme.colors.paper)};
      }

      .react-datepicker__month-option--selected {
        left: 10px;
      }

      .react-datepicker__day--outside-month {
        color: ${({theme}) => lighten(0.7, theme.colors.text)};
      }
    }
  }
`
