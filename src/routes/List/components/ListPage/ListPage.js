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
    this.props.fetchEvents(this.props.searchTerm)
  }

  render() {
    return (
      <div className="ListPage" style={{padding: '1em'}}>
        <SearchForm
          searchTerm={this.props.searchTerm}
          updateSearchTerm={this.props.updateSearchTerm}
          submit={this.props.fetchEvents}
          liveSearch={this.props.liveSearch}
        />
        <LiveSearch liveSearch={this.props.liveSearch} setLiveSearch={this.props.setLiveSearch}/>
        <List list={this.props.list}/>
      </div>
    )
  }
}

ListPage.propTypes = {
  searchTerm: React.PropTypes.string.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  list: React.PropTypes.array.isRequired,
  fetchEvents: React.PropTypes.func.isRequired,
  liveSearch: React.PropTypes.bool,
  setLiveSearch: React.PropTypes.func
}

export default ListPage
