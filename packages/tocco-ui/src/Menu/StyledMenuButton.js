import styled from 'styled-components'
import {theme} from 'styled-system'

import StyledMenu from './StyledMenu'
import {
  scale,
  design
} from '../utilStyles'

const StyledMenuButton = styled(StyledMenu)`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: ${props => props.look === design.look.RAISED ? `-${scale.space(props.theme, -1)}` : 0};

    > hr {
      border: none;
      border-left: 1px solid ${props => theme('colors.text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === design.look.RAISED ? scale.space(props.theme, -1) : 0};

      :not(:last-child) {
        margin-right: ${props => props.look === design.look.RAISED ? scale.space(props.theme, -1) : ''};
      }
    }
  }
`

export default StyledMenuButton
