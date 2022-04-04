import PropTypes from 'prop-types'

import {getFooterType} from '../../util/detailFooter/helpers'
import types from '../../util/detailFooter/types'
import DetailFooterFull from './DetailFooterFull'
import DetailFooterReduced from './DetailFooterReduced'

const DetailFooter = ({mode, entity, entityModel}) => {
  const type = getFooterType(mode, entityModel)

  switch (type) {
    case types.FULL:
      return <DetailFooterFull entity={entity} keyField={entityModel.keyField} />
    case types.REDUCED:
      return <DetailFooterReduced entity={entity} keyField={entityModel.keyField} />
    case types.NONE:
    default:
      return null
  }
}

DetailFooter.propTypes = {
  mode: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  entityModel: PropTypes.object.isRequired
}

export default DetailFooter
