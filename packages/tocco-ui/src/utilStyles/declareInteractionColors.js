import {theme} from 'styled-system'

const declareInteractionColors = colors => {
  return `
    background-color: ${colors.defaultBackground};
    color: ${colors.defaultColor};

    &:enabled {
      &:focus,
      &:hover {
        background-color: ${colors.focusBackground};
        color: ${colors.focusColor};
      }

      /* :active must be declared after :hover and :focus to visualize state change */
      &:active {
        background-color: ${colors.activeBackground};
        color: ${colors.activeColor};
      }
    }
  `
}

const declareFlatBaseColors = props => {
  return {
    defaultColor: theme('colors.base.text')(props),
    defaultBackground: theme('colors.base.paper')(props),
    focusColor: theme('colors.base.line.1')(props),
    focusBackground: theme('colors.base.fill.0')(props),
    activeColor: theme('colors.base.line.2')(props),
    activeBackground: theme('colors.base.fill.1')(props)
  }
}

const declareFlatPrimaryColors = props => {
  return {
    defaultColor: theme('colors.primary.line.0')(props),
    defaultBackground: theme('colors.base.paper')(props),
    focusColor: theme('colors.primary.line.1')(props),
    focusBackground: theme('colors.base.fill.0')(props),
    activeColor: theme('colors.primary.line.2')(props),
    activeBackground: theme('colors.base.fill.1')(props)
  }
}

const declareRaisedBaseColors = props => {
  return {
    defaultColor: theme('colors.base.line.0')(props),
    defaultBackground: theme('colors.base.fill.0')(props),
    focusColor: theme('colors.base.line.1')(props),
    focusBackground: theme('colors.base.fill.1')(props),
    activeColor: theme('colors.base.line.2')(props),
    activeBackground: theme('colors.base.fill.2')(props)
  }
}

const declareRaisedPrimaryColors = props => {
  return {
    defaultColor: theme('colors.primary.fillContrast.0')(props),
    defaultBackground: theme('colors.primary.fill.0')(props),
    focusColor: theme('colors.primary.fillContrast.1')(props),
    focusBackground: theme('colors.primary.fill.1')(props),
    activeColor: theme('colors.primary.fillContrast.2')(props),
    activeBackground: theme('colors.primary.fill.2')(props)
  }
}

export {
  declareFlatBaseColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  declareFlatPrimaryColors
}
