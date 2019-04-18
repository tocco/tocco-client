import styled from 'styled-components'

import StyledMenu from './StyledMenu'
import {
  design,
  scale,
  theme
} from '../utilStyles'

const StyledMenuButton = styled(StyledMenu)`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: ${props => props.look === design.look.RAISED ? `-${scale.space(-1)(props)}` : 0};

    > hr {
      border: none;
      border-left: 1px solid ${theme.color('text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === design.look.RAISED ? scale.space(-1)(props) : 0};

      :not(:last-child) {
        margin-right: ${props => props.look === design.look.RAISED ? scale.space(-1)(props) : ''};
      }
    }
  }
`

export default StyledMenuButton
