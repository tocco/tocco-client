import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledView = styled.div`
    display: inline-block;
    position: relative;

    > div {
      position: absolute;
      top: ${scale.space(-1)};
      right: ${scale.space(-1)};
      left: ${scale.space(-1)};
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
