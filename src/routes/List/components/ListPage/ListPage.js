import React from 'react'
import SearchForm from '../../../../components/SearchForm'
import List from '../../../../components/List'

const EntityModelSelector = props => (
  <div className="form-horizontal">
    <div className="form-group">
      <select className="form-control" value={props.value ? props.value : ''} onChange={e => props.setEntityModel(e.target.value)}>
        <option key="empty" value="">Entität auswählen</option>
        {props.options.map(option => <option key={option} value={option}>{option}</option>)}
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
    this.props.fetchEntityModels()
    if (this.props.list.entityModel) {
      this.props.fetchForm(this.props.list.entityModel + '_list')
      this.props.fetchEntities(this.props.list.entityModel, this.props.list.searchTerm)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list.entityModel && this.props.list.entityModel !== nextProps.list.entityModel) {
      this.props.fetchForm(nextProps.list.entityModel + '_list')
      this.props.fetchEntities(nextProps.list.entityModel, nextProps.list.searchTerm)
    }
  }

  render() {
    const entityModel = this.props.list.entityModel
    const entityModelSelected = typeof entityModel === 'string' && entityModel.length > 0

    const formName = entityModelSelected ? entityModel + '_list' : null
    const formAvailable = formName && this.props.forms[formName]
    const form = formAvailable ? this.props.forms[formName] : null

    let component = null

    if (!entityModelSelected) {
      component = <div>Bitte Entität auswählen</div>
    } else if (!formAvailable) {
      component = <div>Liste wird geladen</div>
    } else {
      component = <List data={this.props.list.list} form={form}/>
    }

    return (
      <div className="ListPage" style={{padding: '1em'}}>
        <EntityModelSelector
          value={this.props.list.entityModel}
          options={this.props.entityModels}
          setEntityModel={this.props.setEntityModel}
        />
        <SearchForm
          entityModel={entityModel}
          searchTerm={this.props.list.searchTerm}
          updateSearchTerm={this.props.updateSearchTerm}
          submit={searchTerm => { this.props.fetchEntities(entityModel, searchTerm) }}
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
  fetchEntities: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  fetchEntityModels: React.PropTypes.func.isRequired,
  forms: React.PropTypes.object.isRequired,
  entityModels: React.PropTypes.array.isRequired,
  setLiveSearch: React.PropTypes.func,
  setEntityModel: React.PropTypes.func
}

export default ListPage
