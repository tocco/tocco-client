import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

const BackButton = ({label, onClick}) => (
  <Button data-cy="entity-detail_back-button" icon="arrow-left" label={label} onClick={onClick} />
)

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BackButton
