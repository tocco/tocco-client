import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-mailing-list/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
