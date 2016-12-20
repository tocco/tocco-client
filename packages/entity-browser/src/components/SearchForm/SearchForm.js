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
                value={props.searchInputs[definition.name]}
                type={definition.type}
                name={definition.name}
                relationEntities={props.relationEntities}
                entityModel={props.entityModel}
                setSearchInput={props.setSearchInput}
                searchInputs={props.searchInputs}
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
  entityModel: React.PropTypes.object.isRequired,
  searchFormDefinition: React.PropTypes.array.isRequired,
  setSearchInput: React.PropTypes.func.isRequired,
  relationEntities: React.PropTypes.object.isRequired,
  searchInputs: React.PropTypes.object.isRequired,
  reset: React.PropTypes.func.isRequired
}

export default SearchForm
