import {app} from 'tocco-address-update/src/main'
import {appFactory} from 'tocco-app-extensions'

appFactory.registerAppInRegistry(app.name, app.init)
