import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {PanelGroup, Panel} from 'react-bootstrap'

class SearchPanel extends React.PureComponent {
  constructor() {
    super()

    this.state = {activeKey: -1}
  }

  handleAccordionSelect = activeKey => {
    this.setState({activeKey: this.state.activeKey === activeKey ? -1 : activeKey})
  }

  handleSelect = name => selection => {
    this.props.addCalendarsOfType(name, selection.map(s => s.id))
  }

  getSearchLists = calendarTypes => {
    const accordionHeader = (content, name) => {
      const className = `glyphicon glyphicon-chevron-${this.state.activeKey === name ? 'up' : 'down'}`
      return <div onClick={() => { this.handleAccordionSelect(name) }}>
        {content}
        <i className={className} style={{float: 'right'}}></i>
      </div>
    }

    return calendarTypes.map(calendarType => (
      <Panel collapsible
        header={accordionHeader(calendarType.description, calendarType.name)}
        eventKey={calendarType.name}
        key={calendarType.name}
      >
        <EntityListApp
          id={`search-panel-${calendarType.name}`}
          entityName={calendarType.targetEntity}
          formBase={calendarType.formBase}
          limit={5}
          showSearchForm={true}
          showCreateButton={false}
          selectable={true}
          onSelect={this.handleSelect(calendarType.name)}
          onRowClick={row => this.handleSelect(calendarType.name)([row])}
        />
      </Panel>
    )
    )
  }

  render = () => {
    return (
      <div>
        <h1>Search Panel</h1>
        <PanelGroup accordion activeKey={this.state.activeKey} onSelect={this.handleAccordionSelect}>
          {this.getSearchLists(this.props.calendarTypes)}
        </PanelGroup>
      </div>
    )
  }
}

SearchPanel.propTypes = {
  calendarTypes: PropTypes.array,
  addCalendarsOfType: PropTypes.func.isRequired
}

export default SearchPanel
