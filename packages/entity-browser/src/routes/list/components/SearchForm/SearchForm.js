import React from 'react'
import {intlShape} from 'react-intl'

import {Button} from 'tocco-ui'
import FormField from '../../../../components/FormField'

const SearchForm = props => {
  const handleResetClick = () => {
    props.reset()
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.setSearchInput()
  }

  const msg = id => (props.intl.formatMessage({id}))

  const isHidden = name => {
    const field = props.preselectedSearchFields.find(f => f.id === name)
    return field && field.hidden
  }

  const shouldRenderField = name => (
    !isHidden(name) && (
    props.disableSimpleSearch || props.showExtendedSearchForm || props.simpleSearchFields.includes(name))
  )

  const toggleExtendedSearchForm = () => {
    props.setShowExtendedSearchForm(!props.showExtendedSearchForm)
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      {
        props.searchFormDefinition.map((formField, idx) => {
          if (shouldRenderField(formField.name)) {
            return (<FormField
              key={idx}
              id={formField.name}
              formDefinitionField={formField}
              modelField={props.entityModel[formField.name]}
              value={props.searchInputs ? props.searchInputs[formField.name] : undefined}
              editableValueUtils={{
                relationEntities: props.relationEntities,
                loadRelationEntity: props.loadRelationEntity
              }}
              onChange={value => props.setSearchInput(formField.name, value)}
            />)
          }
        }
        )
      }

      {!props.disableSimpleSearch
      && <div className="pull-right">
        <Button
          type="button"
          label={msg('client.entity-browser.extendedSearch')}
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
  relationEntities: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }).isRequired,
  loadRelationEntity: React.PropTypes.func.isRequired,
  searchInputs: React.PropTypes.objectOf(React.PropTypes.any),
  reset: React.PropTypes.func.isRequired,
  disableSimpleSearch: React.PropTypes.bool,
  simpleSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  showExtendedSearchForm: React.PropTypes.bool,
  setShowExtendedSearchForm: React.PropTypes.func,
  preselectedSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired,
      hidden: React.PropTypes.bool.isRequired
    })
  )
}

export default SearchForm
