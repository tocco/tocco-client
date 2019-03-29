import styled from 'styled-components'

import {
  scale,
  theme
} from '../utilStyles'

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

    border-radius: ${props => props.melt ? theme.radii('regular') : 0};
  }
`

export default StyledButtonGroup
