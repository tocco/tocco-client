import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {BallMenu, MenuItem} from 'tocco-ui'

const NavigationCellHeader = ({
  disablePreferencesMenu,
  displayColumnModal,
  resetColumns,
  sortable,
  resetSorting,
  resetPreferences,
  displayTableRowsModal
}) =>
  !disablePreferencesMenu ? (
    <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
      <MenuItem onClick={displayColumnModal}>
        <FormattedMessage id="client.entity-list.preferences.columns" />
      </MenuItem>
      <MenuItem onClick={displayTableRowsModal}>
        <FormattedMessage id="client.entity-list.preferences.numOfRows" />
      </MenuItem>
      <MenuItem onClick={resetColumns}>
        <FormattedMessage id="client.entity-list.preferences.columns.reset" />
      </MenuItem>
      {sortable && (
        <MenuItem onClick={resetSorting}>
          <FormattedMessage id="client.entity-list.sorting.reset" />
        </MenuItem>
      )}
      <MenuItem onClick={resetPreferences}>
        <FormattedMessage id="client.entity-list.preferences.reset" />
      </MenuItem>
    </BallMenu>
  ) : null

NavigationCellHeader.propTypes = {
  displayColumnModal: PropTypes.func.isRequired,
  resetSorting: PropTypes.func.isRequired,
  resetPreferences: PropTypes.func.isRequired,
  resetColumns: PropTypes.func.isRequired,
  sortable: PropTypes.bool,
  disablePreferencesMenu: PropTypes.bool,
  displayTableRowsModal: PropTypes.func.isRequired
}

export default NavigationCellHeader
