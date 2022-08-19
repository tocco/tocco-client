import {css} from 'styled-components'

export const touchDeviceOnlyStyles = styles => css`
  @media (pointer: coarse) {
    ${styles}
  }
`

export const nonTouchDeviceOnlyStyles = styles => css`
  @media (hover: hover) and (pointer: fine) {
    ${styles}
  }
`
