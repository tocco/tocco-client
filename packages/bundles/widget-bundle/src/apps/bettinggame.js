import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-bettinggame/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
