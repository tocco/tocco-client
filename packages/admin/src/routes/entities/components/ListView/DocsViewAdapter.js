import React from 'react'

import DocsView from '../DocsView'
import {currentViewPropType} from '../../utils/propTypes'

const DocsViewAdapter = ({currentViewInfo}) =>
    <DocsView
        noLeftPadding={false}
        entityName={currentViewInfo.parentModel.name}
        entityKey={currentViewInfo.parentKey}
        showActions={true}
    />

DocsViewAdapter.propTypes = {
  currentViewInfo: currentViewPropType
}

export default DocsViewAdapter
