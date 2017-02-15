import React from 'react'
import {intlShape} from 'react-intl'
import {Button} from 'tocco-ui'
import SearchField from './SearchField'

const SearchForm = props => {
  const handleResetClick = () => {
    props.reset()
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.setSearchInput()
  }

  const msg = id => {
    return props.intl.formatMessage({
      id
    })
  }

  const showField = formDefinition => {
    return props.disableSimpleSearch
      || props.simpleSearchFields.includes(formDefinition.name) || props.showExtendedSearchForm
  }

  const toggleExtendedSearchForm = () => {
    props.setShowExtendedSearchForm(!props.showExtendedSearchForm)
  }

  return (
    <form onSubmit={handleSubmit}>
      {
      props.searchFormDefinition.map((definition, idx) => (
        showField(definition)
        && <div key={idx} className="form-group row">
          <label htmlFor={definition.name} className="col-sm-2 col-form-label">{definition.label}</label>
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
      {!props.disableSimpleSearch
        && <div className="pull-right">
          <Button
            type="button"
            label={msg('client.entity-browser.extended-search')}
            onClick={toggleExtendedSearchForm}
          />
        </div>
      }
      <div className="form-group row">
        <div className="col-sm-10">
          <div className="btn-toolbar">
            <Button
              type="submit"
              icon="glyphicon-search"
              label={msg('client.entity-browser.search')}
              primary
            />
            <Button
              type="button"
              icon="glyphicon-repeat"
              label={msg('client.entity-browser.reset')}
              onClick={handleResetClick}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

SearchForm.propTypes = {
  intl: intlShape.isRequired,
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
  reset: React.PropTypes.func.isRequired,
  disableSimpleSearch: React.PropTypes.bool,
  simpleSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  showExtendedSearchForm: React.PropTypes.bool,
  setShowExtendedSearchForm: React.PropTypes.func
}

export default SearchForm
