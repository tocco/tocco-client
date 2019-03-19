import {
  getLuminance,
  transparentize
} from 'polished'

import {
  generateInteractionColor,
  scale
} from '../utilStyles'

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
    color: text[0],
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
      backgroundColor: state.isDisabled ? paper[1] : paper[0],
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
        marginRight: `${scale.space(outerTheme, -2)}`
      },
      '> span > button': {
        width: '2.6rem'
      }
    }),
    input: (base, state) => ({
      margin: `0 0 ${scale.space(outerTheme, -2)} 0`
    }),
    menuList: (base, state) => ({
      ...base,
      ...typography
    }),
    multiValue: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      margin: `0 ${scale.space(outerTheme, -2)} ${scale.space(outerTheme, -2)} 0`
    }),
    multiValueLabel: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      color: text[0],
      fontSize: 'inherit'
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      color: text[0],
      display: state.isDisabled ? 'none' : 'flex',
      ':hover': {
        ...base[':hover'],
        color: text[1],
        backgroundColor: paper[2],
        cursor: 'pointer'
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: text[0],
      margin: `0 ${scale.space(outerTheme, -2)}`
    }),
    valueContainer: (base, state) => ({
      ...base,
      padding: `${scale.space(outerTheme, -2)} ${scale.space(outerTheme, -1)} 0 ${scale.space(outerTheme, -2)}`
    })
  }
}

export {
  reactSelectStyles,
  reactSelectTheme
}
