import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const Tournament = ({tournamentKey}) => {
  return (
    <EntityDetailApp
      entityName="Tournament"
      formName="Tournament_widget_detail"
      entityId={tournamentKey}
      mode="update"
    />
  )
}

Tournament.propTypes = {
  tournamentKey: PropTypes.string.isRequired
}

export default Tournament
