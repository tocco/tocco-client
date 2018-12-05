import {getLuminance} from 'polished'

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

  return {
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? paper[2]
        : state.isFocused
          ? paper[1]
          : paper[0],
      ':active': {
        backgroundColor: state.isSelected
          ? paper[2]
          : paper[1]
      }
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      ':hover': {
        ...base[':hover'],
        color: text[0],
        backgroundColor: outerTheme.colors.signal.danger.paper,
        cursor: 'pointer'
      }
    })
  }
}

export {
  reactSelectStyles,
  reactSelectTheme
}
