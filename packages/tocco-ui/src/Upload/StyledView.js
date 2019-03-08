import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledView = styled.div`
    display: inline-block;
    position: relative;

    > div {
      position: absolute;
      top: ${props => scale.space(props, -1)};
      right: ${props => scale.space(props, -1)};
      left: ${props => scale.space(props, -1)};
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      align-content: space-between;
      opacity: 0;
      transition: opacity 300ms;
    }

    &:hover > div {
      opacity: 1;
    }
`

export default StyledView
