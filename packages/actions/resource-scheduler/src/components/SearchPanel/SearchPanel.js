import PropTypes from 'prop-types'
import {memo} from 'react'
import EntityListApp from 'tocco-entity-list/src/main'
import {design, Icon, Panel, Typography} from 'tocco-ui'

const PanelHeaderContent = ({color, label}) => (
  <Typography.Span>
    <Icon
      icon={color ? 'square-full' : 'square'}
      aria-hidden="true"
      style={{...(color ? {color} : {})}}
      position={design.position.PREPEND}
    />{' '}
    {label}
  </Typography.Span>
)

PanelHeaderContent.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

const SearchPanel = ({
  updateRequestedCalendars,
  locale,
  requestedCalendars,
  calendarTypes,
  emitAction,
  initialCalendarType
}) => {
  const handleSelect = name => selection => {
    updateRequestedCalendars(name, selection)
  }

  const getSearchLists = () =>
    calendarTypes.map(calendarType => (
      <Panel.Wrapper key={calendarType.name}>
        <Panel.Header>
          <PanelHeaderContent color={calendarType.color} label={calendarType.label} />
        </Panel.Header>
        <Panel.Body>
          <EntityListApp
            emitAction={emitAction}
            locale={locale}
            id={`search-panel-${calendarType.name}`}
            entityName={calendarType.targetEntity}
            formName={calendarType.formBase}
            limit={15}
            selectable={true}
            selection={requestedCalendars ? requestedCalendars[calendarType.name] || [] : []}
            onSelectChange={handleSelect(calendarType.name)}
            simpleSearchFields="txtFulltext, searchFilter"
            disableSelectionController
            showActions={false}
            scrollBehaviour="none"
          />
        </Panel.Body>
      </Panel.Wrapper>
    ))

  const initialCalendarTypeIndex = initialCalendarType
    ? calendarTypes.findIndex(c => c.name === initialCalendarType)
    : -1

  return <Panel.Group initialOpenPanelIndex={initialCalendarTypeIndex}>{getSearchLists()}</Panel.Group>
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
    })
  ).isRequired,
  requestedCalendars: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired,
  initialCalendarType: PropTypes.string
}

export default memo(SearchPanel)
