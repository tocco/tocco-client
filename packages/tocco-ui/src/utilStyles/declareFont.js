import {css} from 'styled-components'

import {
  scale,
  theme
} from '../utilStyles'

const declareFont = (options = {}) => css`
  color: ${options.color || theme.color('text')};
  font-family: ${options.fontFamily || theme.fontFamily('regular')};
  font-size: ${options.fontSize || scale.font(0)};
  font-style: ${options.fontStyle || 'normal'};
  font-weight: ${options.fontWeight || theme.fontWeight('regular')};
  line-height: ${options.lineHeight || theme.lineHeight('regular')};
`

export default declareFont
