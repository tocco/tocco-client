import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-user-menu/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
