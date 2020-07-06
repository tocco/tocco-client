import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {intlShape} from 'react-intl'

import Dialog from '../Dialog'
import {deleteInfoPropTypes} from '../../utils/deleteRequestParser'
import DeleteProgress from '../DeleteProgress'

const Delete = ({loadDialogInfo, dialogInfo, deletingInProgress, intl}) => {
  useEffect(() => {
    loadDialogInfo()
  }, [])

  const msg = id => intl.formatMessage({id})

  if (deletingInProgress) {
    return <DeleteProgress/>
  }

  return (
    <LoadMask
      required={[dialogInfo]}
      loadingText={msg('client.delete.loadingText')}
    >
      {dialogInfo && <Dialog/>}
    </LoadMask>
  )
}

Delete.propTypes = {
  loadDialogInfo: PropTypes.func.isRequired,
  dialogInfo: deleteInfoPropTypes,
  deletingInProgress: PropTypes.bool,
  intl: intlShape.isRequired
}

export default Delete
