import React from 'react'
import {InputFactory} from './../InputFactory'

const SearchForm = props => {
  return (
    <div className="search-form">
      {props.formDefinition.map(definition => <InputFactory
        key={definition.name}
        fieldDefinition={definition}
        setSearchTerm={props.setSearchTerm}
      />)}
    </div>
  )
}

SearchForm.propTypes = {
  formDefinition: React.PropTypes.array.isRequired,
  setSearchTerm: React.PropTypes.func.isRequired
}

export default SearchForm
