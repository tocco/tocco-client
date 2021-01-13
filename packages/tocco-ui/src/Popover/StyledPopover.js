import styled from 'styled-components'

import {declareTypograhpy} from '../Typography'
import {
  scale,
  theme
} from '../utilStyles'

const BORDER_WIDTH = 1
const ARROW_WIDTH = 16

const StyledBoxWrapper = styled.div`
  && {
    background-color: ${theme.color('paper')};
    max-width: calc(100vw - ${({spacer}) => `${spacer}px - ${spacer}px`});
    margin: ${ARROW_WIDTH / 2}px 0;
    z-index: 100000010;
    border: ${BORDER_WIDTH}px solid ${theme.color('secondaryLight')};
    padding: ${({rimless}) => rimless ? '0' : scale.space(-1)};
  }
`
export const StyledSpan = styled.span`

`

const StyledBox = styled.div`
  && {
    ${props => props.isPlainHtml && declareTypograhpy(props, 'html')}
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
