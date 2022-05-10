import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-wage-view/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
