import styled from 'styled-components'
import _get from 'lodash/get'

const StyledMergeWizard = styled.div`
  && {
    .merge-response {
      padding: 0 10px 10px;
    }

    .disabled {
      color: #808080;
    }

    .w20 {
      width: 20px;
    }

    .p-l-5 {
      padding-left: 5px;
    }

    .bold {
      font-weight: ${props => _get(props.theme, 'fontWeights.bold')};
    }
  }
`

export default StyledMergeWizard
