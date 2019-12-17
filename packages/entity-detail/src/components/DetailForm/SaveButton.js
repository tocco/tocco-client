import {Button} from 'tocco-ui'
import React from 'react'
import {intlShape} from 'react-intl'
import PropTypes from 'prop-types'

import modes from '../../util/modes'

const SaveButton = ({submitting, mode, intl}) => {
  const msg = id => (intl.formatMessage({id}))

  return <Button
    data-cy="detail-form_submit-button"
    disabled={submitting}
    ink="primary"
    label={msg(`client.entity-detail.${mode === modes.CREATE ? 'create' : 'save'}`)}
    look="raised"
    pending={submitting}
    type="submit"
  />
}

SaveButton.propTypes = {
  intl: intlShape.isRequired,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf(Object.values(modes))
}

export default SaveButton
