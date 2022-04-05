import styled from 'styled-components'

import {StyledHtmlFormatter} from '../FormattedValue/typeFormatters/HtmlFormatter'
import {declareTypograhpy} from '../Typography'
import {scale, theme} from '../utilStyles'

const ARROW_WIDTH = 16

const StyledBoxWrapper = styled.div`
  && {
    pointer-events: none; // prevent flickering of tooltip
    background-color: ${theme.color('backgroundPopover')};
    max-width: 400px;
    z-index: 100000010;
    padding: ${({rimless}) => (rimless ? '0' : scale.space(0))};
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

  &[data-popper-placement*='bottom'] {
    top: ${ARROW_WIDTH / -2}px;

    &:before {
      border-width: 0 ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px;
      border-color: transparent transparent ${theme.color('backgroundPopover')} transparent;
    }
  }

  &[data-popper-placement*='top'] {
    bottom: ${ARROW_WIDTH / -2.5}px;

    &:before {
      border-width: ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px 0 ${ARROW_WIDTH / 2}px;
      border-color: ${theme.color('backgroundPopover')} transparent transparent transparent;
    }
  }

  &[data-popper-placement*='right'] {
    left: -${ARROW_WIDTH}px;
    top: -6px !important;

    &:before {
      border-width: ${ARROW_WIDTH / 2}px;
      border-color: transparent ${theme.color('backgroundPopover')} transparent transparent;
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

export {StyledArrow, StyledBox, StyledBoxWrapper}
