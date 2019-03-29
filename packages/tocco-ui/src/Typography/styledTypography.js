import _range from 'lodash/range'
import _get from 'lodash/get'

import {
  declareFont,
  scale,
  shadeColor,
  theme
} from '../utilStyles'

export const declareTypograhpy = (props, mode) => {
  let css = `
    ${declareFont(props)}
    a {
      color: ${theme.color('primary')(props)}
      text-decoration: none;

      &:hover,
      &:focus {
        color: ${props => shadeColor(_get(props.theme, 'colors.primary'), 1)}
        text-decoration: underline;
      }

      &:active {
        color: ${props => shadeColor(_get(props.theme, 'colors.primary'), 2)}
      }
    }

    b,
    strong {
      font-weight: ${theme.fontWeight('bold')(props)}
    }

    em,
    i {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }

    h1 {font-size: ${scale.font(5)(props)};}
    h2 {font-size: ${scale.font(4)(props)};}
    h3 {font-size: ${scale.font(3)(props)};}
    h4 {font-size: ${scale.font(2)(props)};}
    h5 {font-size: ${scale.font(1)(props)};}
    h6 {font-size: ${scale.font(0)(props)};}

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme.fontWeight('bold')(props)};
      margin-top: ${scale.space(0)(props)};
      margin-bottom: ${scale.space(-1)(props)};

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
      margin-bottom: ${scale.space(-1)(props)};
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
        margin: 0 0 ${scale.space(-1)(props)} 0;
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
        margin: 0 0 ${scale.space(-1)(props)} 1.6rem;
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
