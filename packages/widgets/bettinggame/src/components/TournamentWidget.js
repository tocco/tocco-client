import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const TournamentWidget = ({tournamentKey, formBase, entityName}) => {
  return (
    <EntityDetailApp
      id={`detail_${formBase}_${tournamentKey}`}
      entityName={entityName}
      entityId={tournamentKey}
      formName={formBase}
      mode="update"
    />
  )
}

TournamentWidget.propTypes = {
  tournamentKey: PropTypes.string,
  formBase: PropTypes.string,
  entityName: PropTypes.string
}

export default TournamentWidget
