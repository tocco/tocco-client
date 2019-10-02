import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import {
  design,
  Icon,
  Panel,
  Typography
} from 'tocco-ui'

const PanelHeaderContent = ({color, label}) =>
  <Typography.H5>
    <Icon
      icon={color ? 'square' : ['far', 'square']}
      aria-hidden="true"
      style={{...(color ? {color} : {})}}
      position={design.position.PREPEND}
    />  {label}
  </Typography.H5>

PanelHeaderContent.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

class SearchPanel extends React.PureComponent {
  constructor() {
    super()
    this.state = {activeKey: -1}
  }

  handleSelect = name => selection => {
    this.props.updateRequestedCalendars(name, selection)
  }

  getSearchLists = calendarTypes =>
    calendarTypes.map(calendarType =>
      <Panel.Wrapper key={calendarType.name}>
        <Panel.Header>
          <PanelHeaderContent
            color={calendarType.color}
            label={calendarType.label}
          />
        </Panel.Header>
        <Panel.Body>
          <EntityListApp
            locale={this.props.locale}
            id={`search-panel-${calendarType.name}`}
            entityName={calendarType.targetEntity}
            formBase={calendarType.formBase}
            limit={25}
            showSearchForm={true}
            showCreateButton={false}
            selectable={true}
            selection={this.props.requestedCalendars ? this.props.requestedCalendars[calendarType.name] || [] : []}
            onSelectChange={this.handleSelect(calendarType.name)}
            simpleSearchFields="txtFulltext, searchFilter"
            disableSelectionController
          />
        </Panel.Body>
      </Panel.Wrapper>
    )

  render = () =>
    <Panel.Group>
      {this.getSearchLists(this.props.calendarTypes)}
    </Panel.Group>
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
