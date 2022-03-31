import PropTypes from 'prop-types'
import {useCallback, useMemo} from 'react'
import {Field, reduxForm} from 'redux-form'
import {SearchBox} from 'tocco-ui'

const FullTextSearchForm = props => {
  const {submitSearchForm, intl} = props
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    submitSearchForm()
  }

  const msg = useCallback(id => intl.formatMessage({id}), [intl])

  const field = useMemo(
    () =>
      ({input}) =>
        (
          <SearchBox
            value={input.value}
            liveSearch={true}
            onSearch={value => input.onChange(value)}
            placeholder={msg('client.entity-list.fullTextPlaceholder')}
          />
        ),
    [msg]
  )

  return (
    <form onSubmit={handleSubmit}>
      <Field name="txtFulltext" component={field} />
    </form>
  )
}

FullTextSearchForm.propTypes = {
  intl: PropTypes.object.isRequired,
  submitSearchForm: PropTypes.func.isRequired,
  input: PropTypes.string
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(FullTextSearchForm)
