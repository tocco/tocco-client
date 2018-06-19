import React from 'react'
import {injectGlobal} from 'styled-components'
import {themeGet} from 'styled-system'

const InjectFontRoboto = props => {
  const fontFamilySansSerif = themeGet('fontFamily.sansSerif', 'false')(props)
  const fontFamilyMonospace = themeGet('fontFamily.monospace', 'false')(props)

  if (fontFamilySansSerif.includes('Roboto')) {
    // eslint-disable-next-line chai-friendly/no-unused-expressions
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i');
    `
  }

  if (fontFamilyMonospace.includes('Roboto Mono')) {
    // eslint-disable-next-line chai-friendly/no-unused-expressions
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700');
    `
  }

  return (
    <div alt="Fonts were injected" style={{display: 'none'}}>
      {
        fontFamilySansSerif.includes('Roboto')
        && <span alt="Roboto was injected"></span>
      }
      {
        fontFamilyMonospace.includes('Roboto Mono')
        && <span alt="Roboto Mono was injected"></span>
      }
    </div>
  )
}

export default InjectFontRoboto
