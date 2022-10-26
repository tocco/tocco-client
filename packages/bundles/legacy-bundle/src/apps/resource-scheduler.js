import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-resource-scheduler/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
