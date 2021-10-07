import React from 'react'
import PropTypes from 'prop-types'

import {getFooterType} from '../../util/detailFooter/helpers'
import types from '../../util/detailFooter/types'
import DetailFooterReduced from './DetailFooterReduced'
import DetailFooterFull from './DetailFooterFull'

const DetailFooter = ({mode, entity, entityModel}) => {
  const type = getFooterType(mode, entityModel)

  switch (type) {
    case types.FULL:
      return <DetailFooterFull entity={entity}/>
    case types.REDUCED:
      return <DetailFooterReduced entity={entity}/>
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
