import React from 'react'
import SearchForm from '../../../../components/SearchForm'
import List from '../../../../components/List'

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
        />
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
}

export default ListPage
