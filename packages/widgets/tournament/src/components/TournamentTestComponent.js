import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const TournamentTestComponent = ({formBase, tournamentKey, entityName}) => {
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

TournamentTestComponent.propTypes = {
  formBase: PropTypes.string,
  tournamentKey: PropTypes.string,
  entityName: PropTypes.string
}

export default TournamentTestComponent
