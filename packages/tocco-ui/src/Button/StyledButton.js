import styled, {css} from 'styled-components'

import {StyledButtonGroup} from '../ButtonGroup'
import {
  declareDensity,
  declareFont,
  declareInteractionColors,
  design,
  generateInteractionColors,
  scale,
  theme
} from '../utilStyles'

let scheme

const spaceButtons = () => css`
  &:not(:last-child) {
    margin-right: ${scale.space(-1)};
  }
`

const meltButtons = () => css`
  border-radius: 0;

  &:first-child {
    border-top-left-radius: ${theme.radii('regular')};
    border-bottom-left-radius: ${theme.radii('regular')};
  }

  &:last-child {
    border-top-right-radius: ${theme.radii('regular')};
    border-bottom-right-radius: ${theme.radii('regular')};
  }
`

const declareButtonColor = props => {
  const {ink, look} = props
  const {BALL, FLAT, RAISED} = design.look
  const {BASE, PRIMARY} = design.ink

  if (look === FLAT && ink === PRIMARY) {
    scheme = 'flatPrimary'
  } else if ((look === BALL || look === RAISED) && ink === BASE) {
    scheme = 'raisedBase'
  } else if ((look === BALL || look === RAISED) && ink === PRIMARY) {
    scheme = 'raisedPrimary'
  } else {
    scheme = 'flatBase'
  }

  return declareInteractionColors(generateInteractionColors(props, scheme), 'html')
}

const declareIconPosition = props => {
  if (props.icon || props.pending) {
    const space = props.dense ? scale.space(-4)(props) : scale.space(-3)(props)
    if (props.iconPosition === design.position.APPEND) {
      return `
        > span {
          order: -1;
          margin-right: ${space};
        }
       `
    }

    return `
      > span {
        margin-left: ${space};
      }
     `
  }
}

const declareBall = () => css`
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  // ensure that width has at least the size of height
  min-width: calc(1rem
    * ${theme.fontSize('base')}
    * ${theme.lineHeight('regular')}
    + 2.4 * ${scale.space(-3)});

  // increase height to the size of width
  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`

const StyledButton = styled.button`
  && {
    box-sizing: border-box; //nice2 reset
    align-items: center;
    background-image: none;
    border-radius: ${theme.radii('regular')};
    border: none;
    display: inline-flex;
    margin: 0;
    position: relative;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:active,
    &:focus {
      outline: none;
    }

    ${declareFont()}
    ${props => declareButtonColor(props)}
    ${props => declareDensity(props)}
    ${props => declareIconPosition(props)}

    ${props => props.look === design.look.BALL && declareBall()}

    ${StyledButtonGroup} & {
      ${props => !props.melt && props.look === design.look.RAISED && spaceButtons()}
      ${props => props.melt && meltButtons()}
    }
  }
`

export default StyledButton
