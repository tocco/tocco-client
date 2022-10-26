import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-installation-delta-action/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
