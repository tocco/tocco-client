import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-user-availability/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
