import React from 'react'

import {ToccoLogo} from 'tocco-ui'

import SearchForm from '../../../../components/SearchForm'
import List from '../../../../components/List'

var labelComparer = (a, b) => {
  if (a.label < b.label)
    return -1
  if (a.label > b.label)
    return 1
  return 0
}

const EntityModelSelector = props => (
  <div className="form-horizontal">
    <div className="form-group">
      <select className="form-control" value={props.value ? props.value : ''} onChange={e => props.setEntityModel(e.target.value)}>
        <option key="empty" value="">Entität auswählen</option>
        {props.options.sort(labelComparer).map(option => <option key={option.name} value={option.name}>{option.label} ({option.name})</option>)}
      </select>
    </div>
  </div>
)

const LiveSearch = props => (
  <div className="checkbox">
    <label>
      <input
        type="checkbox"
        checked={props.liveSearch === true}
        onChange={e => {if (typeof props.setLiveSearch === 'function') props.setLiveSearch(e.target.checked) }}
      />
      Livesuche
    </label>
  </div>
)

class ListPage extends React.Component {

  componentWillMount() {
    this.props.requestEntityModels()
    if (this.props.list.entityModel) {
      this.props.fetchForm(this.props.list.entityModel + '_list')
    //  this.props.requestEntities(this.props.list.entityModel, this.props.list.searchTerm, this.props.list.ordering)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list.entityModel && this.props.list.entityModel !== nextProps.list.entityModel) {
      this.props.fetchForm(nextProps.list.entityModel + '_list')
    }
  }

  render() {
    const entityModel = this.props.list.entityModel
    const entityModelSelected = typeof entityModel === 'string' && entityModel.length > 0

    const formName = entityModelSelected ? entityModel + '_list' : null
    const formAvailable = formName && this.props.forms[formName]
    const form = formAvailable ? this.props.forms[formName] : null
    const ordering = this.props.list.ordering

    let component = null

    if (!entityModelSelected) {
      component = <div>Bitte Entität auswählen</div>
    } else if (!formAvailable) {
      component = <div>Liste wird geladen</div>
    } else {
      component = <List data={this.props.list.data} form={form} ordering={ordering}
        setOrdering={this.props.setOrdering} lazyLoading={this.props.lazyLoading} />
    }

    return (
      <div className="ListPage" style={{padding: '1em'}}>
        <ToccoLogo />
        <EntityModelSelector
          value={this.props.list.entityModel}
          options={this.props.entityModels}
          setEntityModel={this.props.setEntityModel}
        />
        <SearchForm
          entityModel={entityModel}
          searchTerm={this.props.list.searchTerm}
          updateSearchTerm={this.props.updateSearchTerm}
          submit={this.props.updateSearchTerm}
          liveSearch={this.props.list.liveSearch}
          disabled={!entityModelSelected}
        />
        <LiveSearch liveSearch={this.props.list.liveSearch} setLiveSearch={this.props.setLiveSearch}/>
        {component}
      </div>
    )
  }
}

ListPage.propTypes = {
  list: React.PropTypes.object.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  requestEntities: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  requestEntityModels: React.PropTypes.func.isRequired,
  forms: React.PropTypes.object.isRequired,
  entityModels: React.PropTypes.array.isRequired,
  ordering: React.PropTypes.object.isRequired,
  setOrdering: React.PropTypes.func.isRequired,
  setLiveSearch: React.PropTypes.func,
  setEntityModel: React.PropTypes.func,
  lazyLoading: React.PropTypes.func.isRequired
}

export default ListPage
