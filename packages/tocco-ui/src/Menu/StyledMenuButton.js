import {theme} from 'styled-system'

import StyledMenu from './StyledMenu'
import {
  spaceScale,
  stylingLook
} from '../utilStyles'

const StyledMenuButton = StyledMenu.extend`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: ${props => props.look === stylingLook.RAISED ? `-${spaceScale(props, -1)}` : 0};

    > hr {
      border: none;
      border-left: 1px solid ${props => theme('colors.text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === stylingLook.RAISED ? spaceScale(props, -1) : 0};

      :not(:last-child) {
        margin-right: ${props => props.look === stylingLook.RAISED ? spaceScale(props, -1) : ''};
      }
    }
  }
`

export default StyledMenuButton
