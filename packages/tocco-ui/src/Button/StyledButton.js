import styled from 'styled-components'
import _get from 'lodash/get'

import {StyledButtonGroup} from '../ButtonGroup'
import {
  declareDensity,
  declareFont,
  declareInteractionColors,
  generateFlatBaseColors,
  generateFlatPrimaryColors,
  generateRaisedBaseColors,
  generateRaisedPrimaryColors,
  scale,
  design
} from '../utilStyles'

const meltButtons = props => {
  let declaration = ''
  if (!props.melt && props.look === design.look.RAISED) {
    declaration = `
      &:not(:last-child) {
        margin-right: ${scale.space(props.theme, -1)};
      }
    `
  } else if (props.melt) {
    declaration = `
      border-radius: 0;

      &:first-child {
        border-top-left-radius: ${props => _get(props.theme, 'radii.regular')};
        border-bottom-left-radius: ${props => _get(props.theme, 'radii.regular')};
      }

      &:last-child {
        border-top-right-radius: ${props => _get(props.theme, 'radii.regular')};
        border-bottom-right-radius: ${props => _get(props.theme, 'radii.regular')};
      }
    `
  }
  return declaration
}

const declareButtonColor = props => {
  let declareColor
  const {ink, look} = props
  const {BALL, FLAT, RAISED} = design.look
  const {BASE, PRIMARY} = design.ink

  if (look === FLAT && ink === PRIMARY) {
    declareColor = generateFlatPrimaryColors
  } else if ((look === BALL || look === RAISED) && ink === BASE) {
    declareColor = generateRaisedBaseColors
  } else if ((look === BALL || look === RAISED) && ink === PRIMARY) {
    declareColor = generateRaisedPrimaryColors
  } else {
    declareColor = generateFlatBaseColors
  }

  return declareInteractionColors(declareColor(props), 'html')
}

const declareIconPosition = props => {
  if (props.iconPosition === design.position.APPEND) {
    return `
      justify-content: space-between;
      > span {
        order: -1;
      }
    `
  }
}

const declareBall = props => {
  if (props.look === design.look.BALL) {
    return `
      border-radius: 50%;
      justify-content: center;
      align-items: center;

      // ensure that width has at least the size of height
      min-width: calc(1rem
        * ${_get(props.theme, 'fontSize.base')}
        * ${_get(props.theme, 'lineHeights.regular')}
        + 2 * ${scale.space(props.theme, -3)});

      // increase height to the size of width
      &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    `
  }
}

const StyledButton = styled.button`
  && {
    align-items: center;
    background-image: none;
    border-radius: ${props => _get(props.theme, 'radii.regular')};
    border: none;
    display: inline-flex;
    margin: 0;
    position: relative;
    text-align: center;
    text-transform: ${props => props.theme.matchNiceDesign ? 'none' : 'uppercase'};
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

    ${props => declareFont(props)}
    ${props => declareButtonColor(props)}
    ${props => declareDensity(props)}
    ${props => declareIconPosition(props)}
    ${props => declareBall(props)}

    ${StyledButtonGroup} & {
      ${props => meltButtons(props)}
    }
  }
`

export default StyledButton
