import {consoleLogger} from 'tocco-util'

import fieldFactoryMappings from './fieldFactoryMappings'

export default (mappingType, dataType) => {
  if (!fieldFactoryMappings[mappingType] || !fieldFactoryMappings[mappingType][dataType]) {
    consoleLogger.log(`Unable to display field: unknown mapping type combination (${mappingType} / ${dataType})`)
    return () => <span />
  }

  return fieldFactoryMappings[mappingType][dataType]
}
