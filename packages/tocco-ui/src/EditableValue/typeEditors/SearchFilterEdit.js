import PropTypes from 'prop-types'
import typeEditorFactory from './../typeEditorFactory'

const SearchFilterEdit = props => {
  const type = props.options.multi ? 'multi-select' : 'single-select'
  return (
    typeEditorFactory(
      type,
      props.value,
      props.onChange,
      props.options,
      props.id,
      props.events,
      props.readOnly
    )
  )
}

SearchFilterEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    PropTypes.array,
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  options: PropTypes.shape({
    store: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
  }),
  readOnly: PropTypes.bool,
  id: PropTypes.string
}

export default SearchFilterEdit
