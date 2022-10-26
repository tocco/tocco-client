import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-merge/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
