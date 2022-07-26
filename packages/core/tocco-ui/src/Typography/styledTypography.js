import _get from 'lodash/get'

import {scale, shadeColor, theme} from '../utilStyles'

export const declareTypograhpy = (props, mode) => {
  let css = `
    color: ${theme.color('text')(props)};
    font-family: ${theme.fontFamily('regular')(props)};
    font-size: ${scale.font(0)(props)};
    font-style: ${'normal'};
    font-weight: ${theme.fontWeight('regular')(props)};
    line-height: ${theme.lineHeight('regular')(props)};

    a {
      color: ${theme.color('secondary')(props)};

      &:hover,
      &:focus {
        color: ${shadeColor(_get(props.theme, 'colors.secondary'), 1)};
        text-decoration: underline;
      }

      &:active {
        color: ${shadeColor(_get(props.theme, 'colors.secondary'), 2)};
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

  if (mode !== 'ckeditor') {
    css = `
      ${css}
      a {
        text-decoration: none;  
      }

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
