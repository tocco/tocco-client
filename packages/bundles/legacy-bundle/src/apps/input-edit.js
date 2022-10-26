import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-input-edit/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
