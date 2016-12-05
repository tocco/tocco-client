import React from 'react'
import {InputFactory} from './../InputFactory'

const SearchForm = ({formDefinition, setSearchTerm}) => {
  return (
    <div className="search-form">
      <form>
        {formDefinition.map(definition => <InputFactory
          key={definition.name}
          fieldDefinition={definition}
          setSearchTerm={setSearchTerm}
        />)}
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  formDefinition: React.PropTypes.array.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default SearchForm
