import EntityDetailApp from 'tocco-entity-detail/src/main'
import EntityListApp from 'tocco-entity-list/src/main'

import DocsBrowserApp from '../../main'

const LazyDetailApp = props => <EntityDetailApp {...props} listApp={EntityListApp} docsApp={DocsBrowserApp} />

export default LazyDetailApp
