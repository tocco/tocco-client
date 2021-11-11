import styled from 'styled-components'
import TetherComponent from 'react-tether'
import {components} from 'react-select'
import {getLuminance} from 'polished'

import Ball from '../Ball'
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
    margin: 8px 0 8px -10px;
    width: calc(${({wrapperWidth}) => wrapperWidth}px + 20px);
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

export const StyledSingleValueWrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  color: ${({isDisabled}) => isDisabled ? theme.color('text') : 'inherit'};
`

/**
 * Toggling the icon is very slow on Safari.
 * To change the icon with `transform` css property is very fast.
 */
export const StyledDropdownIndicatorWrapper = styled.div`
  && {
    position: relative;
    width: 26px;
    height: 23px;
  }
`
export const StyledDropdownIndicatorBall = styled(Ball)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    transform: ${({visible}) => visible ? 'scale(1)' : 'scale(0)'};
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
      'color': outerTheme.colors.text,
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
      '> *': {
        padding: '0 !important;', // resets react-select padding
        marginRight: space2
      },
      '> :last-child': {
        marginRight: `-${space2}`
      }
    }),
    input: (base, state) => ({
      ...base,
      minHeight: '2.6rem'
    }),
    menu: (base, state) => ({
      backgroundColor: outerTheme.colors.paper,
      boxShadow: `0 0 6px ${outerTheme.colors.signal.info.text}`
    }),
    menuList: (base, state) => ({
      ...base,
      ...typography,
      border: `1px solid ${outerTheme.colors.signal.info.text}`,
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
      margin: 0
    })
  }
}
