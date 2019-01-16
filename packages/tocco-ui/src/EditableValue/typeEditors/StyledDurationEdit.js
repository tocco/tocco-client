import styled from 'styled-components'

import {
  declareFont,
  spaceScale
} from '../../utilStyles'

const StyledDurationEdit = styled.div`
&& {
  display: flex;
  flew-wrap: nowrap;
  align-items: center;

  > input {
    ${props => declareFont(props)}

    &:nth-of-type(1) {
      margin-right: ${props => spaceScale(props, -1)};
    }

    &: nth-of-type(2) {
        margin: 0 ${props => spaceScale(props, -1)};
    }
  }
}
`

export default StyledDurationEdit
