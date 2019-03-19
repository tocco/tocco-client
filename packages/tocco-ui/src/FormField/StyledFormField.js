import styled, {css} from 'styled-components'
import classNames from 'classnames'
import _get from 'lodash/get'

import {scale} from '../utilStyles'
import {StyledSignalList} from '../SignalList'

const markAsMandatory = () => css`
  label:after {
    content: '*';
    padding-left: ${props => scale.space(props, -3)};
  }
`

const colorizeByCondition = ({dirty, hasError, theme}) =>
  hasError
    ? _get(theme, 'colors.signal.danger.text')
    : dirty
      ? _get(theme, 'colors.signal.warning.text')
      : _get(theme, 'colors.text')

const StyledFormFieldWrapper = styled.div.attrs(props => ({
  className: classNames(props.className, 'form-group')
}))`
  && {
    ${props => props.mandatory && markAsMandatory()}
    color: ${props => colorizeByCondition(props)}

    ${StyledSignalList} {
      margin-top: ${props => scale.space(props, -2)};
      padding-left: ${props => scale.space(props, -1)};
    }
  }
`

export default StyledFormFieldWrapper
