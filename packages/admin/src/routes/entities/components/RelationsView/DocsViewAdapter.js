import React from 'react'

import DocsView from '../DocsView'
import {currentViewPropType} from '../../utils/propTypes'

const DocsViewAdapter = ({currentViewInfo}) =>
  <DocsView
    entityName={currentViewInfo.model.name}
    entityKey={currentViewInfo.key}
    showActions={false}
    noLeftPadding={true}
  />

DocsViewAdapter.propTypes = {
  currentViewInfo: currentViewPropType
}

export default DocsViewAdapter
