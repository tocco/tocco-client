import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm, Field} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {SearchBox} from 'tocco-ui'

const FullTextSearchForm = props => {
  const {submitSearchForm, intl} = props
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    submitSearchForm()
  }

  const msg = id => (intl.formatMessage({id}))

  const field = ({input}) =>
    <SearchBox
      value={input.value}
      liveSearch={true}
      onSearch={value => input.onChange(value)}
      placeholder={msg('client.entity-list.fullTextPlaceholder')}
    />

  return (
    <form onSubmit={handleSubmit}>
      <Field name="txtFulltext" component={field}/>
    </form>
  )
}

FullTextSearchForm.propTypes = {
  intl: intlShape.isRequired,
  submitSearchForm: PropTypes.func.isRequired,
  input: PropTypes.string
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(FullTextSearchForm)
