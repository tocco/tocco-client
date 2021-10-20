import PropTypes from 'prop-types'

import provider from './typeContentProvider'

const InfoBoxContent = ({id, content}) => {
  if (!content) {
    return null
  }

  const {type} = content
  return provider(type, id, content)
}

InfoBoxContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
}

export default InfoBoxContent
