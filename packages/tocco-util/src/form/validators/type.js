import React from 'react'
import {FormattedMessage} from 'react-intl'
import isUrl from 'validator/lib/isURL'

export const urlValidator = value => {
  if (!isUrl(value)) {
    return {
      format: [<FormattedMessage
        key="invlidurl"
        id="invlidurl"
      />
      ]
    }
  }

  return null
}

export default {
  url: urlValidator
}
