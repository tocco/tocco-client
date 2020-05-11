import React from 'react'
import {consoleLogger} from 'tocco-util'

import mappings from './mappings'

export default (mappingType, type) => {
  if (!mappings[mappingType] || !mappings[mappingType][type]) {
    consoleLogger.log(`Unable to display field: unknown mapping type combination (${mappingType} / ${type})`)
    return () => <span/>
  }

  return mappings[mappingType][type]
}
