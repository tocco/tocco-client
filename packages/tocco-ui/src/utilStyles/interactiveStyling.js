import {darken, lighten, readableColor, tint} from 'polished'
import {css} from 'styled-components'

import {theme as themeSelector} from './index'

const getBackgroundColor = (ink, look, theme) => {
  if (ink === 'primary' && look === 'raised') {
    return themeSelector.color('primary')({theme})
  }
  return themeSelector.color('paper')({theme})
}

const getFontColor = (ink, look, theme, backgroundColor) => {
  if (ink === 'primary' && look !== 'raised') {
    return themeSelector.color('primary')({theme})
  }
  return getMatchingFontColor(backgroundColor, theme)
}

const getHoverFontColor = (ink, look, theme, backgroundColor) => {
  if (look === 'raised') {
    return themeSelector.color('paper')({theme})
  }
  return getMatchingFontColor(backgroundColor, theme)
}

const getBorder = (ink, look, theme) => {
  if (ink !== 'primary' && look === 'raised') {
    return `0px 0px 0px 1px ${themeSelector.color('secondaryLight')({theme})} inset;`
  }
  return 'none'
}

const getHoverBackgroundColor = (ink, look, theme) => {
  if (look === 'raised') {
    if (ink === 'primary') {
      return lighten(0.1, themeSelector.color('primary')({theme}))
    }
    return themeSelector.color('secondaryLight')({theme})
  }
  return darken(0.1, themeSelector.color('paper')({theme}))
}

const getMatchingFontColor = (color, theme) =>
  readableColor(
    color,
    themeSelector.color('text')({theme}),
    themeSelector.color('paper')({theme})
  )

export default props => {
  const {ink, look, theme} = props
  const backgroundColor = getBackgroundColor(ink, look, theme)
  const fontColor = getFontColor(ink, look, theme, backgroundColor)
  const border = getBorder(ink, look, theme)
  const hoverBackgroundColor = getHoverBackgroundColor(ink, look, theme)
  const hoverFontColor = getHoverFontColor(ink, look, theme, backgroundColor)

  return css`
    background: ${backgroundColor};
    color: ${fontColor};
    box-shadow: ${border};
    outline: none;
    border: none;

    &:focus,
    &:hover {
      background: ${hoverBackgroundColor};
      color: ${hoverFontColor};
    }

    &:active,
    &[aria-pressed="true"] {
      background:  ${lighten(0.1, hoverBackgroundColor)};
    }

    &:disabled {
      background: ${tint(0.5, backgroundColor)};
      color: ${tint(0.5, fontColor)};
      cursor: not-allowed;
    }`
}
