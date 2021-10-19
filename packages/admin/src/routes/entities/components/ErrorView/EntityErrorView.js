import React from 'react'
import {FormattedMessage} from 'react-intl'

import {currentViewPropType} from '../../utils/propTypes'
import ErrorView from '../../../../components/ErrorView'

const EntityErrorView = ({currentViewInfo}) => {
  const prefix = 'client.admin.entity.errorView.'
  const title = currentViewInfo.type === 'detail'
    ? 'detailTitle'
    : 'defaultTitle'

  const description = currentViewInfo.type === 'detail'
    ? 'detailDescription'
    : currentViewInfo.type === 'list' && currentViewInfo.error.relationName
      ? 'relationDescription'
      : 'listDescription'

  return <ErrorView
    title={<FormattedMessage id={prefix + title}/>}
    message={<FormattedMessage id={prefix + description} values={currentViewInfo.error}/>}/>
}

EntityErrorView.propTypes = {
  currentViewInfo: currentViewPropType
}

export default EntityErrorView
