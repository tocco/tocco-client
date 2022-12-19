import PropTypes from 'prop-types'

import Button from './Button'

const BackButton = ({icon, label, onClick, ...props}) => (
  <Button icon={icon || 'arrow-left'} label={label} onClick={onClick} data-cy="back-button" {...props} />
)

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string
}

export default BackButton
