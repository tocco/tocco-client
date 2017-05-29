import React from 'react'
import {intlShape} from 'react-intl'

import {Button} from 'tocco-ui'
import {formField as formFieldUtil} from 'tocco-util'
import formFieldMapping from '../../util/formFieldMapping'

class SearchForm extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  handleResetClick = () => {
    this.props.reset()
  }

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.setSearchInput()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  isHidden = name => {
    const field = this.props.preselectedSearchFields.find(f => f.id === name)
    return field && field.hidden
  }

  shouldRenderField = name => (
    !this.isHidden(name) && (
    this.props.disableSimpleSearch || this.props.showExtendedSearchForm || this.props.simpleSearchFields.includes(name))
  )

  toggleExtendedSearchForm = () => {
    this.props.setShowExtendedSearchForm(!this.props.showExtendedSearchForm)
  }

  render() {
    const props = this.props

    if (props.searchFormDefinition.length === 0) {
      return null
    }

    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        {
          props.searchFormDefinition.map(formDefinitionField => {
            const fieldName = formDefinitionField.name
            if (this.shouldRenderField(fieldName)) {
              const modelField = props.entityModel[fieldName]
              const value = props.searchInputs ? props.searchInputs[fieldName] : undefined
              const utils = {
                relationEntities: props.relationEntities,
                loadRelationEntity: props.loadRelationEntity
              }
              const onChange = value => props.setSearchInput(fieldName, value)

              const fomFieldData = {
                formDefinitionField,
                modelField,
                id: fieldName,
                value,
                onChange,
                utils
              }

              return formFieldUtil.formFieldFactory(formFieldMapping, fomFieldData)
            }
          }
          )
        }

        <div className="row">
          <div className="col-sm-9 col-sm-push-3">
            <Button
              type="submit"
              label={this.msg('client.entity-list.search')}
              primary
            />
            <Button
              type="button"
              label={this.msg('client.entity-list.reset')}
              onClick={this.handleResetClick}
            />
            {!props.disableSimpleSearch
            && <Button
              className="pull-right btn-link"
              type="button"
              label={this.msg('client.entity-list.extendedSearch')}
              onClick={this.toggleExtendedSearchForm}
            />
            }
          </div>
        </div>
      </form>
    )
  }
}

SearchForm.propTypes = {
  intl: intlShape.isRequired,
  initialize: React.PropTypes.func,
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
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.arrayOf(React.PropTypes.number),
        React.PropTypes.arrayOf(React.PropTypes.string)
      ]),
      hidden: React.PropTypes.bool.isRequired
    })
  )
}

export default SearchForm
