import PropTypes from 'prop-types'
import {Children} from 'react'
import {components} from 'react-select'

import {StyledMultiValueWrapper} from './StyledComponents'

const isInput = child => child?.type?.name === 'Input'

const ValueContainer = props => {
  if (!props.selectProps.isMulti) {
    return <components.ValueContainer {...props} />
  }

  const Input = Children.map(props.children, child => (isInput(child) ? child : null))
  const Others = Children.map(props.children, child => (!isInput(child) ? child : null))

  return (
    <>
      {!props.selectProps.isDisabled && <>{Input}</>}
      <StyledMultiValueWrapper>{Others}</StyledMultiValueWrapper>
    </>
  )
}

ValueContainer.propTypes = {
  children: PropTypes.any,
  selectProps: PropTypes.shape({
    isMulti: PropTypes.bool,
    hasAdvancedSearch: PropTypes.bool,
    isDisabled: PropTypes.bool
  })
}

export default ValueContainer
