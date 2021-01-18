import PropTypes from 'prop-types'

export default PropTypes.shape({
  entities: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    paths: PropTypes.objectOf(PropTypes.shape({
      type: PropTypes.string,
      writable: PropTypes.bool,
      value: PropTypes.any
    }))
  })).isRequired,
  relations: PropTypes.arrayOf(PropTypes.shape({
    entityKey: PropTypes.string.isRequired,
    relationName: PropTypes.string.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalKeys: PropTypes.number.isRequired
  })).isRequired,
  displays: PropTypes.arrayOf(PropTypes.shape({
    model: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired
    }))
  })).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  mergeStragegy: PropTypes.shape({
    display: PropTypes.string
  })
})
