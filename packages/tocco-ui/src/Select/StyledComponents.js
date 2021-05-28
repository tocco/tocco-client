import styled from 'styled-components'
import TetherComponent from 'react-tether'
import {components} from 'react-select'
import {getLuminance} from 'polished'

import {declareFont, generateDisabledShade, generateShades, scale, theme} from '../utilStyles'
import {StyledScrollbar} from '../Layout'

export const StyledIndicatorsContainerWrapper = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${theme.color('paper')};
`

export const StyledTether = styled(TetherComponent)`
  && {
    z-index: 1;
  }
`

export const StyledMenu = styled(components.Menu)`
  && {
    margin: 8px 0 0 -8.5px;
    width: calc(${({wrapperWidth}) => wrapperWidth}px + 15.8px);
    position: relative;

    .tether-target-attached-top & {
      transform: translateY(-${({wrapperHeight}) => wrapperHeight + 6}px);
    }
  }
`

export const StyledMoreOptionsAvailable = styled.div`
  && {
    ${props => declareFont(props, {
  color: theme.color('signal.warning.text'),
  lineHeight: 'normal'
})}
    cursor: default;
    padding: ${({reactSelectTheme}) =>
  `${reactSelectTheme.spacing.baseUnit * 2}px ${reactSelectTheme.spacing.baseUnit * 3}px`
};
  }
`

export const reactSelectTheme = (theme, outerTheme) => ({
  ...theme,
  borderRadius: 0,
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

export const reactSelectStyles = outerTheme => {
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
      outline: 0,
      backgroundColor: 'red'
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
        ? `${outerTheme.colors.secondary} !important` // force to stay on hover
        : state.isFocused
          ? outerTheme.colors.secondaryLight
          : paper[0],
      'color': state.isSelected
        ? paper[0]
        : state.isFocused
          ? paper[0]
          : text[0],
      'cursor': 'pointer',
      ':hover': {
        backgroundColor: outerTheme.colors.secondaryLight,
        color: paper[0]
      },
      ':active': {
        backgroundColor: state.isSelected
          ? paper[2]
          : outerTheme.colors.secondaryLight,
        color: paper[0]
      }
    }),
    indicatorsContainer: (base, state) => ({
      ...base,
      'alignSelf': 'flex-end',
      '> *': {
        padding: '0 !important;', // resets react-select padding
        marginRight: space2
      },
      '> :last-child': {
        marginRight: `-${space2}`
      }
    }),
    input: (base, state) => ({
      margin: `0 ${space2} 0 0`,
      display: 'flex',
      alignItems: 'center',
      minHeight: '2.6rem'
    }),
    menuList: (base, state) => ({
      ...base,
      ...typography,
      border: `1px solid ${outerTheme.colors.secondaryLight}`,
      padding: '0',
      ...StyledScrollbar
    }),
    multiValue: (base, state) => ({
      ...base,
      borderRadius: 0,
      margin: `${space2} ${space2} 0 0`
    }),
    multiValueLabel: (base, state) => ({
      ...base,
      borderRadius: 0,
      color: state.isDisabled ? textDisabled : text[0],
      fontSize: 'inherit',
      whiteSpace: 'wrap'
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      'borderRadius': 0,
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
