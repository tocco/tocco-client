import {appFactory} from 'tocco-app-extensions'
import {app} from 'tocco-stint-auction/src/main'

appFactory.registerAppInRegistry(app.name, app.init)
