import _range from 'lodash/range'
import {theme} from 'styled-system'

import {
  declareFont,
  fontScale,
  spaceScale
} from '../utilStyles'

export const declareTypograhpy = (props, mode) => {
  let css = `
    ${declareFont(props)}
    a {
      color: ${theme('colors.primary.line.0')(props)}
      text-decoration: none;

      &:hover,
      &:focus {
        color: ${theme('colors.primary.line.1')(props)}
        text-decoration: underline;
      }

      &:active {
        color: ${theme('colors.primary.line.2')(props)}
      }
    }

    b,
    strong {
      font-weight: ${theme('fontWeights.bold')(props)}
    }

    em,
    i {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }

    h1 {font-size: ${fontScale(props, 5)}}
    h2 {font-size: ${fontScale(props, 4)}}
    h3 {font-size: ${fontScale(props, 3)}}
    h4 {font-size: ${fontScale(props, 2)}}
    h5 {font-size: ${fontScale(props, 1)}}
    h6 {font-size: ${theme('fontSizeBase')(props)}rem}

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme('fontWeights.bold')(props)};
      margin-top: ${theme('spaceBase')(props)}rem;
      margin-bottom: ${spaceScale(props, -1)};

      + h1,
      + h2,
      + h3,
      + h4,
      + h5,
      + h6,
      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    p {
      margin-bottom: ${spaceScale(props, -1)};
      &:last-child {
        margin-bottom: 0;
      }
    }
  `

  if (mode === 'quill') {
    css = `
      ${css}
      ol,
      ul {
        display: block;
        list-style-position: outside;
        margin: 0 0 ${spaceScale(props, -1)} 0;
        padding: 0;

        &:last-child {
          margin-bottom: 0;
        }

        li {
          padding-left: 1.6rem;

          &:before {
            width: 1.6rem;
            margin: 0 0 0 -1.6rem;
            text-align: left;
          }
        }

        ${_range(1, 11).map(value =>
    `.ql-indent-${value} {padding-left: ${(value + 1) * 1.6}rem;}`
  ).join('')}
      }

      ol {
        ${_range(1, 11).map(value =>
    `li.ql-indent-${value}:before {content: counter(list-${value}, decimal) '. ';}`
  ).join('')}
      }
    `
  } else {
    css = `
      ${css}
      ol,
      ul {
        display: block;
        list-style-position: outside;
        margin: 0 0 ${spaceScale(props, -1)} 1.6rem;
        padding: 0;

        ol,
        ul,
        &:last-child {
          margin-bottom: 0;
        }
      }

      ol li {
        list-style-type: decimal;
      }

      ul li {
        list-style-type: disc;
      }
    `
  }

  return css
}
