import React from 'react'
import {consoleLogger} from 'tocco-util'

import InfoBoxHtmlFieldContent from './typeContent/InfoBoxHtmlFieldContent'
import InfoBoxSearchFilterContent from './typeContent/InfoBoxSearchFilterContent'

export default (type, id, content, navigationStrategy) => {
  if (map[type]) {
    return React.createElement(map[type], {id, content, navigationStrategy})
  }

  consoleLogger.logError('No Content mapper defined for type', type, id)
  return <div/>
}

export const map = {
  htmlfield: InfoBoxHtmlFieldContent,
  searchfilter: InfoBoxSearchFilterContent
}
