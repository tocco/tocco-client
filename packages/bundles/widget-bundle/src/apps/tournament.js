import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-tournament/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
