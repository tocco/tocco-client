import PropTypes from 'prop-types'

import provider from './typeContentProvider'

const InfoBoxContent = ({id, content, navigationStrategy}) => {
  if (!content) {
    return null
  }

  const {type} = content
  return provider(type, id, content, navigationStrategy)
}

InfoBoxContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  navigationStrategy: PropTypes.object
}

export default InfoBoxContent
