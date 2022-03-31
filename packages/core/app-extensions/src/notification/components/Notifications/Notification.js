import PropTypes from 'prop-types'

import BlockingDisplay from '../../modules/blocking/BlockingDisplay'
import ModalDisplay from '../../modules/modal/ModalDisplay'
import ToasterDisplay from '../../modules/toaster/ToasterDisplay'

const Notification = ({navigationStrategy}) => (
  <>
    <BlockingDisplay />
    <ToasterDisplay navigationStrategy={navigationStrategy} />
    <ModalDisplay />
  </>
)

Notification.propTypes = {
  navigationStrategy: PropTypes.object
}

export default Notification
