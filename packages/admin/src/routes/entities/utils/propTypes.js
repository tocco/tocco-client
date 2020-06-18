import PropTypes from 'prop-types'

const modelPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  paths: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      fieldName: PropTypes.string,
      relationName: PropTypes.string
    })
  )
})

export const currentViewPropType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  level: PropTypes.number,
  key: PropTypes.string,
  model: modelPropType,
  parentModel: modelPropType,
  reverseRelation: PropTypes.string,
  actionId: PropTypes.string
})
