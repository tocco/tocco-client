import {
  getLuminance,
  transparentize
} from 'polished'

import {generateInteractionColor} from '../utilStyles'

const reactSelectTheme = (theme, outerTheme) => ({
  ...theme,
  borderRadius: outerTheme.radii.regular,
  colors: {
    ...theme.colors,
    primary: outerTheme.colors.signal.info.text,
    primary75: outerTheme.colors.signal.info.text,
    primary50: outerTheme.colors.signal.info.paper,
    primary25: outerTheme.colors.signal.info.paper,
    danger: outerTheme.colors.signal.danger.text,
    dangerLight: outerTheme.colors.signal.danger.paper
  }
})

const reactSelectStyles = outerTheme => {
  const paper = generateInteractionColor(outerTheme.colors.paper)
  const text = generateInteractionColor(outerTheme.colors.text, {
    action: getLuminance(outerTheme.colors.paper) > 0.5 ? 'darken' : 'lighten'
  })
  const infoText = outerTheme.colors.signal.info.text
  const typography = {
    color: text,
    fontFamily: outerTheme.fontFamily.regular,
    fontSize: `${outerTheme.fontSize.base}rem`,
    fontWeight: outerTheme.fontWeights.regular,
    lineHeight: outerTheme.lineHeights.regular
  }
  return {
    container: (base, state) => ({
      ...base,
      ...typography,
      outline: 0
    }),
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused
        ? infoText
        : state.theme.colors.neutral20,
      boxShadow: state.isFocused
        ? `0 0 8px ${transparentize(0.4, infoText)}`
        : null,
      '&:hover': {
        borderColor: state.isFocused ? infoText : state.theme.colors.neutral30
      }
    }),
    noOptionsMessage: (base, state) => ({
      ...base,
      color: outerTheme.colors.signal.warning.text,
      cursor: 'default',
      textAlign: 'left'
    }),
    loadingMessage: (base, state) => ({
      ...base,
      color: outerTheme.colors.signal.warning.text,
      cursor: 'default',
      textAlign: 'left'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? paper[2]
        : state.isFocused
          ? paper[1]
          : paper[0],
      cursor: 'pointer',
      ':active': {
        backgroundColor: state.isSelected
          ? paper[2]
          : paper[1]
      }
    }),
    indicatorsContainer: (base, state) => ({
      ...base,
      '> span': {
        marginRight: state.theme.spacing.baseUnit
      },
      '> span > button': {
        width: '2.6rem'
      }
    }),
    menuList: (base, state) => ({
      ...base,
      ...typography
    }),
    multiValue: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      ':hover': {
        ...base[':hover'],
        color: text[0],
        backgroundColor: outerTheme.colors.signal.danger.paper,
        cursor: 'pointer'
      }
    }),
    valueContainer: (base, state) => ({
      ...base,
      padding: `${state.theme.spacing.baseUnit / 2}px ${state.theme.spacing.baseUnit}px`
    })
  }
}

export {
  reactSelectStyles,
  reactSelectTheme
}
