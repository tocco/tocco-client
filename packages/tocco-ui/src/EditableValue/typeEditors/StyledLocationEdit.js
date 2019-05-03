import styled from 'styled-components'
import _get from 'lodash/get'

import {
  scale,
  shadeColor,
  theme
} from '../../utilStyles'
import {
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

export const StyledLocationEdit = styled.div`
  && {
    ${StyledEditableWrapperCss}
    position: relative;
  }

  .react-autosuggest__container {
    :first-child {
      flex: 0 0 6ch;
      margin-right: ${scale.space(-2)};
    }

    :nth-child(3) {
      flex: 1 1 auto;
    }
  }

  > span {
    flex: 0 0 auto;
    margin-right: ${scale.space(-2)};
  }

  .react-autosuggest__input {
    ${StyledInputCss}
    width: 100%;
  }

  .react-autosuggest__suggestions-container--open {
    background-color: ${theme.color('paper')};
    border-radius: ${theme.radii('regular')}
    border: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    bottom: 0;
    left: -1px;
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    right: -1px;
    transform: translateY(100%);
    z-index: 1;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 8px 12px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
  }
`
