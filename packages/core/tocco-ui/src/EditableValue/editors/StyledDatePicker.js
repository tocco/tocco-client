import styled from 'styled-components'

import {declareFont, scale} from '../../utilStyles'
import {StyledEditableWrapperCss, StyledInputCss} from '../StyledEditableValue'

export const StyledDatePickerOuterWrapper = styled.div`
  outline: ${({immutable}) => (immutable ? 0 : 'initial')};
`

export const StyledDatePickerWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}

    & .react-datepicker__input-container {
      & input {
        ${StyledInputCss}
        width: calc(100% - 5px);
      }
    }

    & .react-datepicker {
      & .react-datepicker__today-button {
        ${({hasTime}) => hasTime && 'border-bottom: 1px solid #aeaeae;'}
        padding: 0; // allow custom button to fill entire space
      }
    }
  }
`

export const StyledTimeInput = styled.input`
  ${declareFont()}
  border: none;
  outline: none;
  min-height: 2.6rem;
`

export const StyledCustomTodayButton = styled.div`
  padding: ${scale.space(-1)} ${scale.space(-2)};
`
