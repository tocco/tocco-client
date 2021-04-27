import React from 'react'
import PropTypes from 'prop-types'

import ModalDisplay from '../../modules/modal/ModalDisplay'
import ToasterDisplay from '../../modules/toaster/ToasterDisplay'
import BlockingDisplay from '../../modules/blocking/BlockingDisplay'

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
