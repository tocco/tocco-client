import {theme} from 'styled-system'

import StyledMenu from './StyledMenu'
import {stylingLook} from '../utilStyles'

const StyledMenuButtonGroup = StyledMenu.extend`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: -${props => props.look === stylingLook.RAISED ? theme('space.4') : 0};

    > hr {
      border: none;
      border-left: 1px solid ${props => theme('colors.base.text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === stylingLook.RAISED ? theme('space.4') : 0};
    }

    > li {

      > a,
      > button {
        border-radius: 0;
        height: 100%;
      }

      &:first-child {
        > a,
        > button {
          border-top-left-radius: ${theme('radii.2')};
          border-bottom-left-radius: ${theme('radii.2')};
        }
      }

      &:last-child {
        > a,
        > button {
          border-top-right-radius: ${theme('radii.2')};
          border-bottom-right-radius: ${theme('radii.2')};
        }
      }
    }
  }
`

export default StyledMenuButtonGroup
