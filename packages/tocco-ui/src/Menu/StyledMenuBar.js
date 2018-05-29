import {theme} from 'styled-system'

import StyledMenu from './StyledMenu'
import {stylingLook} from '../utilStyles'

const StyledMenuBar = StyledMenu.extend`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: -${props => props.look === stylingLook.RAISED ? theme('space.4') : 0};

    > li > button,
    > li > a {
      border-radius: 0;
      box-shadow: none;
      text-align: left;
      text-transform: none;
    }

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

      :not(:last-child) {
        margin-right: ${props => props.look === stylingLook.RAISED ? theme('space.4') : ''};
      }
    }
  }
`

export default StyledMenuBar
