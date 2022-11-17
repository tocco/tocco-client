import DocsBrowserApp from 'tocco-docs-browser/src/main'
import EntityListApp from 'tocco-entity-list/src/main'
import WidgetConfigEditApp from 'tocco-widget-config-edit/src/main'

const WidgetConfigEdit = props => <WidgetConfigEditApp {...props} listApp={EntityListApp} docsApp={DocsBrowserApp} />

export default WidgetConfigEdit
