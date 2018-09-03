import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm, Field} from 'redux-form'
import {form} from 'tocco-util'
import {SearchBox} from 'tocco-ui'

class FullTextSearchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.submitSearchForm()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  field = props =>
    <SearchBox
      value={props.input.value}
      liveSearch={true}
      onSearch={value => props.input.onChange(value)}
      placeholder={this.msg('client.entity-list.fullTextPlaceholder')}
    />

  render() {
    return (
      <form style={{padding: '10px'}} onSubmit={this.handleSubmit} className="form-horizontal">
        <Field name="txtFulltext" component={this.field}/>
      </form>
    )
  }
}

FullTextSearchForm.propTypes = {
  intl: intlShape.isRequired,
  submitSearchForm: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(FullTextSearchForm)
