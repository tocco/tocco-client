import React from 'react'

const SearchForm = (props) => (
  <div className="SearchForm">
    <form onSubmit={(e) => {
      e.preventDefault()
      props.submit(props.searchTerm)
    }}>
      <input
        type="text"
        className="form-control"
        value={props.searchTerm}
        onChange={e => props.updateSearchTerm(e.target.value)}
      />
    </form>
  </div>
)

SearchForm.propTypes = {
  searchTerm: React.PropTypes.string.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired
}

export default SearchForm
