import styled from 'styled-components'
import _get from 'lodash/get'

import {scale} from '../utilStyles'

const StyledButtonGroup = styled.div`
  && {
    display: flex;
    flex-flow: row wrap;
    width: fit-content;
    margin-bottom: ${props => props.melt ? 0 : `-${scale.space(props.theme, -1)}`};

    a,
    button {
      margin-bottom: ${props => props.melt ? 0 : scale.space(props.theme, -1)};
    }

    border-radius: ${props => props.melt ? _get(props.theme, 'radii.regular') : 0};
  }
`

export default StyledButtonGroup
