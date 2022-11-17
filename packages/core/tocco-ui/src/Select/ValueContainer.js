import PropTypes from 'prop-types'
import {Children} from 'react'
import {components} from 'react-select'

import {StyledMultiValueWrapper} from './StyledComponents'

const isInput = child => child?.type?.name === 'Input'

const ValueContainer = props => {
  const {selectProps, hasValue, children} = props
  const {isMulti, hasAdvancedSearch, hasDocsTreeSearch, isDisabled} = selectProps

  const showInputAlwaysOnTop = isMulti && (hasAdvancedSearch || hasDocsTreeSearch)

  if (!showInputAlwaysOnTop) {
    return <components.ValueContainer {...props} />
  }

  const Input = Children.map(children, child => (isInput(child) ? child : null))
  const Others = Children.map(children, child => (!isInput(child) ? child : null))

  const hideInput = isDisabled && hasValue

  return (
    <>
      {!hideInput && <>{Input}</>}
      <StyledMultiValueWrapper>{Others}</StyledMultiValueWrapper>
    </>
  )
}

ValueContainer.propTypes = {
  children: PropTypes.any,
  hasValue: PropTypes.bool,
  selectProps: PropTypes.shape({
    isMulti: PropTypes.bool,
    hasDocsTreeSearch: PropTypes.bool,
    hasAdvancedSearch: PropTypes.bool,
    isDisabled: PropTypes.bool
  })
}

export default ValueContainer
