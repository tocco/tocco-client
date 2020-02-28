import {createGlobalStyle, css} from 'styled-components'

const InjectFont = createGlobalStyle`
  ${props => (
    props.theme.fontFamily && props.theme.fontFamily.url && css`@import url('${props.theme.fontFamily.url}');`
  )}
`

export default InjectFont
