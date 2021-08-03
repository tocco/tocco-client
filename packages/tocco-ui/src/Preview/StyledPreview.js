import styled from 'styled-components'
import _get from 'lodash/get'

import {shadeColor, scale} from '../utilStyles'

const StyledPreview = styled.figure`
  && {
    vertical-align: top;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0; //reset css overwrite

    img {
      margin-top: ${scale.space(-2.2)};
      border: 1px solid ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)};
      max-width: ${({maxDimensionX}) => maxDimensionX || '100%'};
      max-height: ${({maxDimensionY}) => maxDimensionY || '100%'};
      min-width: 90px; // prevent collapse to 1px if there is no preview generated
    }

    figcaption {
      text-align: center;
    }
  }
`

export default StyledPreview
