import {
  getLuminance
} from 'polished'

import {
  generateDisabledShade,
  generateShades,
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
  const paper = generateShades(outerTheme.colors.paper)
  const text = generateShades(outerTheme.colors.text, {
    action: getLuminance(outerTheme.colors.paper) > 0.5 ? 'darken' : 'lighten'
  })
  const textDisabled = generateDisabledShade(outerTheme.colors.text)
  const space2 = scale.space(-2)({theme: outerTheme})
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
      backgroundColor: paper[0],
      borderWidth: 0,
      boxShadow: null,
      minHeight: 0,
      flexWrap: 'nowrap'
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
      'backgroundColor': state.isSelected
        ? paper[2]
        : state.isFocused
          ? paper[1]
          : paper[0],
      'cursor': 'pointer',
      ':active': {
        backgroundColor: state.isSelected
          ? paper[2]
          : paper[1]
      }
    }),
    indicatorsContainer: (base, state) => ({
      ...base,
      'alignSelf': 'flex-end',
      '> span': {
        marginRight: `${space2}`
      },
      '> span:last-child': {marginRight: `-${space2}`}
    }),
    input: (base, state) => ({
      margin: `0 ${space2} 0 0`,
      display: 'flex',
      alignItems: 'flex-end',
      minHeight: '2.6rem'
    }),
    menuList: (base, state) => ({
      ...base,
      ...typography
    }),
    multiValue: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      margin: `${space2} ${space2} 0 0`
    }),
    multiValueLabel: (base, state) => ({
      ...base,
      borderRadius: outerTheme.radii.regular,
      color: state.isDisabled ? textDisabled : text[0],
      fontSize: 'inherit',
      whiteSpace: 'wrap'
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      'borderRadius': outerTheme.radii.regular,
      'color': text[0],
      'display': state.isDisabled ? 'none' : 'flex',
      ':hover': {
        ...base[':hover'],
        color: text[1],
        backgroundColor: paper[2],
        cursor: 'pointer'
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: state.isDisabled ? textDisabled : text[0],
      margin: 0
    }),
    valueContainer: (base, state) => ({
      ...base,
      padding: 0,
      margin: 0,
      overflow: 'visible'
    })
  }
}

export {
  reactSelectStyles,
  reactSelectTheme
}
