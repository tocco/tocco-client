import styled from 'styled-components'
import _get from 'lodash/get'

import StyledMenu from './StyledMenu'
import {
  scale,
  design
} from '../utilStyles'

const StyledMenuBar = styled(StyledMenu)`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: ${props => props.look === design.look.RAISED ? `-${scale.space(props.theme, -1)}` : 0};

    > li > button,
    > li > a {
      border-radius: 0;
      box-shadow: none;
      text-align: left;
      text-transform: none;
    }

    > hr {
      border: none;
      border-left: 1px solid ${props => _get(props.theme, 'colors.text')};
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

export default StyledMenuBar
