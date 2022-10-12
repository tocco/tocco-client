import _get from 'lodash/get'
import styled from 'styled-components'

import {generateDisabledShade, scale, shadeColor, themeSelector} from '../../utilStyles'
import {StyledEditableWrapperCss, StyledInputCss} from '../StyledEditableValue'

export const StyledLocationEdit = styled.div`
  && {
    ${StyledEditableWrapperCss}
    position: relative;

    div {
      :nth-of-type(1) {
        flex: 0 0 13ch;
        margin-right: ${scale.space(-2)};
      }

      :nth-of-type(2) {
        flex: 1 1 auto;
      }
    }

    > span {
      flex: 0 0 auto;
      margin-right: ${scale.space(-2)};
      color: ${({immutable, theme}) =>
        immutable ? generateDisabledShade(_get(theme, 'colors.text')) : _get(theme, 'colors.text')};
    }

    .react-autosuggest__input {
      ${StyledInputCss}
      width: 100%;
    }

    .react-autosuggest__suggestions-container--open {
      width: calc(100% + 17.5px);
      background-color: ${themeSelector.color('paper')};
      box-shadow: 0 0 6px ${themeSelector.color('signal.info.text')};
      border: 1px solid ${themeSelector.color('secondaryLight')};
      bottom: -9px;
      left: -10px;
      max-height: 300px;
      overflow-y: auto;
      position: absolute;
      transform: translateY(100%);
      z-index: 2; // higher than StyledIndicatorsContainerWrapper
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
      background-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 1)};
    }
  }
`
