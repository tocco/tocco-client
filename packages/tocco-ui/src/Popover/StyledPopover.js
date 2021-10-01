import styled from 'styled-components'

import {declareTypograhpy} from '../Typography'
import {
  scale,
  theme
} from '../utilStyles'
import {StyledHtmlFormatter} from '../FormattedValue/typeFormatters/HtmlFormatter'

const ARROW_WIDTH = 16

const StyledBoxWrapper = styled.div`
  && {
    pointer-events: none; // prevent flickering of tooltip
    background-color: ${theme.color('secondaryLight')};
    max-width: 400px;
    z-index: 100000010;
    padding: ${({rimless}) => rimless ? '0' : scale.space(-1)};
  }
`

const StyledBox = styled.div`
  && {
    ${props => props.isPlainHtml && declareTypograhpy(props, 'html')};

    &,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ${StyledHtmlFormatter} {
      color: ${theme.color('paper')};
    }
  }
`

const StyledArrow = styled.i`
  position: absolute;
  width: ${ARROW_WIDTH}px;
  height: ${ARROW_WIDTH / 2}px;
  left: 0;

  &[data-placement*='bottom'] {
    top: ${ARROW_WIDTH / -2}px;

    &:before {
      border-width: 0 ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px;
      border-color: transparent transparent ${theme.color('secondaryLight')} transparent;
    }
  }

  &[data-placement*='top'] {
    bottom: ${ARROW_WIDTH / -2}px;

    &:before {
      border-width: ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px 0 ${ARROW_WIDTH / 2}px;
      border-color: ${theme.color('secondaryLight')} transparent transparent transparent;
    }
  }

  &[data-placement*='right'] {
    left: -${ARROW_WIDTH}px;
    top: -6px !important;

    &:before {
      border-width: ${ARROW_WIDTH / 2}px;
      border-color: transparent ${theme.color('secondaryLight')} transparent transparent;
    }
  }

  &:before {
    content: '';
    display: block;
    border-style: solid;
    width: 0;
    height: 0;
  }
`

export {
  StyledArrow,
  StyledBox,
  StyledBoxWrapper
}
