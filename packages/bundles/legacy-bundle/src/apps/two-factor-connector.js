import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-two-factor-connector/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
