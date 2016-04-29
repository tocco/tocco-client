import React from 'react'
import SearchForm from '../../../../components/SearchForm'
import List from '../../../../components/List'

const LiveSearch = props => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={props.liveSearch === true}
        onChange={e => {if (typeof props.setLiveSearch === 'function') props.setLiveSearch(e.target.checked) }}
      />
      &nbsp;Livesuche
    </label>
  </div>
)

class ListPage extends React.Component {

  componentWillMount() {
    this.props.fetchForm('Event_list')
    this.props.fetchEvents(this.props.list.searchTerm)
  }

  render() {
    return (
      <div className="ListPage" style={{padding: '1em'}}>
        <SearchForm
          searchTerm={this.props.list.searchTerm}
          updateSearchTerm={this.props.updateSearchTerm}
          submit={this.props.fetchEvents}
          liveSearch={this.props.list.liveSearch}
        />
        <LiveSearch liveSearch={this.props.list.liveSearch} setLiveSearch={this.props.setLiveSearch}/>
        <List data={this.props.list.list}/>
      </div>
    )
  }
}

ListPage.propTypes = {
  list: React.PropTypes.object.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  fetchEvents: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  setLiveSearch: React.PropTypes.func
}

export default ListPage
