import styled from 'styled-components'
import _get from 'lodash/get'

import {declareTypograhpy} from '../Typography'
import {
  scale,
  shadeColor,
  theme
} from '../utilStyles'

const BORDER_WIDTH = 1
const ARROW_WIDTH = 16

const StyledBoxWrapper = styled('div')`
  && {
    max-width: calc(100vw - ${props => props.spacer}px - ${props => props.spacer}px);
    margin: ${ARROW_WIDTH / 2}px 0;
    z-index: 100000010;
  }
`

const StyledBox = styled('div')`
  && {
    background-color: ${theme.color('paper')};
    display: flex;
    border: ${BORDER_WIDTH}px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${theme.radii('regular')};
    padding: ${props => props.rimless ? '0' : scale.space(-1)};
    ${props => props.isPlainHtml && declareTypograhpy(props, 'html')}
  }
`

const StyledArrow = styled('i')`
  position: absolute;
  width: ${ARROW_WIDTH}px;
  height: ${ARROW_WIDTH / 2}px;
  left: 0;

  &[data-placement*='bottom'] {
    top: ${ARROW_WIDTH / -2}px;

    &:before {
      border-width: 0 ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px;
      border-color: transparent transparent ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)} transparent;
    }
  }

  &[data-placement*='top'] {
    bottom: ${ARROW_WIDTH / -2}px;

    &:before {
      border-width: ${ARROW_WIDTH / 2}px ${ARROW_WIDTH / 2}px 0 ${ARROW_WIDTH / 2}px;
      border-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)} transparent transparent transparent;
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
