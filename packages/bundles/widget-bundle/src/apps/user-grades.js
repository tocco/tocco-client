import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-user-grades/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
