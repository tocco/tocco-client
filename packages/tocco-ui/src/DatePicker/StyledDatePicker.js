import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledWrapper = styled.div`
  cursor: pointer;

  .flatpickr-calendar.open  {
    margin-top: ${scale.space(1.2)};
  }

  .flatpickr-calendar.arrowTop:before,
  .flatpickr-calendar.arrowTop:after {
    left: 83%;
  }
`
