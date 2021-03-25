import React from 'react'

import ModalDisplay from '../../modules/modal/ModalDisplay'
import ToasterDisplay from '../../modules/toaster/ToasterDisplay'
import BlockingDisplay from '../../modules/blocking/BlockingDisplay'

const Notification = () => (
    <>
        <BlockingDisplay/>
        <ToasterDisplay/>
        <ModalDisplay />
    </>
)

export default Notification
