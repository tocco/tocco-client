import React from 'react'
import {InputFactory} from './../InputFactory'

const SearchForm = props => {
  return (
    <div className="search-form">
      <form>
        {props.formDefinition.map(definition => <InputFactory
          key={definition.name}
          fieldDefinition={definition}
          setSearchTerm={props.setSearchTerm}
        />)}
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  formDefinition: React.PropTypes.array.isRequired,
  setSearchTerm: React.PropTypes.func.isRequired
}

export default SearchForm
