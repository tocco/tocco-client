import {getLuminance} from 'polished'
import {components} from 'react-select'
import TetherComponent from 'react-tether'
import styled, {css} from 'styled-components'

import Ball from '../Ball'
import {StyledScrollbar} from '../Layout'
import {declareFont, generateDisabledShade, generateShades, scale, themeSelector} from '../utilStyles'

export const StyledReactSelectOuterWrapper = styled.div`
  outline-style: none;
  cursor: ${({immutable}) => (immutable ? 'not-allowed' : 'default')};
`

export const StyledReactSelectInnerWrapper = styled.div`
  outline-style: none;
`

export const StyledIndicatorsContainerWrapper = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${themeSelector.color('paper')};
  ${({isTopAligned}) =>
    isTopAligned &&
    css`
      position: absolute;
      right: 0;
      top: 0;
    `};
`

export const StyledTether = styled(TetherComponent)`
  && {
    z-index: 1;
  }
`

export const StyledNonTether = styled.div`
  position: absolute;
  padding-bottom: ${scale.space(1.5)};
  z-index: 2; // higher than StyledTether and StyledIndicatorsContainerWrapper
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
    ${declareFont({
      color: themeSelector.color('signal.warning.text'),
      lineHeight: 'normal'
    })}
    cursor: default;
    padding: ${({reactSelectTheme}) =>
      `${reactSelectTheme.spacing.baseUnit * 2}px ${reactSelectTheme.spacing.baseUnit * 3}px`};
  }
`

export const StyledSingleValueWrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  color: ${({isDisabled}) => (isDisabled ? themeSelector.color('text') : 'inherit')};
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
    transform: ${({visible}) => (visible ? 'scale(1)' : 'scale(0)')};
  }
`

export const StyledMultiValueWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

export const StyledMultiValueLabelWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  const space1 = scale.space(-1)({theme: outerTheme})
  const space2 = scale.space(-2)({theme: outerTheme})
  const typography = {
    color: text[0],
    fontFamily: outerTheme.fontFamily.regular,
    fontSize: `${outerTheme.fontSize.base}rem`,
    fontWeight: outerTheme.fontWeights.regular,
    lineHeight: outerTheme.lineHeights.regular
  }

  const showInputAlwaysOnTop = state =>
    state.isMulti && (state.selectProps.hasAdvancedSearch || state.selectProps.hasDocsTreeSearch)

  const messageStyle = base => ({
    ...base,
    color: outerTheme.colors.signal.warning.text,
    cursor: 'default',
    textAlign: 'left'
  })

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
      flexWrap: 'nowrap',
      position: 'relative',
      display: showInputAlwaysOnTop(state) ? 'block' : base.display
    }),
    noOptionsMessage: messageStyle,
    loadingMessage: messageStyle,
    option: (base, state) => {
      let backgroundColor = paper[0]
      if (state.isSelected) {
        backgroundColor = paper[2]
      } else if (state.isFocused) {
        backgroundColor = paper[1]
      }

      return {
        ...base,
        color: outerTheme.colors.text,
        backgroundColor,
        cursor: 'pointer',
        ':active': {
          backgroundColor: state.isSelected ? paper[2] : paper[1]
        }
      }
    },
    indicatorsContainer: (base, state) => ({
      ...base,
      alignSelf: 'flex-end',
      '> *': {
        padding: '0 !important;', // resets react-select padding
        marginRight: space2
      },
      '> :last-child': {
        marginRight: `-${space2}`
      }
    }),
    input: (base, state) => {
      let indicatorWidth = 50
      if (state.selectProps.hasDocsTreeSearch) {
        indicatorWidth += 25
      }
      if (state.selectProps.hasAdvancedSearch) {
        indicatorWidth += 25
      }
      if (state.selectProps.hasCreatePermission) {
        indicatorWidth += 25
      }

      return {
        ...base,
        minHeight: '2.6rem',
        ...(showInputAlwaysOnTop(state) ? {width: `calc(100% - ${indicatorWidth}px)`} : {}),
        overflow: 'hidden'
      }
    },
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
      margin: `${space1} ${space2} 0 0`,
      justifyContent: 'space-between',
      ...(showInputAlwaysOnTop(state) && !state.isDisabled ? {width: '100%', maxWidth: '300px'} : {})
    }),
    multiValueLabel: (base, state) => ({
      ...base,
      borderRadius: 0,
      color: state.isDisabled ? textDisabled : text[0],
      fontSize: 'inherit',
      lineHeight: 1.8
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      borderRadius: 0,
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
