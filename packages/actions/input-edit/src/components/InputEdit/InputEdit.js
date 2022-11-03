import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {actions, notification, selection as selectionPropType} from 'tocco-app-extensions'
import {SidepanelMainContent, GlobalStyles, Sidepanel, SidepanelContainer, SidepanelHeader} from 'tocco-ui'
import {env} from 'tocco-util'

import InputEditSearch from '../InputEditSearch'
import InputEditTable from '../InputEditTable/InputEditTableContainer'
import {StyledActionsWrapper, StyledPaneWrapper, StyledListWrapper, StyledListView} from './StyledInputEdit'

const InputEdit = ({selection, handleNotifications, initializeTable, initializeSearch, actionDefinitions}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [selection, initializeTable, initializeSearch])

  const [isCollapsed, setIsCollapsed] = useState(false)

  const Actions = actionDefinitions.map(definition => (
    <actions.Action key={definition.id} definition={definition} selection={selection} />
  ))

  const embedType = env.getEmbedType()
  const isAdmin = ['admin', 'legacy-admin'].includes(embedType)

  return (
    <>
      <GlobalStyles />
      {handleNotifications && <notification.Notifications />}
      <StyledPaneWrapper>
        <SidepanelContainer
          sidepanelPosition={isAdmin ? 'left' : 'top'}
          sidepanelCollapsed={isCollapsed}
          setSidepanelCollapsed={setIsCollapsed}
          scrollBehaviour={isAdmin ? 'inline' : 'none'}
        >
          <Sidepanel>
            <SidepanelHeader />
            <InputEditSearch />
          </Sidepanel>

          <SidepanelMainContent>
            <StyledListView>
              <StyledActionsWrapper>{Actions}</StyledActionsWrapper>
              <StyledListWrapper>
                <InputEditTable />
              </StyledListWrapper>
            </StyledListView>
          </SidepanelMainContent>
        </SidepanelContainer>
      </StyledPaneWrapper>
    </>
  )
}

InputEdit.propTypes = {
  selection: selectionPropType.propType.isRequired,
  handleNotifications: PropTypes.bool,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  actionDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  notify: PropTypes.func.isRequired
}

export default InputEdit
