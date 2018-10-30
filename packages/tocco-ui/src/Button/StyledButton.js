import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledButtonGroup} from '../ButtonGroup'
import {
  declareDensity,
  declareFlatBaseColors,
  declareFlatPrimaryColors,
  declareInteractionColors,
  declareOverlay,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

const meltButtons = props => {
  let declaration = ''
  if (!props.melt && props.look === stylingLook.RAISED) {
    declaration = `
      &:not(:last-child) {
        margin-right: ${theme('space.4')(props)};
      }
    `
  } else if (props.melt) {
    declaration = `
      border-radius: 0;

      &:first-child {
        border-top-left-radius: ${theme('radii')(props)};
        border-bottom-left-radius: ${theme('radii')(props)};
      }

      &:last-child {
        border-top-right-radius: ${theme('radii')(props)};
        border-bottom-right-radius: ${theme('radii')(props)};
      }
    `
  }
  return declaration
}

const declareButtonColor = props => {
  let declareColor
  const {ink, look} = props
  const {FLAT, RAISED} = stylingLook
  const {BASE, PRIMARY} = stylingInk
  if (look === FLAT && ink === BASE) {
    declareColor = declareFlatBaseColors
  } else if (look === FLAT && ink === PRIMARY) {
    declareColor = declareFlatPrimaryColors
  } else if (look === RAISED && ink === BASE) {
    declareColor = declareRaisedBaseColors
  } else if (look === RAISED && ink === PRIMARY) {
    declareColor = declareRaisedPrimaryColors
  }
  return declareInteractionColors(declareColor(props), 'html')
}

const declareIconPosition = props => {
  if (props.iconPosition === stylingPosition.APPEND) {
    return `
      justify-content: space-between;
      > span {
        order: -1;
      }
    `
  }
}

const StyledButton = styled.button`
  && {
    align-items: center;
    background-image: none;
    border-radius: ${theme('radii')};
    border: none;
    display: inline-flex;
    margin: 0;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      ${props => declareOverlay(theme('overlays.disabled.color')(props), theme('overlays.disabled.opacity')(props))}
    }

    &:active,
    &:focus {
      outline: none;
    }

    ${props => declareButtonColor(props)}
    ${props => declareDensity(props)}
    ${props => declareIconPosition(props)}

    ${StyledButtonGroup} & {
      ${props => meltButtons(props)}
    }
  }
`

export default StyledButton
