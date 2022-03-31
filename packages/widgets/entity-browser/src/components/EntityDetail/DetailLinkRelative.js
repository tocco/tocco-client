import PropTypes from 'prop-types'
import {RouterLink} from 'tocco-ui'

export const DetailLinkRelative = ({currentKey, entityKey, children, relation}) => (
  <RouterLink to={`${currentKey}/${relation}/${entityKey}`}>{children}</RouterLink>
)

DetailLinkRelative.propTypes = {
  currentKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string.isRequired
}
