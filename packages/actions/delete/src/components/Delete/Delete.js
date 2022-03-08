import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

import {deleteInfoPropType} from '../../utils/deleteRequestParser'
import DeleteProgress from '../DeleteProgress'
import Dialog from '../Dialog'

const Delete = ({loadDialogInfo, dialogInfo, deletingInProgress, intl}) => {
  useEffect(() => {
    loadDialogInfo()
  }, [loadDialogInfo])

  const msg = id => intl.formatMessage({id})

  if (deletingInProgress) {
    return <DeleteProgress />
  }

  return (
    <LoadMask required={[dialogInfo]} loadingText={msg('client.delete.loadingText')}>
      {dialogInfo && <Dialog />}
    </LoadMask>
  )
}

Delete.propTypes = {
  loadDialogInfo: PropTypes.func.isRequired,
  dialogInfo: deleteInfoPropType,
  deletingInProgress: PropTypes.bool,
  intl: PropTypes.object.isRequired
}

export default Delete
