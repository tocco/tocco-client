import React from 'react'
import * as ToccoUI from 'tocco-ui'
import SearchField from './SearchField'

const SearchForm = props => {
  const handleResetClick = () => {
    props.reset()
  }

  return (
    <form>
      {
        props.searchFormDefinition.map((definition, idx) => (
          <div key={idx} className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{definition.label}</label>
            <div className="col-sm-10">
              <SearchField
                value={props.searchInputs ? props.searchInputs[definition.name] : undefined}
                type={definition.type}
                name={definition.name}
                relationEntities={props.relationEntities}
                entityModel={props.entityModel}
                setSearchInput={props.setSearchInput}
              />
            </div>
          </div>
        ))
      }
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <ToccoUI.Button type="submit" icon="glyphicon-search" label="Search" primary/>
          <ToccoUI.Button type="button" icon="glyphicon-repeat" label="Reset" onClick={handleResetClick}/>
        </div>
      </div>
    </form>
  )
}

SearchForm.propTypes = {
  entityModel: React.PropTypes.objectOf(
    React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      targetEntity: React.PropTypes.string
    })
  ).isRequired,
  searchFormDefinition: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      displayType: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      useLabel: React.PropTypes.string.isRequired
    })
  ).isRequired,
  setSearchInput: React.PropTypes.func.isRequired,
  relationEntities: React.PropTypes.objectOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        displayName: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired
      })
    )).isRequired,
  searchInputs: React.PropTypes.objectOf(React.PropTypes.any),
  reset: React.PropTypes.func.isRequired
}

export default SearchForm
