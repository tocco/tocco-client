import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'
import {SearchBox} from 'tocco-ui'

const FullTextSearchForm = props => {
  const {submitSearchForm, intl} = props
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    submitSearchForm()
  }

  const msg = id => (intl.formatMessage({id}))

  const field = useMemo(() => ({input}) =>
    <SearchBox
      value={input.value}
      liveSearch={true}
      onSearch={value => input.onChange(value)}
      placeholder={msg('client.entity-list.fullTextPlaceholder')}
    />, [])

  return (
    <form onSubmit={handleSubmit}>
      <Field name="txtFulltext" component={field}/>
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
