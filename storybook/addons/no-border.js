import React from 'react'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .sb-show-main.sb-main-padded {
    padding: 0px;
  }
`

export default Story => <div>
  <GlobalStyle />
  <Story />
</div>
