import {FormattedMessage} from 'react-intl'

import ErrorView from '../../../../components/ErrorView'
import {currentViewPropType} from '../../utils/propTypes'

const EntityErrorView = ({currentViewInfo}) => {
  const prefix = 'client.admin.entity.errorView.'
  const title = currentViewInfo.type === 'detail' ? 'detailTitle' : 'defaultTitle'

  let description = 'listDescription'
  if (currentViewInfo.type === 'detail') {
    description = 'detailDescription'
  } else if (currentViewInfo.type === 'list' && currentViewInfo.error.relationName) {
    description = 'relationDescription'
  }

  return (
    <ErrorView
      title={<FormattedMessage id={prefix + title} />}
      message={<FormattedMessage id={prefix + description} values={currentViewInfo.error} />}
    />
  )
}

EntityErrorView.propTypes = {
  currentViewInfo: currentViewPropType
}

export default EntityErrorView
