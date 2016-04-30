import React from 'react'

const SearchForm = (props) => (
  <div className="SearchForm">
    <form onSubmit={(e) => {
      e.preventDefault()
      if (props.disabled !== true) {
        props.submit(props.searchTerm)
      }
    }}>
      <input
        type="text"
        className="form-control"
        value={props.searchTerm}
        readOnly={props.disabled === true}
        onChange={e => {
          if (props.disabled !== true) {
            props.updateSearchTerm(e.target.value)
            if (props.liveSearch === true) {
              props.submit(e.target.value, 500)
            }
          }
        }}
      />
    </form>
  </div>
)

SearchForm.propTypes = {
  searchTerm: React.PropTypes.string.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired,
  liveSearch: React.PropTypes.bool,
  disabled: React.PropTypes.bool
}

export default SearchForm
