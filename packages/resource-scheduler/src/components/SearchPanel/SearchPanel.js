import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import {Icon} from 'tocco-ui'
import {stylingPosition} from 'tocco-ui/src/utilStyles'

class SearchPanel extends React.PureComponent {
  constructor() {
    super()

    this.state = {activeKey: -1}
  }

  handleAccordionSelect = activeKey => {
    this.setState({activeKey: this.state.activeKey === activeKey ? -1 : activeKey})
  }

  handleSelect = name => selection => {
    this.props.updateRequestedCalendars(name, selection)
  }

  getSearchLists = calendarTypes => {
    const accordionHeader = (content, name, color) => {
      return <div onClick={() => { this.handleAccordionSelect(name) }}>
        <Icon
          icon={color ? 'square' : ['far', 'square']}
          aria-hidden="true"
          style={{...(color ? {color} : {})}}
          position={stylingPosition.PREPEND}
        />
        {content}
        <Icon
          icon={`chevron-${this.state.activeKey === name ? 'up' : 'down'}`}
          style={{float: 'right'}}
        />
      </div>
    }

    return calendarTypes.map(calendarType => (
      <Panel
        collapsible
        className="accordion-panel"
        header={accordionHeader(calendarType.label, calendarType.name, calendarType.color)}
        eventKey={calendarType.name}
        key={calendarType.name}
      >
        <EntityListApp
          locale={this.props.locale}
          id={`search-panel-${calendarType.name}`}
          entityName={calendarType.targetEntity}
          formBase={calendarType.formBase}
          limit={5}
          showSearchForm={true}
          showCreateButton={false}
          selectable={true}
          selection={this.props.requestedCalendars ? this.props.requestedCalendars[calendarType.name] || [] : []}
          onSelectChange={this.handleSelect(calendarType.name)}
          simpleSearchFields="txtFulltext, searchFilter"
          disableSelectionController
        />
      </Panel>
    )
    )
  }

  render = () => (
    <div>
      <PanelGroup accordion activeKey={this.state.activeKey} onSelect={this.handleAccordionSelect}>
        {this.getSearchLists(this.props.calendarTypes)}
      </PanelGroup>
    </div>
  )
}

SearchPanel.propTypes = {
  updateRequestedCalendars: PropTypes.func.isRequired,
  calendarTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      formBase: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      targetEntity: PropTypes.string.isRequired,
      color: PropTypes.string
    }
    )),
  requestedCalendars: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  locale: PropTypes.string
}

export default SearchPanel
